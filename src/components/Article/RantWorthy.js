import React from "react"
import { Emojione } from "react-emoji-render"
import {
  useDocumentOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore"
import { useLocalStorage } from "../../utils/customHooks"

let firebase

if (typeof window !== "undefined") {
  firebase = require("firebase/app")
  require("firebase/firestore")
}

const ReactButton = ({ location, label, onClick }) => (
  <div className={`col-xs-12 col-sm-6 margin-2-b`}>
    <button
      className="is-black-border border-radius-sm pad-1 is-grey fill-width grow"
      onClick={onClick}
    >
      <h3
        className={`margin-0 border-radius pad-1-lr`}
        style={{ fontWeight: "normal" }}
      >
        <Emojione text={label} />
      </h3>
    </button>
  </div>
)

export default () => {
  const pathArray =
    typeof window !== "undefined" && window.location.pathname.includes("blog")
      ? window.location.pathname.split("/")
      : ["test"]

  const contentID =
    pathArray[pathArray.length - 1].length > 0
      ? pathArray[pathArray.length - 1]
      : pathArray[pathArray.length - 2]

  const [reacts, setReacts] = useLocalStorage("reacts", {})
  const [value, loading, error] =
    typeof window !== "undefined"
      ? useDocumentDataOnce(firebase.firestore().doc(`reacts/${contentID}`))
      : [0, true, false]
  let contentReacts = reacts && reacts[contentID]
  const judge = type => {
    if (!loading && !error && !contentReacts) {
      setReacts({ ...reacts, [contentID]: type })
      firebase
        .firestore()
        .collection("reacts")
        .doc(contentID)
        .set(
          {
            [type]: firebase.firestore.FieldValue.increment(1),
          },
          { merge: true }
        )
    }
  }

  const Wrapper = ({ children }) => (
    <div className="row margin-1-b">{children}</div>
  )
  const Results = () => {
    console.log(value)
    let worthy = 1
    let unworthy = 1
    if (value && value.worthy) {
      worthy = value.worthy
    }
    if (value && value.unworthy) {
      unworthy = value.unworthy
    }
    if (reacts[contentID] === "worthy") {
      worthy += 1
    } else {
      unworthy += 1
    }
    const audience = Math.floor((worthy / (worthy + unworthy)) * 100)
    return (
      <div className={`col-xs-12 margin-2-b text-align-center`}>
        <h4>
          {!loading && !error
            ? `Considered worthy by ${audience}% of Readers`
            : "Loading Results..."}
        </h4>
      </div>
    )
  }
  return (
    <Wrapper>
      {!loading && !error && reacts[contentID] ? (
        <Results />
      ) : (
        <>
          <div className="col-xs-12 text-align-center bold">
            <h3>Is it rant-worthy?</h3>
          </div>
          <ReactButton label="👍 Worthy" onClick={() => judge("worthy")} />
          <ReactButton label="👎 Unworthy" onClick={() => judge("unworthy")} />
        </>
      )}
    </Wrapper>
  )
}
