/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

exports.createPages = async ({ actions, graphql }) => {
  const news = await graphql(`
    query NewsQuery {
      allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "news"}}}}}) {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `)
  news.data.allWpPost.edges.forEach(post => {
    const slug = post.node.slug
    actions.createPage({
      path: `/news/${slug}`,
      component: require.resolve(`./src/templates/news-detail.js`),
      context: { slug: slug },
    })
  })

  const projects = await graphql(`
  query MyQuery {
    allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "projects"}}}}}) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
  `)
  projects.data.allWpPost.edges.forEach(post=> {
    const slug = post.node.slug;
    actions.createPage({
      path: `/projects/${slug}`,
      component: require.resolve(`./src/templates/projects-detail.js`),
      context: { slug: slug }
    })
  })

  const archives = await graphql(`
  query MyQuery {
    allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "archives"}}}}}) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
  `)
  archives.data.allWpPost.edges.forEach(post=> {
    const slug = post.node.slug;
    actions.createPage({
      path: `/archives/${slug}`,
      component: require.resolve(`./src/templates/archives-detail.js`),
      context: { slug: slug }
    })
  })

  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}
