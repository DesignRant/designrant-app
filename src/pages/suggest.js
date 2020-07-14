import React, { useState } from "react"
import { graphql } from "gatsby"
import { format } from "date-fns"
import { Emojione } from "react-emoji-render"
import { useCollectionOnce } from "react-firebase-hooks/firestore"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Loader from "../components/Loader"
import { useLocalStorage } from "../utils/customHooks"
let firebase

const isProd = process.env.GATSBY_PRODUCTION

if (typeof window !== "undefined" && isProd) {
  firebase = require("firebase/app")
  require("firebase/firestore")
}

const Suggest = ({ data, location }) => {
  const [suggestions, loading, error] = useCollectionOnce(
    typeof window !== "undefined" &&
      firebase.firestore().collection(`suggestions`)
  )
  const [formVal, setFormVal] = useState("")
  const [submitted, setSubmitted] = useState()
  const [stars, setStars] = useLocalStorage("stars", [])
  const siteTitle = data.site.siteMetadata.title
  const addSuggestion = () => {
    if (formVal.length > 1) {
      firebase.firestore().collection("suggestions").add({
        suggestion: formVal,
        date: new Date(),
      })
      setSubmitted(true)
    }
  }

  const starSuggestion = id => {
    const index = stars.findIndex(item => item === id)
    if (index > -1) {
      let newStars = [...stars]
      newStars.splice(index, 1)
      setStars(newStars)

      firebase
        .firestore()
        .collection("suggestions")
        .doc(id)
        .set(
          {
            stars: firebase.firestore.FieldValue.increment(-1),
          },
          { merge: true }
        )
    } else {
      setStars([...stars, id])
      firebase
        .firestore()
        .collection("suggestions")
        .doc(id)
        .set(
          {
            stars: firebase.firestore.FieldValue.increment(1),
          },
          { merge: true }
        )
    }
  }
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Suggestion" />
      {!submitted ? (
        <div className="is-black margin-1-lr">
          <h1 className="margin-0">Got something rant-worthy?</h1>
          <p className="margin-1-tb">
            Let us know in the box below - we will write about the top rants!
          </p>
          <input
            className="input"
            placeholder="I want to rant about..."
            style={{ width: "100%" }}
            value={formVal}
            onChange={e => setFormVal(e.target.value)}
          />
          <button
            className="bubble-button"
            onClick={() => {
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
              <Emojione text="✅ " />
              Added.
            </h1>
          </div>
          <p className="margin-1-tb">
            Your rant will appear on this list soon.
          </p>
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
            {suggestions.docs
              .sort((a, b) => {
                const AStars = a.data().stars || 0
                const BStars = b.data().stars || 0
                return BStars - AStars
              })
              .map(item => {
                const suggestion = item.data()
                const suggestionStars = suggestion.stars || 0
                const id = item.id
                const starred = stars.includes(id)
                return (
                  <div className="col-xs-12 col-md-6">
                    <div
                      className="margin-1 is-white-bg pad-2 border-radius grow"
                      onClick={() => {
                        starSuggestion(id)
                      }}
                    >
                      <div className="row">
                        <div className="col-xs-2">
                          <div className="flex align-vertical align-horizontal fill-height">
                            <h2
                              className={`margin-0 margin-1-b ${
                                starred ? "is-yellow" : "is-grey opacity-50"
                              }`}
                            >
                              <i class="las la-star"></i>
                            </h2>
                            {starred && (
                              <p className="margin-0">{suggestionStars + 1}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-xs-10">
                          <h4 className="margin-1-b">
                            {suggestion.suggestion}
                          </h4>
                          <p className="opacity-60 margin-0-t">
                            {format(
                              new Date(suggestion.date.seconds * 1000),
                              "HH:mm MMMM dd"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
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
