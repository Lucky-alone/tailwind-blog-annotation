import { Metadata } from 'next' /* 引入Next.js Metadata类型-谢根祥标注 */
import siteMetadata from '@/data/siteMetadata' /* 引入站点元数据配置-谢根祥标注 */

/* SEO属性接口定义-谢根祥标注 */
interface PageSEOProps {
  title: string /* 页面标题-谢根祥标注 */
  description?: string /* 页面描述（可选）-谢根祥标注 */
  image?: string /* 社交分享图片（可选）-谢根祥标注 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any /* 允许传递额外属性-谢根祥标注 */
}

/* 生成页面SEO元数据的工具函数，合并OpenGraph和Twitter卡片配置-谢根祥标注 */
export function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  return {
    title, /* 页面标题-谢根祥标注 */
    description: description || siteMetadata.description, /* 使用传入描述或站点默认描述-谢根祥标注 */
    openGraph: { /* OpenGraph协议配置-谢根祥标注 */
      title: `${title} | ${siteMetadata.title}`, /* 拼接标题与站点名称-谢根祥标注 */
      description: description || siteMetadata.description,
      url: './',
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner], /* 优先使用自定义图片，否则用默认封面-谢根祥标注 */
      locale: 'en_US',
      type: 'website',
    },
    twitter: { /* Twitter卡片配置-谢根祥标注 */
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image', /* 大图卡片样式-谢根祥标注 */
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest, /* 展开额外属性覆盖默认配置-谢根祥标注 */
  }
}
