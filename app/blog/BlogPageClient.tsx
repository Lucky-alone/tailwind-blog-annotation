'use client'

/**
 * 博客列表首页组件，支持分页展示所有文章
 * 使用 i18n 翻译支持中英文切换
 */
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { useTranslation } from '@/components/locale-provider'

const POSTS_PER_PAGE = 5

export default function BlogPage({ posts, totalPages, pagination, initialDisplayPosts }) {
  const { t } = useTranslation()

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={t('blog.title')}
    />
  )
}
