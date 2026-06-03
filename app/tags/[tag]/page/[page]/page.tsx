import { slug } from 'github-slugger' /* 引入URL友好的slug生成函数-谢根祥标注 */
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer' /* 引入内容提取和排序工具-谢根祥标注 */
import ListLayout from '@/layouts/ListLayoutWithTags' /* 引入带标签的列表布局组件-谢根祥标注 */
import { allBlogs } from 'contentlayer/generated' /* 引入所有博客文章数据-谢根祥标注 */
import tagData from 'app/tag-data.json' /* 引入标签统计数据-谢根祥标注 */
import { notFound } from 'next/navigation' /* 引入Next.js 404处理函数-谢根祥标注 */

const POSTS_PER_PAGE = 5 /* 每页显示文章数常量-谢根祥标注 */

/* 生成静态路径参数，为每个标签的每一页生成预渲染路径-谢根祥标注 */
export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number> /* 标签统计数据-谢根祥标注 */
  return Object.keys(tagCounts).flatMap((tag) => { /* 遍历所有标签-谢根祥标注 */
    const postCount = tagCounts[tag] /* 获取当前标签的文章数-谢根祥标注 */
    const totalPages = Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE)) /* 计算总页数，至少为1-谢根祥标注 */
    return Array.from({ length: totalPages }, (_, i) => ({ /* 生成每页的路径参数-谢根祥标注 */
      tag: encodeURI(tag), /* 编码标签名称-谢根祥标注 */
      page: (i + 1).toString(), /* 页码转字符串-谢根祥标注 */
    }))
  })
}

/* 标签分页组件，展示指定标签下指定页码的文章列表-谢根祥标注 */
export default async function TagPage(props: { params: Promise<{ tag: string; page: string }> }) {
  const params = await props.params /* 解析动态路由参数-谢根祥标注 */
  const tag = decodeURI(params.tag) /* 解码获取标签名称-谢根祥标注 */
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1) /* 格式化标签作为页面标题-谢根祥标注 */
  const pageNumber = parseInt(params.page) /* 解析页码为整数-谢根祥标注 */
  const filteredPosts = allCoreContent( /* 过滤并提取匹配标签的文章-谢根祥标注 */
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag))) /* 过滤包含当前标签的文章-谢根祥标注 */
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) /* 计算总页数-谢根祥标注 */

  // Return 404 for invalid page numbers or empty pages
  /* 页码无效或超出范围时返回404页面-谢根祥标注 */
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound() /* 触发Next.js 404响应-谢根祥标注 */
  }
  const initialDisplayPosts = filteredPosts.slice( /* 根据页码截取当前页显示的文章-谢根祥标注 */
    POSTS_PER_PAGE * (pageNumber - 1), /* 起始索引-谢根祥标注 */
    POSTS_PER_PAGE * pageNumber /* 结束索引-谢根祥标注 */
  )
  const pagination = { /* 分页配置对象-谢根祥标注 */
    currentPage: pageNumber, /* 当前页码-谢根祥标注 */
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
    />
  )
}
