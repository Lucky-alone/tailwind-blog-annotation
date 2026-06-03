import { Authors, allAuthors } from 'contentlayer/generated' /* 引入作者数据类型和全部作者数据-谢根祥标注 */
import { MDXLayoutRenderer } from 'pliny/mdx-components' /* 引入MDX内容渲染器-谢根祥标注 */
import AuthorLayout from '@/layouts/AuthorLayout' /* 引入作者页布局组件-谢根祥标注 */
import { coreContent } from 'pliny/utils/contentlayer' /* 引入内容核心字段提取工具-谢根祥标注 */
import { genPageMetadata } from 'app/seo' /* 引入SEO元数据生成函数-谢根祥标注 */

export const metadata = genPageMetadata({ title: 'About' }) /* 生成关于页的SEO元数据-谢根祥标注 */

/* 关于页面组件，展示作者信息和MDX内容-谢根祥标注 */
export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors /* 查找默认作者数据-谢根祥标注 */
  const mainContent = coreContent(author) /* 提取作者核心内容字段-谢根祥标注 */

  return (
    <>
      <AuthorLayout content={mainContent}> {/* 使用作者布局组件展示作者信息-谢根祥标注 */}
        <MDXLayoutRenderer code={author.body.code} /> {/* 渲染作者MDX文件内容-谢根祥标注 */}
      </AuthorLayout>
    </>
  )
}
