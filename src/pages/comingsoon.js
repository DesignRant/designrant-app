import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import useDarkMode from "use-dark-mode"
import SEO from "../components/seo"
import Logo from "../../content/assets/icon.svg"
import LogoDark from "../../content/assets/icon-dark.svg"

const ComingSoon = () => {
  const darkMode = useDarkMode(true)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = () => {
    addToMailchimp(email).then(data => {
      setSubmitted(true)
    })
  }

  return (
    <div className="is-black">
      <SEO title="Coming Soon" />
      <div
        className="margin-10-tb pad-3-lr"
        style={{ maxWidth: 800, margin: "auto" }}
      >
        <img
          src={darkMode.value ? LogoDark : Logo}
          className="logo-small margin-2-b"
        />

        <h1 className="">You're keen.</h1>
        <div className="line opacity-5" style={{ width: "30%" }} />
        <p>
          DesignRant is still under active development but will be launching
          super soon. You seem keen though, so if you want to get notified when
          we're live you can sign up with your email below.
        </p>
        {submitted ? (
          <div className="row pad-4-tb pad-4-lr border-radius is-white-bg">
            <div className="col-xs-12 flex align-vertical is-black pad-0">
              <h3 className="margin-1-tb">
                ✅ Awesome, you're all signed up!{" "}
              </h3>
              <p className="margin-0 margin-1-b">
                Thanks for showing interest in DesignRant. We will be in touch
                soon.
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
      </div>
    </div>
  )
}

export default ComingSoon
