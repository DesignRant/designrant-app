import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import useDarkMode from "use-dark-mode"
import SEO from "../components/seo"
import Logo from "../../content/assets/icon.svg"
import LogoDark from "../../content/assets/icon-dark.svg"

const ComingSoon = ({ data }) => {
  const darkMode = useDarkMode(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = () => {
    addToMailchimp(email).then(data => {
      setSubmitted(true)
    })
  }
  const siteIntro = data.markdownRemark.html

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
        <div dangerouslySetInnerHTML={{ __html: siteIntro }}></div>

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
            <div className="col-xs-12 col-sm-6 col-md-8 flex align-vertical  margin1-lr">
              <input
                type="text"
                name="email"
                label="email-input"
                placeholder="Enter your email"
                className="input pad-3-tb "
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4  margin1-lr">
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
        <h3> Want to write for us?</h3>
        <p>
          DesignRant puts the Authors first. DesignRant has no ads or sponsors
          so we cannot pay you for your content, but we can help you get
          exposure. We actively encourage cross posting as we understand your
          reach is important.
        </p>
        <p>
          To find out more about the benefits, and start contributing,{" "}
          <a href="https://github.com/slarsendisney/designrant-app">
            check out our github
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default ComingSoon

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { type: { eq: "ComingSoon" } }) {
      html
    }
  }
`
