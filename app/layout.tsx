import 'css/tailwind.css' /* 引入Tailwind CSS全局样式-谢根祥标注 */
import 'pliny/search/algolia.css' /* 引入搜索组件样式-谢根祥标注 */
import 'remark-github-blockquote-alert/alert.css' /* 引入GitHub风格引用块告警样式-谢根祥标注 */

import { Space_Grotesk } from 'next/font/google' /* 引入Google字体Space Grotesk-谢根祥标注 */
import { Analytics, AnalyticsConfig } from 'pliny/analytics' /* 引入网站分析组件-谢根祥标注 */
import { SearchProvider, SearchConfig } from 'pliny/search' /* 引入搜索上下文Provider-谢根祥标注 */
import Header from '@/components/Header' /* 引入页头导航组件-谢根祥标注 */
import SectionContainer from '@/components/SectionContainer' /* 引入内容区域容器组件-谢根祥标注 */
import Footer from '@/components/Footer' /* 引入页脚组件-谢根祥标注 */
import siteMetadata from '@/data/siteMetadata' /* 引入站点元数据配置-谢根祥标注 */
import { ThemeProviders } from './theme-providers' /* 引入主题Provider组件-谢根祥标注 */
import { Metadata } from 'next' /* 引入Next.js Metadata类型-谢根祥标注 */

/* 配置Space Grotesk字体，支持拉丁子集，使用CSS变量存储字体族-谢根祥标注 */
const space_grotesk = Space_Grotesk({
  subsets: ['latin'], /* 字体子集仅加载拉丁字符-谢根祥标注 */
  display: 'swap', /* 字体加载策略：先显示后备字体，加载完替换-谢根祥标注 */
  variable: '--font-space-grotesk', /* 将字体存储为CSS自定义属性-谢根祥标注 */
})

/* 导出页面SEO元数据配置对象，包含OpenGraph、Twitter卡片等-谢根祥标注 */
export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl), /* 元数据基础URL-谢根祥标注 */
  title: {
    default: siteMetadata.title, /* 默认页面标题-谢根祥标注 */
    template: `%s | ${siteMetadata.title}`, /* 子页面标题模板格式-谢根祥标注 */
  },
  description: siteMetadata.description, /* 站点描述信息-谢根祥标注 */
  openGraph: { /* OpenGraph协议配置，用于社交平台分享预览-谢根祥标注 */
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner], /* 社交分享封面图-谢根祥标注 */
    locale: 'en_US',
    type: 'website',
  },
  alternates: { /* 规范链接与RSS订阅替代资源-谢根祥标注 */
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`, /* RSS订阅地址-谢根祥标注 */
    },
  },
  robots: { /* 搜索引擎爬虫抓取规则配置-谢根祥标注 */
    index: true, /* 允许索引页面-谢根祥标注 */
    follow: true, /* 允许跟踪页面上的链接-谢根祥标注 */
    googleBot: { /* Google爬虫专用规则-谢根祥标注 */
      index: true,
      follow: true,
      'max-video-preview': -1, /* 不限制视频预览时长-谢根祥标注 */
      'max-image-preview': 'large', /* 允许大尺寸图片预览-谢根祥标注 */
      'max-snippet': -1, /* 不限制文本摘要长度-谢根祥标注 */
    },
  },
  twitter: { /* Twitter卡片元数据配置-谢根祥标注 */
    title: siteMetadata.title,
    card: 'summary_large_image', /* 使用大图摘要卡片样式-谢根祥标注 */
    images: [siteMetadata.socialBanner],
  },
}

/* 根布局组件，包裹所有页面，提供主题、搜索、分析等全局功能-谢根祥标注 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || '' /* 从环境变量获取部署基础路径，支持子目录部署-谢根祥标注 */

  return (
    <html
      lang={siteMetadata.language} /* 设置页面语言属性-谢根祥标注 */
      className={`${space_grotesk.variable} scroll-smooth`} /* 注入字体CSS变量，启用平滑滚动-谢根祥标注 */
      suppressHydrationWarning /* 抑制主题切换时的水合警告-谢根祥标注 */
    >
      <link
        rel="apple-touch-icon" /* iOS设备主屏幕图标-谢根祥标注 */
        sizes="76x76"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} /> {/* PWA清单文件-谢根祥标注 */}
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" /> {/* Windows磁贴颜色-谢根祥标注 */}
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" /> {/* 亮色模式主题色-谢根祥标注 */}
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" /> {/* 暗色模式主题色-谢根祥标注 */}
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} /> {/* RSS订阅链接-谢根祥标注 */}
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white"> {/* 页面主体，pl-[calc(100vw-100%)]修复滚动条偏移-谢根祥标注 */}
        <ThemeProviders> {/* 包裹主题Provider，支持亮/暗主题切换-谢根祥标注 */}
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} /> {/* 网站流量分析组件-谢根祥标注 */}
          <SectionContainer> {/* 页面内容居中容器-谢根祥标注 */}
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}> {/* 搜索功能上下文Provider-谢根祥标注 */}
              <Header /> {/* 页头导航栏-谢根祥标注 */}
              <main className="mb-auto">{children}</main> {/* 主内容区域，mb-auto实现弹性底部对齐-谢根祥标注 */}
            </SearchProvider>
            <Footer /> {/* 页脚信息-谢根祥标注 */}
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  )
}
