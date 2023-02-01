const findCategory = (news) => {
    const hasCategory = news.node.categories.nodes.find(
        node => node.ancestors?.nodes[0].name === "we are"
    )
    return hasCategory !== undefined ? hasCategory.name : ""
}

export default findCategory