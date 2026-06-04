'use client'

/**
 * 评论区组件
 * 使用 pliny 封装的第三方评论组件（支持 Giscus / Utterances / Disqus）
 * 展开/折叠模式：首次点击加载评论，之后可自由展开/折叠
 * 支持 i18n：按钮文字中英文切换、Giscus lang 跟随语言设置
 */
import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { useTranslation } from './locale-provider'

export default function Comments({ slug }: { slug: string }) {
  // 是否已加载过评论（首次加载后不再卸载，只控制显示/隐藏）
  const [loaded, setLoaded] = useState(false)
  // 评论区是否展开显示
  const [expanded, setExpanded] = useState(false)
  const { t, locale } = useTranslation()

  if (!siteMetadata.comments?.provider) {
    return null
  }

  // 动态覆盖 Giscus 的 lang 字段，使其跟随 i18n 语言切换
  const commentsConfig = (() => {
    const config = siteMetadata.comments as any
    if (config?.provider === 'giscus' && config.giscusConfig) {
      return {
        ...config,
        giscusConfig: {
          ...config.giscusConfig,
          lang: locale === 'zh' ? 'zh-CN' : 'en',
        },
      }
    }
    return config
  })()

  /** 点击按钮：首次点击加载并展开，之后切换展开/折叠 */
  const handleToggle = () => {
    if (!loaded) {
      setLoaded(true)
      setExpanded(true)
    } else {
      setExpanded(!expanded)
    }
  }

  return (
    <>
      {/* 展开/折叠切换按钮 */}
      <button
        onClick={handleToggle}
        className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md dark:bg-primary-600 dark:hover:bg-primary-700"
      >
        {/* 展开/折叠箭头图标 */}
        <svg
          className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        {loaded
          ? (expanded ? t('comments.collapseComments') : t('comments.expandComments'))
          : t('comments.loadComments')}
      </button>

      {/* 评论区域（首次加载后不卸载，仅控制显示/隐藏） */}
      {loaded && (
        <div
          className={`mt-6 overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <CommentsComponent commentsConfig={commentsConfig} slug={slug} />
        </div>
      )}
    </>
  )
}
