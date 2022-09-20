import { graphql, useStaticQuery } from 'gatsby'
import { fromJS } from 'immutable'

export const useData = () => {
  const data = useStaticQuery(graphql`
  query {
    allSummaryCleanJson {
      edges {
        node {
          ads
          id
          lowerAmount
          name
          upperAmount
          pageId
          url
        }
      }
    }
  }
  `).allSummaryCleanJson.edges.map(({ node }) => {
    // parse data types as needed
    const { id } = node

    return {
      ...node,

      // convert id to integer
      id: parseInt(id.split("-")[0], 10)
    }
  })

  // return data as immutable objects
  return [fromJS(data)]
}

// helpful documentation for working with immutable lists:
// https://thomastuts.com/blog/immutable-js-101-maps-lists.html
// https://immutable-js.github.io/immutable-js/, specifically the Nested Structures section

// help documentation for merging objects and arrays:
// https://stackoverflow.com/questions/46849286/merge-two-array-of-objects-based-on-a-key