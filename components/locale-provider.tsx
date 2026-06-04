'use client'

/**
 * i18n 国际化上下文 Provider
 * 提供语言切换状态管理和翻译函数
 * 基于 React Context + localStorage 持久化方案
 */

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import en from '@/data/i18n/en'
import zh from '@/data/i18n/zh'

/** 支持的语言类型 */
export type Locale = 'en' | 'zh'

/** 翻译字典类型 */
type Translations = typeof en

/** 翻译字典映射 */
const translations: Record<Locale, Translations> = { en, zh }

/** localStorage 存储键名 */
const LOCALE_STORAGE_KEY = 'app-locale'

/** 语言上下文类型定义 */
interface LocaleContextType {
    locale: Locale
    setLocale: (locale: Locale) => void
}

/** 创建语言上下文 */
const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

/**
 * LocaleProvider 组件
 * 管理语言状态，从 localStorage 读取持久化的语言偏好
 * 语言切换时同步更新 localStorage
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en')
    const [mounted, setMounted] = useState(false)

    // 客户端挂载后从 localStorage 读取语言偏好
    useEffect(() => {
        const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null
        if (stored && (stored === 'en' || stored === 'zh')) {
            setLocaleState(stored)
        }
        setMounted(true)
    }, [])

    // 切换语言时同步写入 localStorage
    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale)
        localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
    }, [])

    // 未挂载前返回默认英文，避免水合不匹配
    const currentLocale = mounted ? locale : 'en'

    return (
        <LocaleContext.Provider value={{ locale: currentLocale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    )
}

/**
 * useLocale hook
 * 获取当前语言和切换函数
 */
export function useLocale() {
    const context = useContext(LocaleContext)
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider')
    }
    return context
}

/**
 * useTranslation hook
 * 返回翻译函数 t()，根据当前语言返回对应翻译文本
 * 如果键不存在则返回键名本身作为后备
 */
export function useTranslation() {
    const { locale } = useLocale()
    const dict = translations[locale]

    const t = useCallback(
        (key: keyof Translations): string => {
            return dict[key] || key
        },
        [dict]
    )

    return { t, locale }
}
