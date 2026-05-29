import { MetadataRoute } from 'next' /* 引入Next.js MetadataRoute类型-谢根祥标注 */
import { allBlogs } from 'contentlayer/generated' /* 引入所有博客文章数据-谢根祥标注 */
import siteMetadata from '@/data/siteMetadata' /* 引入站点元数据配置-谢根祥标注 */

export const dynamic = 'force-static' /* 强制静态生成sitemap-谢根祥标注 */

/* 生成站点地图XML，包含静态页面和所有博客文章URL-谢根祥标注 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl /* 获取站点基础URL-谢根祥标注 */

  /* 过滤草稿文章，将每篇文章转换为站点地图条目-谢根祥标注 */
  const blogRoutes = allBlogs
    .filter((post) => !post.draft) /* 排除草稿状态的文章-谢根祥标注 */
    .map((post) => ({
      url: `${siteUrl}/${post.path}`, /* 文章完整URL-谢根祥标注 */
      lastModified: post.lastmod || post.date, /* 最后修改时间，优先lastmod-谢根祥标注 */
    }))

  /* 生成静态页面路由的站点地图条目-谢根祥标注 */
  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`, /* 静态页面URL-谢根祥标注 */
    lastModified: new Date().toISOString().split('T')[0], /* 当前日期作为最后修改时间-谢根祥标注 */
  }))

  return [...routes, ...blogRoutes] /* 合并静态路由和博客路由返回-谢根祥标注 */
}
