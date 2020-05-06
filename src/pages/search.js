import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Search = ({ data, location }) => {
  return (
    <Layout>
      <SEO title="Search" />
      <div className="is-black">
        <h2 className="margin-0">Site Search</h2>
        <input className="input" />
      </div>
    </Layout>
  )
}

export default Search
