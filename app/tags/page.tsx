/**
 * 标签列表页面入口
 * 保留 metadata 导出，使用客户端组件渲染翻译文本
 */
import type { Metadata } from 'next'
import { genPageMetadata } from 'app/seo'
import TagsPageClient from './TagsPageClient'

export const metadata: Metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default function TagsPage() {
  return <TagsPageClient />
}
