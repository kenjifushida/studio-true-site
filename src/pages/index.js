import * as React from "react"
import { graphql } from "gatsby"
import * as styles from "../styles/index.module.scss"

import Layout from "../components/layout"
import Links from "../components/links"
import MenuRow from "../components/menuRow"
import Seo from "../components/seo"

import { getVision, getApproaches, getActions } from "../hooks/aboutInformation"

import { getImage } from "gatsby-plugin-image"

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
const visionContent = getVision();
const approaches = getApproaches();
const actions = getActions();

aboutPosts.push({
  name: "vision",
  ...visionContent
});
approaches.forEach((approach) => {
  aboutPosts.push({
    name: "approaches",
    ...approach
  })
});
actions.forEach((action) => {
  aboutPosts.push({
    name: "actions",
    ...action
  })
});

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
      sort: {date: DESC}
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