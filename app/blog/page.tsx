import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer' /* 引入内容提取和排序工具-谢根祥标注 */
import { allBlogs } from 'contentlayer/generated' /* 引入所有博客文章数据-谢根祥标注 */
import { genPageMetadata } from 'app/seo' /* 引入SEO元数据生成函数-谢根祥标注 */
import ListLayout from '@/layouts/ListLayoutWithTags' /* 引入带标签的列表布局组件-谢根祥标注 */

const POSTS_PER_PAGE = 5 /* 每页显示文章数常量-谢根祥标注 */

export const metadata = genPageMetadata({ title: 'Blog' }) /* 生成博客页SEO元数据-谢根祥标注 */

/* 博客列表首页组件，支持分页展示所有文章-谢根祥标注 */
export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const posts = allCoreContent(sortPosts(allBlogs)) /* 获取排序后的文章核心内容-谢根祥标注 */
  const pageNumber = 1 /* 首页页码固定为1-谢根祥标注 */
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE) /* 计算总页数-谢根祥标注 */
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber) /* 截取当前页显示的文章-谢根祥标注 */
  const pagination = { /* 分页配置对象-谢根祥标注 */
    currentPage: pageNumber, /* 当前页码-谢根祥标注 */
    totalPages: totalPages, /* 总页数-谢根祥标注 */
  }

  return (
    <ListLayout
      posts={posts} /* 全部文章数据-谢根祥标注 */
      initialDisplayPosts={initialDisplayPosts} /* 当前页显示的文章-谢根祥标注 */
      pagination={pagination} /* 分页配置-谢根祥标注 */
      title="All Posts" /* 页面标题-谢根祥标注 */
    />
  )
}
