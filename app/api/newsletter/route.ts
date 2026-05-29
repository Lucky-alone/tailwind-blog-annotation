import { NewsletterAPI } from 'pliny/newsletter' /* 引入Pliny的邮件订阅API处理器-谢根祥标注 */
import siteMetadata from '@/data/siteMetadata' /* 引入站点元数据配置-谢根祥标注 */

export const dynamic = 'force-static' /* 强制静态生成-谢根祥标注 */

/* 创建邮件订阅API处理器，根据配置的提供商初始化-谢根祥标注 */
const handler = NewsletterAPI({
  // @ts-ignore
  provider: siteMetadata.newsletter.provider, /* 邮件服务提供商配置-谢根祥标注 */
})

export { handler as GET, handler as POST } /* 同时导出GET和POST请求处理器-谢根祥标注 */
