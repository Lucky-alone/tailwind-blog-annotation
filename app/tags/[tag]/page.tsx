import { slug } from 'github-slugger' /* 引入URL友好的slug生成函数-谢根祥标注 */
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer' /* 引入内容提取和排序工具-谢根祥标注 */
import siteMetadata from '@/data/siteMetadata' /* 引入站点元数据配置-谢根祥标注 */
import ListLayout from '@/layouts/ListLayoutWithTags' /* 引入带标签的列表布局组件-谢根祥标注 */
import { allBlogs } from 'contentlayer/generated' /* 引入所有博客文章数据-谢根祥标注 */
import tagData from 'app/tag-data.json' /* 引入标签统计数据-谢根祥标注 */
import { genPageMetadata } from 'app/seo' /* 引入SEO元数据生成函数-谢根祥标注 */
import { Metadata } from 'next' /* 引入Next.js Metadata类型-谢根祥标注 */

const POSTS_PER_PAGE = 5 /* 每页显示文章数常量-谢根祥标注 */

/* 动态生成标签页的SEO元数据，包含RSS订阅地址-谢根祥标注 */
export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params /* 解析动态路由参数-谢根祥标注 */
  const tag = decodeURI(params.tag) /* 解码URI获取标签名称-谢根祥标注 */
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`, /* 拼接标签描述-谢根祥标注 */
    alternates: { /* 替代资源配置-谢根祥标注 */
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`, /* 标签RSS订阅地址-谢根祥标注 */
      },
    },
  })
}

/* 生成静态路径参数，构建时预渲染所有标签页面-谢根祥标注 */
export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number> /* 标签统计数据-谢根祥标注 */
  const tagKeys = Object.keys(tagCounts) /* 获取所有标签名称-谢根祥标注 */
  return tagKeys.map((tag) => ({
    tag: encodeURI(tag), /* 编码标签名称作为URL路径参数-谢根祥标注 */
  }))
}

/* 标签文章列表页组件，展示指定标签下的所有文章-谢根祥标注 */
export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params /* 解析动态路由参数-谢根祥标注 */
  const tag = decodeURI(params.tag) /* 解码获取标签名称-谢根祥标注 */
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1) /* 格式化标签首字母大写作为页面标题-谢根祥标注 */
  const filteredPosts = allCoreContent( /* 过滤并提取匹配标签的文章核心内容-谢根祥标注 */
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag))) /* 过滤包含当前标签的文章-谢根祥标注 */
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) /* 计算总页数-谢根祥标注 */
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE) /* 截取第一页显示的文章-谢根祥标注 */
  const pagination = { /* 分页配置-谢根祥标注 */
    currentPage: 1, /* 初始页码为1-谢根祥标注 */
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
