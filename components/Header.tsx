'use client'

/**
 * 页头导航栏组件
 * 包含 Logo、导航链接、搜索、主题切换、语言切换、移动端导航
 * 使用 i18n 翻译支持导航链接文本中英文切换
 */
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import LocaleSwitch from './LocaleSwitch'
import SearchButton from './SearchButton'
import { useTranslation } from './locale-provider'

/** 导航链接 href 到翻译 key 的映射 */
const NAV_TRANSLATION: Record<string, string> = {
  '/': 'nav.home',
  '/blog': 'nav.blog',
  '/tags': 'nav.tags',
  '/projects': 'nav.projects',
  '/about': 'nav.about',
}

const Header = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }
  const { t } = useTranslation()

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              {t('site.headerTitle')}
            </div>
          ) : (
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              {t('site.headerTitle')}
            </div>
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
              >
                {NAV_TRANSLATION[link.href] ? t(NAV_TRANSLATION[link.href] as any) : link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <LocaleSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
