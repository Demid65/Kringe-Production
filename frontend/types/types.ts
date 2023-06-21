type CardData = {
    title: string;
    id: string;
};

interface TreeNode {
    title: string,
    children: TreeNode[] | null
}