'use client'

/**
 * 搜索按钮组件
 * 使用自定义 KBar 搜索系统，支持 i18n 翻译
 * 点击按钮触发 kbar 搜索面板
 */
import siteMetadata from '@/data/siteMetadata'
import { useTranslation } from './locale-provider'
import { useKBarSearch } from './KBarSearch'

const SearchButton = () => {
  const { t } = useTranslation()
  const { openSearch } = useKBarSearch()

  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
  ) {
    return (
      <button aria-label={t('search.label')} onClick={openSearch}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="hover:text-primary-500 dark:hover:text-primary-400 h-6 w-6 text-gray-900 dark:text-gray-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    )
  }
}

export default SearchButton
