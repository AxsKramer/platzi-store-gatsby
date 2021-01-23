import React from "react";
import {graphql} from 'gatsby';
import {Jumbo, SEO, Products} from '../components';

//El resultado lo entrega como prop
export const query = graphql`
  query GET_DESCRIPTION{
  allSite{
    edges{
      node{
        siteMetadata{
          description
        }
      }
    }
  }
}
  allStripeSku {
    edges {
      node {
        id
        price
        product {
          name
          metadata {
            description
            wear
            img
          }
        }
      }
    }
  }
`;

const IndexPage = ({data}) => (
  <>
    <SEO title="Home" />
    <Jumbo description={data.allSite.edges[0].node.siteMetadata.description} />
    <Products products={data.allStripeSke.edges} />
  </>
)

export default IndexPage
