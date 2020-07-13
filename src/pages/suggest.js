import React, { useState } from "react"
import { graphql } from "gatsby"
import { format } from "date-fns"
import { Emojione } from "react-emoji-render"
import { useCollectionDataOnce } from "react-firebase-hooks/firestore"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Loader from "../components/Loader"
let firebase

const isProd = process.env.GATSBY_PRODUCTION

if (typeof window !== "undefined" && isProd) {
  firebase = require("firebase/app")
  require("firebase/firestore")
}

const Suggest = ({ data, location }) => {
  const [suggestions, loading, error] = useCollectionDataOnce(
    typeof window !== "undefined" &&
      firebase.firestore().collection(`suggestions`)
  )
  const [submitted, setSubmitted] = useState()
  const siteTitle = data.site.siteMetadata.title
  const addSuggestion = () => {
    firebase.firestore().collection("suggestions").add({
      suggestion: "Yo",
      date: new Date(),
    })
  }
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Suggestion" />
      {!submitted ? (
        <div className="is-black margin-1-lr">
          <h1 className="margin-0">Got something rant-worthy?</h1>
          <p className="margin-1-tb">
            Let us know in the box below and a member of our team will check it
            out.
          </p>
          <textarea
            className="input"
            placeholder="I want to rant about..."
            style={{ width: "100%" }}
          />
          <button
            className="bubble-button"
            onClick={() => {
              setSubmitted(true)
              addSuggestion()
            }}
          >
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
            A member of our team might rant about it. Expect a rant soon.
          </p>
          <button className="bubble-button margin-3-t">Home</button>
        </div>
      )}
      {(loading || error) && (
        <div className="margin-5-b">
          <Loader />
        </div>
      )}
      {!loading && !error && (
        <div className="margin-1-lr">
          <h1 className="is-black">Rants</h1>
          <div className="row">
            {suggestions.map(suggestion => (
              <div className="col-xs-6">
                <div className="margin-1 is-white-bg pad-2 border-radius">
                  <h4>{suggestion.suggestion}</h4>
                  <p className="opacity-60">
                    {format(
                      new Date(suggestion.date.seconds * 1000),
                      "HH:mm MMMM dd"
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
