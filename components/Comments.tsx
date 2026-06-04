'use client'

/**
 * 评论区组件
 * 使用 pliny 封装的第三方评论组件（支持 Giscus / Utterances / Disqus）
 * 懒加载方式：点击按钮后才加载评论，优化首屏性能
 * 支持 i18n：按钮文字中英文切换、Giscus lang 跟随语言设置
 */
import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { useTranslation } from './locale-provider'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)
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

  return (
    <>
      {loadComments ? (
        <CommentsComponent commentsConfig={commentsConfig} slug={slug} />
      ) : (
        <button
          onClick={() => setLoadComments(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md dark:bg-primary-600 dark:hover:bg-primary-700"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
          {t('comments.loadComments')}
        </button>
      )}
    </>
  )
}
