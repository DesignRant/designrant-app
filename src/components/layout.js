import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"
import CookieConsent from "react-cookie-consent"
import useDarkMode from "use-dark-mode"
import Header from "./Header"

const Layout = ({ children, showAuthors }) => {
  const darkMode = useDarkMode(false)
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

              <footer className="is-black text-align-center margin-1-t">
                {showAuthors && (
                  <>
                    <p>
                      We're not usually this negative. Why not{" "}
                      <Link to="/authors">meet the authors</Link>?
                    </p>
                    <a
                      href="https://www.producthunt.com/posts/designrant?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-designrant"
                      target="_blank"
                    >
                      <img
                        src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=219526&theme=${
                          darkMode.value ? "dark" : "light"
                        }`}
                        alt="DesignRant - Short, sharp, user experience complaints. | Product Hunt Embed"
                        style={{ width: 250, height: 54 }}
                        width="250px"
                        height="54px"
                      />
                    </a>
                  </>
                )}
                <p className="margin-1-t" style={{ opacity: "30%" }}>
                  -
                </p>

                <p className="legal" style={{ opacity: "70%" }}>
                  All views expressed on this site are those of the individual
                  and do not represent the opinions of any entity whatsover with
                  which they have been, are now or will be affiliated with.
                </p>
                <p className="legal" style={{ opacity: "70%" }}>
                  <Link to="/stats">Stats</Link> |{" "}
                  <Link to="/legal">Legal</Link>
                </p>
              </footer>
            </main>
          </div>
        </div>
      </body>
    </div>
  )
}

export default Layout
