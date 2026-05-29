# 代码标注导出脚本（带文件白名单校验）
# 用法：powershell -ExecutionPolicy Bypass -File export-annotations.ps1
# 功能：从各 member-N 分支中提取该组员**被分配的文件**，忽略误改的其他文件

$OutputDir = "export"

# ============================================================
# 各组员分支、姓名、负责文件白名单（与《代码标注分工方案.md》一致）
# ============================================================
$Members = @(
    @{
        Branch = "member-1"
        Name   = "组员1"
        Files  = @(
            "app/layout.tsx"
            "app/Main.tsx"
            "app/page.tsx"
            "app/not-found.tsx"
            "app/seo.tsx"
            "app/robots.ts"
            "app/sitemap.ts"
            "app/theme-providers.tsx"
            "app/about/page.tsx"
            "app/api/newsletter/route.ts"
            "app/blog/page.tsx"
            "app/projects/page.tsx"
            "app/tags/page.tsx"
            "app/tags/[tag]/page.tsx"
            "app/tags/[tag]/page/[page]/page.tsx"
        )
    },
    @{
        Branch = "member-2"
        Name   = "组员2"
        Files  = @(
            "app/blog/[...slug]/page.tsx"
            "app/blog/page/[page]/page.tsx"
            "layouts/PostLayout.tsx"
            "layouts/ListLayoutWithTags.tsx"
            "layouts/PostSimple.tsx"
            "data/headerNavLinks.ts"
        )
    },
    @{
        Branch = "member-3"
        Name   = "组员3"
        Files  = @(
            "layouts/ListLayout.tsx"
            "layouts/PostBanner.tsx"
            "layouts/AuthorLayout.tsx"
            "components/ThemeSwitch.tsx"
            "components/MobileNav.tsx"
            "components/ScrollTopAndComment.tsx"
            "components/SearchButton.tsx"
        )
    },
    @{
        Branch = "member-4"
        Name   = "组员4"
        Files  = @(
            "components/social-icons/icons.tsx"
            "components/social-icons/index.tsx"
            "components/Card.tsx"
            "components/Header.tsx"
            "components/Footer.tsx"
            "components/LayoutWrapper.tsx"
            "components/Comments.tsx"
            "components/Link.tsx"
            "components/Tag.tsx"
            "components/MDXComponents.tsx"
            "components/PageTitle.tsx"
            "components/SectionContainer.tsx"
            "components/TableWrapper.tsx"
            "components/Image.tsx"
            "data/siteMetadata.js"
        )
    },
    @{
        Branch = "member-5"
        Name   = "组员5"
        Files  = @(
            "contentlayer.config.ts"
            "css/tailwind.css"
            "css/prism.css"
            "next.config.js"
            "eslint.config.mjs"
            "scripts/rss.mjs"
            "data/projectsData.ts"
            "scripts/postbuild.mjs"
            "postcss.config.js"
            "prettier.config.js"
        )
    }
)

# ============================================================
# 主逻辑
# ============================================================

# 确保在 git 仓库根目录
$RepoRoot = (git rev-parse --show-toplevel 2>$null)
if (-not $RepoRoot) {
    Write-Host "[ERROR] 当前目录不是 Git 仓库，请在项目根目录执行此脚本。" -ForegroundColor Red
    exit 1
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  代码标注导出工具（白名单模式）" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$TotalExported = 0
$TotalSkipped  = 0
$TotalMissing  = 0

foreach ($member in $Members) {
    $branch     = $member.Branch
    $name       = $member.Name
    $whitelist  = $member.Files

    Write-Host "正在处理 [$name] (分支: $branch) ..." -ForegroundColor Yellow
    Write-Host "  白名单文件数: $($whitelist.Count)" -ForegroundColor DarkGray

    # 检查分支是否存在
    $branchExists = git branch --list $branch 2>$null
    if (-not $branchExists) {
        Write-Host "  [跳过] 分支 $branch 不存在" -ForegroundColor Red
        continue
    }

    # 获取该分支实际修改过的文件列表
    $changedFiles = @(git diff --name-only main...$branch 2>$null)

    # 创建输出目录
    $memberDir = Join-Path $OutputDir "$name-代码标注"
    if (Test-Path $memberDir) {
        Remove-Item -Recurse -Force $memberDir
    }
    New-Item -ItemType Directory -Path $memberDir -Force | Out-Null

    $fileCount   = 0
    $skipCount   = 0
    $missingList = @()

    foreach ($file in $whitelist) {
        $inBranch = $changedFiles -contains $file

        if ($inBranch) {
            # 文件在白名单中且分支有改动 → 正常导出
            $dstPath = Join-Path $memberDir $file
            $dstDir  = Split-Path $dstPath -Parent
            if (-not (Test-Path $dstDir)) {
                New-Item -ItemType Directory -Path $dstDir -Force | Out-Null
            }
            git show "${branch}:${file}" | Set-Content -Path $dstPath -Encoding UTF8 -NoNewline
            $fileCount++
            Write-Host "  [OK]   $file" -ForegroundColor Green
        } else {
            # 白名单中的文件在分支中没有改动 → 标记为遗漏
            $missingList += $file
            Write-Host "  [缺失] $file （未标注，请提醒该组员）" -ForegroundColor Red
        }
    }

    # 检查分支中有没有改白名单以外的文件（误改）
    foreach ($file in $changedFiles) {
        if ($whitelist -notcontains $file) {
            $skipCount++
            Write-Host "  [过滤] $file （不在白名单，已忽略）" -ForegroundColor DarkYellow
        }
    }

    Write-Host ""
    Write-Host "  => $name: 导出 $fileCount 个 | 过滤误改 $skipCount 个 | 缺失 $missingList.Count 个" -ForegroundColor Cyan
    if ($missingList.Count -gt 0) {
        Write-Host "     缺失文件列表：" -ForegroundColor Yellow
        foreach ($mf in $missingList) {
            Write-Host "       - $mf" -ForegroundColor Yellow
        }
    }
    Write-Host ""

    $TotalExported += $fileCount
    $TotalSkipped  += $skipCount
    $TotalMissing  += $missingList.Count
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  导出汇总" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  总导出文件数 : $TotalExported" -ForegroundColor Green
if ($TotalSkipped -gt 0) {
    Write-Host "  总过滤误改数 : $TotalSkipped" -ForegroundColor Yellow
}
if ($TotalMissing -gt 0) {
    Write-Host "  总缺失文件数 : $TotalMissing （请提醒相关组员补充）" -ForegroundColor Red
}
Write-Host ""
Write-Host "  导出目录: $OutputDir/" -ForegroundColor Cyan
Write-Host "  各组员文件夹可直接压缩为 .rar 提交" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
