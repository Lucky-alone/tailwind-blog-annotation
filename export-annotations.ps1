# 代码标注导出脚本
# 用法：powershell -ExecutionPolicy Bypass -File export-annotations.ps1
# 功能：从各 member-N 分支中提取被修改的文件，按组员目录导出

$OutputDir = "export"

# 分支与组员名称映射（可按需修改姓名）
$Members = @(
    @{ Branch = "member-1"; Name = "组员1" },
    @{ Branch = "member-2"; Name = "组员2" },
    @{ Branch = "member-3"; Name = "组员3" },
    @{ Branch = "member-4"; Name = "组员4" },
    @{ Branch = "member-5"; Name = "组员5" }
)

# 确保在 git 仓库根目录
$RepoRoot = (git rev-parse --show-toplevel 2>$null)
if (-not $RepoRoot) {
    Write-Host "[ERROR] 当前目录不是 Git 仓库，请在项目根目录执行此脚本。" -ForegroundColor Red
    exit 1
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  代码标注导出工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

foreach ($member in $Members) {
    $branch = $member.Branch
    $name = $member.Name

    Write-Host "正在处理 [$name] (分支: $branch) ..." -ForegroundColor Yellow

    # 检查分支是否存在
    $branchExists = git branch --list $branch 2>$null
    if (-not $branchExists) {
        Write-Host "  [跳过] 分支 $branch 不存在" -ForegroundColor Red
        continue
    }

    # 获取该分支相对于 main 修改过的文件列表
    $changedFiles = git diff --name-only main...$branch 2>$null
    if (-not $changedFiles) {
        Write-Host "  [跳过] 该分支没有修改任何文件" -ForegroundColor DarkGray
        continue
    }

    # 创建输出目录
    $memberDir = Join-Path $OutputDir "$name-代码标注"
    if (Test-Path $memberDir) {
        Remove-Item -Recurse -Force $memberDir
    }
    New-Item -ItemType Directory -Path $memberDir -Force | Out-Null

    # 逐个复制修改过的文件（保留目录结构）
    $fileCount = 0
    foreach ($file in $changedFiles) {
        $srcPath = Join-Path $RepoRoot $file
        $dstPath = Join-Path $memberDir $file
        $dstDir = Split-Path $dstPath -Parent

        if (-not (Test-Path $dstDir)) {
            New-Item -ItemType Directory -Path $dstDir -Force | Out-Null
        }

        # 从该分支获取文件内容（不需要切换分支）
        git show "${branch}:${file}" | Set-Content -Path $dstPath -Encoding UTF8 -NoNewline
        $fileCount++
        Write-Host "  + $file" -ForegroundColor Green
    }

    Write-Host "  => $name: 共导出 $fileCount 个文件 -> $memberDir/" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  导出完成！请查看 $OutputDir/ 目录" -ForegroundColor Cyan
Write-Host "  各组员文件夹可直接压缩为 .rar 提交" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
