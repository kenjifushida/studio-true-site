import * as React from "react"
import { graphql, Link } from "gatsby"
import * as styles from "../styles/index.module.scss"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Links from "../components/links"

import { visionContent } from "../components/vision"
import { approaches } from "../components/approaches"
import { actions } from "../components/actions"

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
  menuOptions[0].posts = news.edges;
  menuOptions[1].posts = projects.edges;
  menuOptions[2].posts = archives.edges;
  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.optionsContainer}>
          <div className={styles.optionsContent}>
            <Link to={"/about"} className={styles.option}>about</Link>
            {aboutPosts.map((post, idx) => (
              <Link key={idx} to={"/about"} className={styles.post}>
                <div className={styles.innerAbout}>
                  <p className={styles.postName}>{post.name}</p>
                  <p className={styles.postDesc}>{post.desc}</p>
                </div>
                <div className={styles.postOverlay}></div>
              </Link>
            ))}
          </div>
        </div>
        {menuOptions.map((option, idx) => (
          <div key={idx} className={styles.optionsContainer}>
            <div className={styles.optionsContent}>
              <Link to={`/${option.option}`} className={styles.option}>{option.option}</Link>
              {option.posts.map((post, idx) => (
                <Link key={idx} to="#" className={styles.post}>
                  <div className={styles.innerPost}>
                    <span className={styles.postDesc} dangerouslySetInnerHTML={{__html: post.node.excerpt}}></span>
                    <span>{post.node.date.replaceAll("-",".")}</span>
                    <span className={styles.postName}>{post.node.title.length > 8 ? post.node.title.slice(0,8)+"...": post.node.title}</span>
                  </div>
                  <div className={styles.postOverlay}>{post.node.date.replaceAll("-",".").slice(2)}</div>
                </Link>
              ))}
            </div>
          </div>
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
          author {
            node {
              firstName
              lastName
            }
          }
          excerpt
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
          author {
            node {
              firstName
              lastName
            }
          }
          excerpt
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
          author {
            node {
              firstName
              lastName
            }
          }
          excerpt
        }
      }
    }
  }
`