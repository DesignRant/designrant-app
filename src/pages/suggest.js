import React, { useState } from "react"
import { graphql } from "gatsby"
import { Emojione } from "react-emoji-render"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Suggest = ({ data, location }) => {
  const [submitted, setSubmitted] = useState()
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Suggestion" />
      {!submitted ? (
        <div className="is-black">
          <h1 className="margin-0">Got something rant-worthy?</h1>
          <p className="margin-1-tb">
            Let me know in the box below and amember of out team will check it
            out.
          </p>
          <textarea
            className="input"
            placeholder="I want to rant about..."
            style={{ width: "100%" }}
          />
          <button className="bubble-button" onClick={() => setSubmitted(true)}>
            Submit
          </button>
        </div>
      ) : (
        <div className="is-black">
          <div className="flex align-horizontal">
            <h1 className="margin-0">
              <Emojione text="✅" />
              All sorted.
            </h1>
          </div>
          <p className="margin-1-tb">
            A member of out team will check it out. Expect a rant soon.
          </p>
          <button className="bubble-button margin-3-t">Home</button>
        </div>
      )}
    </Layout>
  )
}

export default Suggest

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
