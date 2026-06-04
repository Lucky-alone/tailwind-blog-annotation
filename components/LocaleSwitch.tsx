'use client'

/**
 * 语言切换组件
 * 在 Header 中 ThemeSwitch 右侧显示，支持 English / 中文 切换
 * 使用 Headless UI Menu 实现下拉选择菜单
 * 按钮显示"语言"二字文本，不使用图标
 */

import { Fragment, useEffect, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { useLocale, type Locale } from './locale-provider'

/** 语言选项配置 */
const LOCALE_OPTIONS: { value: Locale; label: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'zh', label: '中文' },
]

const LocaleSwitch = () => {
    const [mounted, setMounted] = useState(false)
    const { locale, setLocale } = useLocale()

    // 客户端挂载后才显示真实内容，避免水合不匹配
    useEffect(() => setMounted(true), [])

    return (
        <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
                <div className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center">
                    <MenuButton aria-label="Language switcher">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {mounted ? '语言' : ''}
                        </span>
                    </MenuButton>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <MenuItems className="ring-opacity-5 absolute right-0 z-50 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-hidden dark:bg-gray-800">
                        <div className="p-1">
                            {LOCALE_OPTIONS.map((option) => (
                                <MenuItem key={option.value}>
                                    {({ focus }) => (
                                        <button
                                            onClick={() => setLocale(option.value)}
                                            className={`${focus ? 'bg-primary-600 text-white' : ''} ${locale === option.value ? 'font-bold text-primary-500' : ''
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            {option.label}
                                        </button>
                                    )}
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    )
}

export default LocaleSwitch
