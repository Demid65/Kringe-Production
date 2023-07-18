export const sidebarTree: TreeNode[] = [
    {
        title: 'BS1',
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
            },
            {
                title: 'AGLA1',
                id: 'BS1_AGLA1',
                children: null
            },
            {
                title: 'AGLA2',
                id: 'BS1_AGLA2',
                children: null
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
                children: null
            },
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
    {
        title: 'BS4',
        children: [
            {
                title: 'SM1_SM1_BS4',
                children: null
            },
            {
                title: 'SM2_SM1_BS4',
                children: null
            },
            {
                title: 'SM1_SM2_BS4',
                children: null
            }
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
export const discussionTopics = {
    title: 'MA1',
    topics: [
        {
            title: 'Why MA1?',
            author: 'amogus',
            id: 123
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac.',
            author: 'uwu',
            id: 234
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec mi aliquam, gravida ipsum at, tempus neque. Pellentesque sed placerat.',
            author: 'nagibator2011',
            id: 345
        },
        {
            title: 'capstone omg capstone omg',
            author: 'moofiy',
            id: 456
        },
        {
            title: 'Why MA1?',
            author: 'amogus',
            id: 123
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac.',
            author: 'uwu',
            id: 234
        },
        {
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec mi aliquam, gravida ipsum at, tempus neque. Pellentesque sed placerat.',
            author: 'nagibator2011',
            id: 345
        },
        {
            title: 'capstone omg capstone omg',
            author: 'moofiy',
            id: 456
        }
    ]
}

export const discussionMessages = {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac.',
    messages: [
        {
            authorId: 2,
            authorName: 'owo',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus ante tellus, non dapibus augue posuere efficitur. Mauris ornare sem vel leo fringilla sodales. Nulla et urna at nisl pulvinar auctor. Vivamus et erat tincidunt, eleifend magna vitae, aliquet libero. Ut suscipit dui nec felis fringilla, quis congue tortor dignissim. Phasellus dignissim augue ut libero malesuada malesuada. Nam ut commodo tortor, bibendum ultricies risus.'
        },
        {
            authorId: 3,
            authorName: 'moofiy',
            content: 'Etiam rutrum sed tortor sit amet condimentum.'
        },
        {
            authorId: 2,
            authorName: 'owo',
            content: 'Vestibulum lectus sem, mollis non pharetra sed, volutpat a purus. Nam interdum laoreet elit eget semper.'
        },
        {
            authorId: 1,
            authorName: 'amogus',
            content: 'Sed elementum eros nec justo ultricies, vitae convallis ex euismod. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque lobortis tristique orci, nec convallis mi egestas ac. Nulla facilisi. Sed sed lectus imperdiet, elementum tortor a, commodo arcu.'
        },
        {
            authorId: 3,
            authorName: 'moofiy',
            content: '??????????????'
        },
        {
            authorId: 2,
            authorName: 'owo',
            content: 'Curabitur iaculis volutpat dui ac euismod. Duis sed erat mi. Integer odio sapien, consequat non pretium id, tincidunt eget orci.'
        },
        {
            authorId: 1,
            authorName: 'amogus',
            content: 'Vestibulum nec dui lobortis, placerat erat vel, interdum purus.'
        },
    ]
}

export const articleData = {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    name: 'susamogus.md'
}
