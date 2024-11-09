import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    // '/AboutMe/': [
    //     {
    //         text: 'AboutMe',
    //         collapsed: false,
    //         items: [
    //             {
    //                 text: 'index',
    //                 link: '/AboutMe/index'
    //             }
    //         ]
    //     }
    // ],
    '/Notes/': [
        {
            text: 'Notes',
            items: [
                { text: 'Markdown Examples', link: '/Notes/markdown-examples' },
                { text: 'Runtime API Examples', link: '/Notes/api-examples' }
            ]
        }
    ]
}
