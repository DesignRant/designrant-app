import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"
import CookieConsent from "react-cookie-consent"
import ReactTooltip from "react-tooltip"
import Header from "./Header"

const Layout = ({ children, showAuthors }) => {
  return (
    <div className="is-grey">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/css/line-awesome.min.css"
        />
      </Helmet>
      <CookieConsent
        location="bottom"
        buttonText="Got it"
        cookieName="DesignRantConsentCookie"
        style={{ background: "#000" }}
        buttonStyle={{
          color: "black",
          fontSize: "13px",
          background: "#ffffff",
          fontFamily: "lato",
          borderRadius: 3,
          padding: 10,
        }}
      >
        <h4 className="margin-0">
          This website uses cookies so we can enhance the user experience and
          avoid ending up on a site like this one.
        </h4>
      </CookieConsent>
      <ReactTooltip
        className="info-tooltip"
        className="is-black-bg is-white lato"
      />
      <body>
        <div className="container margin-10-tb ">
          <div className="row">
            <div className=" col-xs-12 col-md-2 margin-3-b ">
              <div className="margin-1-lr">
                <Header />
              </div>
            </div>
            <main className="col-xs-12 col-md-10 ">
              <div className="margin-1-lr">{children}</div>
              {showAuthors && (
                <footer className="is-black text-align-center margin-5-t">
                  <p>
                  We're not usually this negative. Why not{" "}
                  <Link to="/authors">meet the authors</Link>?
                  </p>
                  <p style={{opacity: '70%'}}>
                    <Link to="/legal">Legal</Link>
                  </p>
                </footer>
              )}
            </main>
          </div>
        </div>
      </body>
    </div>
  )
}

export default Layout
