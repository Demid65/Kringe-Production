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
export const mainData: {
    popular: CardData[],
    new: CardData[]
} = {
    popular: [
        {
            title: "MA1 - Fall 23 - Assignment 1 - Discussion",
            id: "BS1_MA1_A1",
        },
        {
            title: "BS3 - Best electives - Discussion",
            id: "BS3_electives",
        },
        {
            title: "AGLA - Shared notes",
            id: "BS1_AGLA",
        }
    ],
    new: [
        {
            title: "MA1 - Fall 23 - Assignment 1 - Discussion",
            id: "BS1_MA1_A1",
        },
        {
            title: "BS3 - Best electives - Discussion",
            id: "BS3_electives",
        },
        {
            title: "AGLA - Shared notes",
            id: "BS1_AGLA",
        }
    ]
}

export const themeTopics = {
    title: 'MA1',
    lectures: {
        files: [
            {
                name: 'lec1',
                type: 'pdf',
                id: 'lec1'
            },
            {
                name: 'lec2',
                type: 'pdf',
                id: 'lec2'
            },
            {
                name: 'lec3',
                type: 'pdf',
                id: 'lec3'
            }
        ]
    },
    tutorials: {
        files: [
            {
                name: 'tut1',
                type: 'pdf',
                id: 'tut1'
            },
            {
                name: 'tut2',
                type: 'pdf',
                id: 'tut2'
            }
        ]
    },
    labs: {
        files: []
    },
    shared: {
        files: [
            {
                name: 'test 1 cheatsheet',
                type: 'pdf',
                id: '12'
            }
        ]
    },
    exams: {
        files: []
    },
    additional: {
        files: []
    },
    info: {
        files: []
    }
}