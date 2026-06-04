/**
 * 博客列表首页，服务端组件
 * 获取文章数据后传递给客户端组件渲染
 */
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'

const POSTS_PER_PAGE = 5

export const metadata: Metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <BlogPageClient
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      totalPages={totalPages}
    />
  )
}
