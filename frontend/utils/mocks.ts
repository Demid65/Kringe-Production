export const sidebarTree: TreeNode[] = [
    {
        title: 'BS1',
        children: [
            {
                title: 'MA',
                children: [
                    {
                        title: 'MA1',
                        id: 'BS1_MA1',
                        children: null
                    },
                    {
                        title: 'MA2',
                        id: 'BS1_MA2',
                        children: null
                    }
                ]
            },
            {
                title: 'AGLA',
                children: [
                    {
                        title: 'AGLA1',
                        id: 'BS1_AGLA1',
                        children: null
                    },
                    {
                        title: 'AGLA2',
                        id: 'BS1_AGLA2',
                        children: null
                    }
                ]
            },
            {
                title: 'Philosophy 1',
                id: 'BS1_PHIL1',
                children: null
            }
        ]
    },
    {
        title: 'BS2',
        children: [
            {
                title: 'OS',
                id: 'BS2_OS',
                children: null
            },
            {
                title: 'Philosophy 2',
                id: 'BS2_PHIL2',
                children: null
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