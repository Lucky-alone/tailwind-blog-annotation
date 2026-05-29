import Link from '@/components/Link' /* 引入自定义Link组件-谢根祥标注 */
import Tag from '@/components/Tag' /* 引入标签组件-谢根祥标注 */
import siteMetadata from '@/data/siteMetadata' /* 引入站点元数据-谢根祥标注 */
import { formatDate } from 'pliny/utils/formatDate' /* 引入日期格式化工具函数-谢根祥标注 */
import NewsletterForm from 'pliny/ui/NewsletterForm' /* 引入邮件订阅表单组件-谢根祥标注 */

const MAX_DISPLAY = 5 /* 首页最大显示文章数常量-谢根祥标注 */

/* 首页主体组件，展示最新文章列表-谢根祥标注 */
export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700"> {/* 文章列表外层容器，分割线分隔-谢根祥标注 */}
        <div className="space-y-2 pt-6 pb-8 md:space-y-5"> {/* 页面标题区域-谢根祥标注 */}
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest {/* 标题“最新文章”-谢根祥标注 */}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description} {/* 显示站点描述信息-谢根祥标注 */}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700"> {/* 文章列表无序列表-谢根祥标注 */}
          {!posts.length && 'No posts found.'} {/* 无文章时显示提示信息-谢根祥标注 */}
          {posts.slice(0, MAX_DISPLAY).map((post) => { /* 截取前MAX_DISPLAY篇文章进行展示-谢根祥标注 */
            const { slug, date, title, summary, tags } = post /* 解构获取文章属性-谢根祥标注 */
            return (
              <li key={slug} className="py-12"> {/* 单篇文章列表项-谢根祥标注 */}
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt> {/* 屏幕阅读器可读的发布标签-谢根祥标注 */}
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time> {/* 格式化显示文章发布日期-谢根祥标注 */}
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight"> {/* 文章标题-谢根祥标注 */}
                            <Link
                              href={`/blog/${slug}`} /* 文章详情链接-谢根祥标注 */
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap"> {/* 标签展示区域-谢根祥标注 */}
                            {tags.map((tag) => ( /* 遍历渲染文章标签-谢根祥标注 */
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400"> {/* 文章摘要内容区域-谢根祥标注 */}
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`} /* 跳转文章详情链接-谢根祥标注 */
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`} /* 无障碍标签-谢根祥标注 */
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && ( /* 文章数超过最大显示量时展示"查看全部"链接-谢根祥标注 */
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog" /* 跳转到博客列表页-谢根祥标注 */
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && ( /* 如果配置了邮件订阅服务商则显示订阅表单-谢根祥标注 */
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
