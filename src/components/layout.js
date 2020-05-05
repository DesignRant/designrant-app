import React from "react"
import { Helmet } from "react-helmet"
import CookieConsent from "react-cookie-consent"
import Header from "./Header"

const Layout = ({ title, children }) => {
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
          color: "#fff",
          fontSize: "13px",
          background: "#4cbb90",
          fontFamily: "lato",
          borderRadius: 3,
          padding: 10,
        }}
      >
        <h4 className="margin-0">
          This website uses cookies so I can enhance the user experience and
          avoid ending up on a site like this one.
        </h4>
      </CookieConsent>
      <div className="container margin-10-tb pad-3-lr">
        <div className="row">
          <header className=" col-xs-12 col-md-3 flex pad-4-r">
            <Header />
          </header>
          <main className="col-xs-12 col-md-9">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default Layout
