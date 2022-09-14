import { graphql, useStaticQuery } from 'gatsby'
import { fromJS } from 'immutable'

export const useIndividualData = () => {
  const data = useStaticQuery(graphql`
  query {
    allIndividual2021Json {
      edges {
        node {
            name
            region
            lowerAmount
            upperAmount
        }
      }
    }
  }
  `).allIndividual2021Json.edges.map(({ node }) => {

    return {
      ...node,

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