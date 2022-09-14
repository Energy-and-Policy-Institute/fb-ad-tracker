//  creating dynamic pages for the front groups
//  * via: https://hasura.io/blog/building-a-dynamic-listing-web-app-with-pagination-and-dynamic-pages-using-gatsby-2ddee9ec2dc3/
//  * and: https://www.gatsbyjs.com/docs/programmatically-create-pages-from-data/
//  * and: https://egghead.io/lessons/gatsby-build-a-blog-post-template-with-graphql-and-gatsby

const path = require("path") // use path library for navigation

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    // Query for allIndividual2021Json nodes to use in creating the pages for every front group
    const result = await graphql(`
        {
          allIndividualJson {
            edges {
              node {
                  name
              }
            }
          }
        }
      `)
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
    // Create pages for each front group
    const pageTemplate = path.resolve(`src/components/Individual.js`) // page query and template
    result.data.allIndividualJson.edges.forEach(({ node }) => {
      const path = `/${node.name.replace(/\s+/g, '-')}` // dynamic path of the front group, replacing spaces w/ '-'
      createPage({
        path,
        component: pageTemplate,
        // In your blog post template's graphql query, you can use pagePath
        // as a GraphQL variable to query for data from the markdown file.
        context: {
          pagePath: node.name,
        },
      })
    })
}