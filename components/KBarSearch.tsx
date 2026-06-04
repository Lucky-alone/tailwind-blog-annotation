'use client'

/**
 * 自定义 KBar 搜索组件，替代 pliny 的 SearchProvider
 * 支持 i18n 翻译：搜索占位符、分组标题、加载/无结果文本、日期格式
 * 使用 kbar 库直接构建搜索面板，完全控制所有 UI 文本
 */
import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'
import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    KBarResults,
    useMatches,
    useRegisterActions,
    useKBar,
} from 'kbar'
import { formatDate } from 'pliny/utils/formatDate'
import { useTranslation } from './locale-provider'
import siteMetadata from '@/data/siteMetadata'

/** 搜索文档数据结构 */
interface SearchDocument {
    title: string
    date: string
    tags?: string[]
    summary?: string
    path: string
}

/** KBar 搜索上下文，用于从外部触发搜索面板 */
interface KBarSearchContext {
    openSearch: () => void
}

const KBarSearchCtx = createContext<KBarSearchContext>({ openSearch: () => { } })

/** 导出 useKBarSearch hook，供 SearchButton 使用 */
export function useKBarSearch() {
    return useContext(KBarSearchCtx)
}

/** KBar 搜索面板内部模态框 */
function KBarModalInner() {
    const { t, locale } = useTranslation()
    const actions = useSearchActions()

    useRegisterActions(actions, [actions])

    return (
        <KBarPortal>
            <KBarPositioner className="z-50 bg-gray-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50">
                <KBarAnimator className="w-full max-w-xl">
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                        {/* 搜索输入框 */}
                        <div className="flex items-center space-x-4 p-4">
                            <span className="block w-5">
                                <svg
                                    className="text-gray-400 dark:text-gray-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </span>
                            <KBarSearch
                                defaultPlaceholder={t('search.placeholder')}
                                className="h-8 w-full bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none dark:text-gray-200 dark:placeholder-gray-500"
                            />
                            <kbd className="inline-block whitespace-nowrap rounded border px-1.5 align-middle font-medium leading-4 tracking-wide text-xs text-gray-400 border-gray-400">
                                ESC
                            </kbd>
                        </div>
                        {/* 搜索结果 */}
                        <RenderResults />
                    </div>
                </KBarAnimator>
            </KBarPositioner>
        </KBarPortal>
    )
}

/** 加载并注册搜索文档为 kbar actions */
function useSearchActions() {
    const [actions, setActions] = useState<any[]>([])
    const [dataLoaded, setDataLoaded] = useState(false)
    const router = useRouter()
    const { t, locale } = useTranslation()

    useEffect(() => {
        if (dataLoaded) return

        const searchConfig = siteMetadata.search as any
        const searchDocumentsPath = searchConfig?.kbarConfig?.searchDocumentsPath

        if (!searchDocumentsPath) {
            setDataLoaded(true)
            return
        }

        const url =
            searchDocumentsPath.indexOf('://') > 0 || searchDocumentsPath.indexOf('//') === 0
                ? searchDocumentsPath
                : new URL(searchDocumentsPath, window.location.origin)

        fetch(url as string)
            .then((res) => res.json())
            .then((posts: SearchDocument[]) => {
                const mapped = posts.map((post) => ({
                    id: post.path,
                    name: post.title,
                    keywords: post.summary || '',
                    section: t('search.content'),
                    subtitle: formatDate(post.date, locale === 'zh' ? 'zh-CN' : 'en-US'),
                    perform: () => router.push('/' + post.path),
                }))
                setActions(mapped)
                setDataLoaded(true)
            })
            .catch(() => {
                setDataLoaded(true)
            })
    }, [dataLoaded, router, t, locale])

    return actions
}

/** 渲染搜索结果 */
function RenderResults() {
    const { results } = useMatches()
    const { t } = useTranslation()

    if (results.length) {
        return (
            <KBarResults
                items={results}
                onRender={({ item, active }) => (
                    <div>
                        {typeof item === 'string' ? (
                            <div className="pt-3">
                                <div className="block border-t border-gray-100 px-4 pb-2 pt-6 text-xs font-semibold uppercase text-primary-600 dark:border-gray-800">
                                    {item}
                                </div>
                            </div>
                        ) : (
                            <div
                                className={`flex cursor-pointer justify-between px-4 py-2 ${active
                                    ? 'bg-primary-600 text-gray-100'
                                    : 'text-gray-700 dark:text-gray-100 bg-transparent'
                                    }`}
                            >
                                <div className="flex space-x-2">
                                    {item.icon && <div className="self-center">{item.icon}</div>}
                                    <div className="block">
                                        {item.subtitle && (
                                            <div
                                                className={`${active ? 'text-gray-200' : 'text-gray-400'
                                                    } text-xs`}
                                            >
                                                {item.subtitle}
                                            </div>
                                        )}
                                        <div>{item.name}</div>
                                    </div>
                                </div>
                                {item.shortcut?.length ? (
                                    <div
                                        aria-hidden="true"
                                        className="flex flex-row items-center justify-center gap-x-2"
                                    >
                                        {item.shortcut.map((sc: string) => (
                                            <kbd
                                                key={sc}
                                                className={`font-medium h-7 w-6 flex items-center justify-center text-xs rounded border ${active
                                                    ? 'text-gray-200 border-gray-200'
                                                    : 'text-gray-400 border-gray-400'
                                                    }`}
                                            >
                                                {sc}
                                            </kbd>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                )}
            />
        )
    } else {
        return (
            <div className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
                {t('search.noResults')}
            </div>
        )
    }
}

/** KBar 搜索 Provider，替代 pliny 的 SearchProvider */
export function CustomKBarSearchProvider({ children }: { children: React.ReactNode }) {
    return (
        <KBarProvider>
            <KBarSearchWrapper>{children}</KBarSearchWrapper>
        </KBarProvider>
    )
}

/** 内部包装器，在 KBarProvider 内部使用以访问 kbar context */
function KBarSearchWrapper({ children }: { children: React.ReactNode }) {
    const { query } = useKBar()

    const openSearch = () => {
        query.toggle()
    }

    return (
        <KBarSearchCtx.Provider value={{ openSearch }}>
            <KBarModalInner />
            {children}
        </KBarSearchCtx.Provider>
    )
}
