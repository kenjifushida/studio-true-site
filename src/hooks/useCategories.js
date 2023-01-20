import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

export const useCategory = (postType) => {
    const { 
            places, weAre, projects, 
            actions, media 
        } = useStaticQuery(graphql`
      query MyQuery {
        places: allWpCategory(
          filter: {ancestors: {nodes: {elemMatch: {name: {eq: "place"}}}}}
        ) {
          nodes {
            name
          }
        }
        weAre: allWpCategory(
          filter: {ancestors: {nodes: {elemMatch: {name: {eq: "we are"}}}}}
        ) {
          nodes {
            name
          }
        }
        projects: allWpCategory(
          filter: {ancestors: {nodes: {elemMatch: {name: {eq: "projects"}}}}}
        ) {
          nodes {
            name
          }
        }
        actions: allWpCategory(
          filter: {ancestors: {nodes: {elemMatch: {name: {eq: "actions"}}}}}
        ) {
          nodes {
            name
          }
        }
        media: allWpCategory(
          filter: {ancestors: {nodes: {elemMatch: {name: {eq: "media"}}}}}
        ) {
          nodes {
            name
          }
        }
      }
    `);

    const categories = [
        {
            category: "place",
            options: ["all", ...places.nodes.map(node=>node.name)],
            states: [true, ...places.nodes.map(node=> true)]
        },
        {
            category: "we are",
            options: ["all", ...weAre.nodes.map(node=>node.name)],
            states: [true, ...weAre.nodes.map(node=> true)]
        },
        {
            category: "projects",
            options: ["all", ...projects.nodes.map(node=>node.name)],
            states: [true, ...projects.nodes.map(node=> true)]
        },
        {
            category: "actions",
            options: ["all", ...actions.nodes.map(node=>node.name)],
            states: [true, ...actions.nodes.map(node=> true)]
        },
        {
            category: "media",
            options: ["all", ...media.nodes.map(node=>node.name)],
            states: [true, ...media.nodes.map(node=> true)]
        },
    ];
    var result = [];
    switch (postType) {
        case "news":
            result = categories.filter(category => category.category === "we are")
            break;
        case "projects":
            result = categories.filter(
                category => category.category === "place" || category.category ==="actions" 
                )
            break;
        case "archives":
            result = categories.filter(
                category => category.category === "place" || 
                category.category ==="actions" || 
                category.category ==="media" || 
                category.category ==="projects"
                )
            break;
        default:
            result = categories;
            break;
    }
    return result;
}
