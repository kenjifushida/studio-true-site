import * as React from "react"
import { useState } from "react"
import { graphql, Link } from "gatsby"
import * as styles from "../styles/index.module.scss"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Links from "../components/links"

import { visionContent } from "../components/vision"
import { approaches } from "../components/approaches"
import { actions } from "../components/actions"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import MenuRow from "../components/menuRow"

const menuOptions = [
  {
    option: "news",
    posts: []
  },
  {
    option: "projects",
    posts: []
  },
  {
    option: "archives",
    posts: []
  },
];

const aboutPosts = [];
aboutPosts.push({
  name: "vision",
  ...visionContent
})

approaches.forEach(approach => {
  aboutPosts.push({
    name: "approaches",
    ...approach
  })
})
actions.forEach(action => {
  aboutPosts.push({
    name: "actions",
    ...action
  })
})

const IndexPage = ({ data: { news, projects, archives } }) => {
  menuOptions[0].posts = news.edges.map(post=> ({
    title: post.node.title,
    desc: post.node.excerpt,
    date: post.node.date,
    slug: `/news/${post.node.slug}`,
    img: getImage(post.node.featuredImage?.node.gatsbyImage)
  }));
  menuOptions[1].posts = projects.edges.map(post=> ({
    title: post.node.title,
    desc: post.node.excerpt,
    date: post.node.date,
    slug: `/projects/${post.node.slug}`,
    img: getImage(post.node.featuredImage?.node.gatsbyImage)
  }));
  menuOptions[2].posts = archives.edges.map(post=> ({
    title: post.node.title,
    desc: post.node.excerpt,
    date: post.node.date,
    slug: `/archives/${post.node.slug}`,
    img: getImage(post.node.featuredImage?.node.gatsbyImage)
  }));

  return (
    <Layout>
      <div className={styles.content}>
        <MenuRow posts={aboutPosts} option={"about"}/>
        {menuOptions.map((option, idx) => (
          <MenuRow posts={option.posts} option={option.option} />
        ))}
      </div>
      <Links />
    </Layout>
  )
}
export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
  query MyQuery {
    news: allWpPost(
      filter: {categories: {nodes: {elemMatch: {name: {eq: "news"}}}}}
    ) {
      edges {
        node {
          date(formatString: "YYYY-MM-DD")
          title
          slug
          author {
            node {
              firstName
              lastName
            }
          }
          excerpt
          featuredImage {
            node {
              gatsbyImage(width: 720)
            }
          }
        }
      }
    }
    projects: allWpPost(
      filter: {categories: {nodes: {elemMatch: {name: {eq: "projects"}}}}}
    ) {
      edges {
        node {
          date(formatString: "YYYY-MM-DD")
          title
          slug
          author {
            node {
              firstName
              lastName
            }
          }
          excerpt
          featuredImage {
            node {
              gatsbyImage(width: 720)
            }
          }
        }
      }
    }
    archives: allWpPost(
      filter: {categories: {nodes: {elemMatch: {name: {eq: "archives"}}}}}
    ) {
      edges {
        node {
          date(formatString: "YYYY-MM-DD")
          title
          slug
          author {
            node {
              firstName
              lastName
            }
          }
          excerpt
          featuredImage {
            node {
              gatsbyImage(width: 720)
            }
          }
        }
      }
    }
  }
`