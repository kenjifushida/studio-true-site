import * as React from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import * as styles from "../styles/index.module.scss"

import Layout from "../components/layout"
import Links from "../components/links"
import MenuRow from "../components/menuRow"
import Seo from "../components/seo"

import { getVision, getApproaches, getActions } from "../hooks/aboutInformation"
import { useIntl } from "gatsby-plugin-react-intl"


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

const IndexPage = ({ data: { news, newsEnglish, projects, projectsEnglish, archives, archivesEnglish } }) => {
  const intl = useIntl();
  const initialNews = intl.locale === "ja" ? news : newsEnglish;
  const initialProjects = intl.locale === "ja" ? projects : projectsEnglish;
  const initialArchives = intl.locale === "ja" ? archives : archivesEnglish;
  
  menuOptions[0].posts = initialNews.edges.map(post=> ({
    title: intl.locale === "ja" ? post.node.title : post.node.translations[0]?.title,
    desc: intl.locale === "ja" ? post.node.excerpt : post.node.translations[0]?.excerpt,
    date: post.node.date,
    slug: `/news/${post.node.slug}`,
    img: getImage(post.node.featuredImage?.node.gatsbyImage)
  }));
  menuOptions[1].posts = initialProjects.edges.map(post=> ({
    title: intl.locale === "ja" ? post.node.title : post.node.translations[0]?.title,
    desc: intl.locale === "ja" ? post.node.excerpt : post.node.translations[0]?.excerpt,
    date: post.node.date,
    slug: `/projects/${post.node.slug}`,
    img: getImage(post.node.featuredImage?.node.gatsbyImage)
  }));
  menuOptions[2].posts = initialArchives.edges.map(post=> ({
    title: intl.locale === "ja" ? post.node.title : post.node.translations[0]?.title,
    desc: intl.locale === "ja" ? post.node.excerpt : post.node.translations[0]?.excerpt,
    date: post.node.date,
    slug: `/archives/${post.node.slug}`,
    img: getImage(post.node.featuredImage?.node.gatsbyImage)
  }));

  return (
    <Layout>
      <div className={styles.content}>
        <MenuRow posts={aboutPosts} option={"about"}/>
        {menuOptions.map((option, idx) => (
          <MenuRow key={idx} posts={option.posts} option={option.option} />
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
    newsEnglish: allWpPost(
      filter: {categories: {nodes: {elemMatch: {name: {eq: "news"}}}}, translations: {elemMatch: {language: {code: {eq: EN}}}}}
      sort: {date: DESC}
    ) {
      edges {
        node {
          date(formatString: "YYYY-MM-DD")
          slug
          author {
            node {
              firstName
              lastName
            }
          }
          featuredImage {
            node {
              gatsbyImage(width: 720)
            }
          }
          translations {
            slug
            title
            excerpt
          }
        }
      }
    }
    projects: allWpPost(
      filter: {categories: {nodes: {elemMatch: {name: {eq: "projects"}}}}}
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
    projectsEnglish: allWpPost(
      filter: {categories: {nodes: {elemMatch: {name: {eq: "projects"}}}}, translations: {elemMatch: {language: {code: {eq: EN}}}}}
      sort: {date: DESC}
    ) {
      edges {
        node {
          date(formatString: "YYYY-MM-DD")
          slug
          author {
            node {
              firstName
              lastName
            }
          }
          featuredImage {
            node {
              gatsbyImage(width: 720)
            }
          }
          translations {
            slug
            title
            excerpt
          }
        }
      }
    }
    archives: allWpPost(
      filter: {categories: {nodes: {elemMatch: {name: {eq: "archives"}}}}}
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
    archivesEnglish: allWpPost(
      filter: {categories: {nodes: {elemMatch: {name: {eq: "archives"}}}}, translations: {elemMatch: {language: {code: {eq: EN}}}}}
      sort: {date: DESC}
    ) {
      edges {
        node {
          date(formatString: "YYYY-MM-DD")
          slug
          author {
            node {
              firstName
              lastName
            }
          }
          featuredImage {
            node {
              gatsbyImage(width: 720)
            }
          }
          translations {
            slug
            title
            excerpt
          }
        }
      }
    }
  }
`