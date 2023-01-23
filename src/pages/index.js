import * as React from "react"
import { graphql, Link } from "gatsby"
import * as styles from "../styles/index.module.scss"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Links from "../components/links"

import { visionContent } from "../components/vision"
import { approaches } from "../components/approaches"
import { actions } from "../components/actions"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

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
  console.log(menuOptions[2].posts[0].img);
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
                <div className={styles.postOverlay} style={{background:"var(--box-bg)"}}></div>
              </Link>
            ))}
          </div>
        </div>
        {menuOptions.map((option, idx) => (
          <div key={idx} className={styles.optionsContainer}>
            <div className={styles.optionsContent}>
              <Link to={`/${option.option}`} className={styles.option}>{option.option}</Link>
              {option.posts.map((post, idx) => (
                <Link key={idx} to={post.slug} className={styles.post}>
                  <div className={styles.innerPost}>
                    <span className={styles.postDesc} dangerouslySetInnerHTML={{__html: post.desc}}></span>
                    <span>{post.date.replaceAll("-",".")}</span>
                    <span className={styles.postName}>{post.title.length > 8 ? post.title.slice(0,8)+"...": post.title}</span>
                  </div>
                  {post.img !== undefined ? <GatsbyImage className={styles.imgContainer} image={post.img} /> : null }
                  <div className={styles.postOverlay}
                  style={post.img ===undefined ? {background: "var(--box-bg)"}:{}}>{option.option === "news" ? post.date.replaceAll("-","").slice(2) : null}</div>
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