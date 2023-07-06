type CardData = {
    title: string;
    id: string;
};

interface TreeNode {
    title: string,
    id?: string
    children: TreeNode[] | null
}

export enum loginModes {
    login,
    register
}
export const categoriesList = [
    'lectures',
    'tutorials',
    'labs',
    'shared',
    'exams',
    'additional',
    'info'
] as const;
type Categories = typeof categoriesList[number]

interface MainCardLink {
    title: string,
    id: string,
    target?: Categories
}


type CourseData = {
    [key in Categories]: {
        text?: string,
        files: [{
            name: string,
            type: string,
            id: string
        }]
    };
};


