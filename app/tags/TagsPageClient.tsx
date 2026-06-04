'use client'

/**
 * 标签列表页面组件，展示所有标签及其文章数量
 * 使用 i18n 翻译支持中英文切换
 */
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { useTranslation } from '@/components/locale-provider'

export default function TagsPage() {
  const { t } = useTranslation()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 dark:text-gray-100">
            {t('tags.title')}
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && t('tags.noTags')}
          {sortedTags.map((tg) => {
            return (
              <div key={tg} className="mt-2 mr-5 mb-2">
                <Tag text={tg} />
                <Link
                  href={`/tags/${slug(tg)}`}
                  className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                  aria-label={`${t('tags.viewPosts')} ${tg}`}
                >
                  {` (${tagCounts[tg]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
