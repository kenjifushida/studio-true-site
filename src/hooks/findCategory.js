const findCategory = (news) => {
    const hasCategory = news.node.categories.nodes.find(
        node => node.ancestors?.nodes[0].name === "we are"
    )
    return hasCategory !== undefined ? hasCategory.name : ""
}

export const findPlace = (post) => {
    const hasPlace = post.node.categories.nodes.find(
        node=> node.ancestors?.nodes[0].name === "place"
    )
    return hasPlace !== undefined ? hasPlace.name : ""
} 

export const findAction = (post) => {
    const hasAction =  post.node.categories.nodes.find(
        node=> node.ancestors?.nodes[0].name === "actions"
    );
    return hasAction !== undefined ? hasAction.name : ""
}

export default findCategory