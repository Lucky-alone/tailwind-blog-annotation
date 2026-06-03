import { MetadataRoute } from 'next' /* 引入Next.js MetadataRoute类型-谢根祥标注 */
import siteMetadata from '@/data/siteMetadata' /* 引入站点元数据配置-谢根祥标注 */

export const dynamic = 'force-static' /* 强制静态生成，确保构建时生成robots.txt-谢根祥标注 */

/* 生成robots.txt文件，控制搜索引擎爬虫访问规则-谢根祥标注 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', /* 对所有爬虫生效-谢根祥标注 */
      allow: '/', /* 允许访问根路径-谢根祥标注 */
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`, /* 指定站点地图地址-谢根祥标注 */
    host: siteMetadata.siteUrl, /* 指定站点主机地址-谢根祥标注 */
  }
}
