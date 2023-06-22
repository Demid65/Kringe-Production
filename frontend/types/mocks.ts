export const sidebarTree: TreeNode[] = [
    {
        title: 'BS1',
        children: [
            {
                title: 'SM1_BS1',
                children: [
                    {
                        title: 'SM1_SM1_BS1',
                        id: 'sm1_sm1_bs1',
                        children: null
                    },
                    {
                        title: 'SM2_SM1_BS1',
                        id: 'sm2_sm1_bs1',
                        children: null
                    }
                ]
            },
            {
                title: 'SM2_BS1',
                children: [
                    {
                        title: 'SM1_SM2_BS1',
                        id: 'sm1_sm2_bs1',
                        children: null
                    },
                    {
                        title: 'SM2_SM2_BS1',
                        id: 'sm2_sm2_bs1',
                        children: null
                    }
                ]
            },
        ]
    },
    {
        title: 'BS2',
        children: [
            {
                title: 'SM1_BS2',
                children: [
                    {
                        title: 'SM1_SM1_BS2',
                        children: null
                    },
                    {
                        title: 'SM2_SM1_BS2',
                        children: null
                    }
                ]
            },
            {
                title: 'SM2_BS1',
                children: [
                    {
                        title: 'SM1_SM2_BS2',
                        children: null
                    },
                    {
                        title: 'SM2_SM2_BS2',
                        children: null
                    }
                ]
            },
        ]
    },
    {
        title: 'BS3',
        children: [
            {
                title: 'SM1_BS3',
                children: []
            },
            {
                title: 'SM2_BS3',
                children: [
                    {
                        title: 'SM1_SM2_BS3',
                        children: null
                    },
                    {
                        title: 'SM2_SM2_BS3',
                        children: null
                    }
                ]
            },
        ]
    },
    {
        title: 'BS4',
        children: [
            {
                title: 'SM1_BS4',
                children: [
                    {
                        title: 'SM1_SM1_BS4',
                        children: null
                    },
                    {
                        title: 'SM2_SM1_BS4',
                        children: null
                    }
                ]
            },
            {
                title: 'SM2_BS4',
                children: [
                    {
                        title: 'SM1_SM2_BS4',
                        children: null
                    }
                ]
            },
        ]
    }
]
export const newThemes: CardData[] = [
    {
        title: "card 1",
        id: "1",
    },
    {
        title: "card 2",
        id: "2",
    },
    {
        title: "card 3",
        id: "3",
    }
]
export const popularThemes: CardData[] = [
    {
        title: "card 1",
        id: "1",
    },
    {
        title: "card 2",
        id: "2",
    },
    {
        title: "card 3",
        id: "3",
    }
]

export const themeTopics: TreeNode[] = sidebarTree