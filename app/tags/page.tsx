import Link from '@/components/Link' /* 引入自定义Link组件-谢根祥标注 */
import Tag from '@/components/Tag' /* 引入标签展示组件-谢根祥标注 */
import { slug } from 'github-slugger' /* 引入URL友好的slug生成函数-谢根祥标注 */
import tagData from 'app/tag-data.json' /* 引入标签统计数据-谢根祥标注 */
import type { Metadata } from 'next' /* 引入Next.js元数据类型-谢根祥标注 */
import { genPageMetadata } from 'app/seo' /* 引入SEO元数据生成函数-谢根祥标注 */

export const metadata: Metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' }) /* 生成标签页SEO元数据-谢根祥标注 */

/* 标签列表页面组件，展示所有标签及其文章数量-谢根祥标注 */
export default async function Page() {
  const tagCounts = tagData as Record<string, number> /* 标签名称到文章数量的映射-谢根祥标注 */
  const tagKeys = Object.keys(tagCounts) /* 获取所有标签名称-谢根祥标注 */
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]) /* 按文章数量降序排序标签-谢根祥标注 */
  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700"> {/* 响应式布局容器-谢根祥标注 */}
        <div className="space-x-2 pt-6 pb-8 md:space-y-5"> {/* 标题区域-谢根祥标注 */}
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 dark:text-gray-100">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap"> {/* 标签展示区域，最大宽度限制-谢根祥标注 */}
          {tagKeys.length === 0 && 'No tags found.'} {/* 无标签时提示-谢根祥标注 */}
          {sortedTags.map((t) => { /* 遍历排序后的标签列表-谢根祥标注 */
            return (
              <div key={t} className="mt-2 mr-5 mb-2"> {/* 单个标签展示区域-谢根祥标注 */}
                <Tag text={t} /> {/* 渲染标签组件-谢根祥标注 */}
                <Link
                  href={`/tags/${slug(t)}`} /* 链接到标签文章列表页-谢根祥标注 */
                  className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                  aria-label={`View posts tagged ${t}`} /* 无障碍标签描述-谢根祥标注 */
                >
                  {` (${tagCounts[t]})`} {/* 显示标签对应的文章数量-谢根祥标注 */}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
