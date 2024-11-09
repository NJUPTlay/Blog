//.vitepress/theme/index.ts
import { watch } from 'vue'
import type { EnhanceAppContext, Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style/index.scss'
import Layout from './layout/index.vue'
let homePageStyle: HTMLStyleElement | undefined

export default {
    extends: DefaultTheme,
    Layout: Layout,
    enhanceApp({ router }: EnhanceAppContext) {
        if (typeof window === 'undefined') return
        watch(
            () => router.route.data.relativePath,
            () => updateHomePageStyle(location.pathname === '/'),
            { immediate: true }
        )
    }
} satisfies Theme

// 设置过渡动画
function updateHomePageStyle(value: boolean) {
    if (value) {
        if (homePageStyle) return
        homePageStyle = document.createElement('style')
        homePageStyle.innerHTML = `
        :root {
            animation: rainbow 12s linear infinite;
        }`
        document.body.appendChild(homePageStyle)
    } else {
        if (!homePageStyle) return
        homePageStyle.remove()
        homePageStyle = undefined
    }
}
// 如上29-31行所示，设置主题色过渡时间为12s