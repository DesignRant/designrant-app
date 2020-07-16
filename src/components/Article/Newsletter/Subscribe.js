import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { Emojione } from "react-emoji-render"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

const SubscribeForm = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = () => {
    addToMailchimp(email).then(data => {
      setSubmitted(true)
    })

    trackCustomEvent({
      category: "Mailing List",
      action: "Click",
      label: "subscribed",
    })
  }

  return (
    <>
      {submitted ? (
        <div className="row pad-4-tb pad-4-lr border-radius is-white-bg">
          <div className="col-xs-12 flex align-vertical is-black pad-0">
            <h3 className="margin-1-tb">
              <Emojione text="✅" /> Awesome, you're all signed up!{" "}
            </h3>
            <p className="margin-0 margin-1-b">
              Thanks for joining this awesome community.
            </p>
          </div>
        </div>
      ) : (
        <div className="row margin-0-lr">
          <div className="col-xs-12 col-sm-6 col-md-8 flex align-vertical pad-0">
            <input
              type="text"
              name="email"
              label="email-input"
              placeholder="Enter your email"
              className="input pad-3-tb "
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4   flex align-vertical">
            <button
              className="bubble-button pad-3 margin-3-tb "
              type="button"
              aria-label="Subscribe"
              onClick={() => handleSubmit()}
              style={{ width: "100%" }}
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default SubscribeForm
