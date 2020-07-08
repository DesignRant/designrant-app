import React from "react"
import Logo from "../../content/assets/icon.svg"
import LogoDark from "../../content/assets/icon-dark.svg"
import { Link } from "gatsby"
import useDarkMode from "use-dark-mode"

export default () => {
  const darkMode = useDarkMode(false)
  return (
    <div className="row">
      <div className="col-xs-4 pad-0 col-sm-2 col-md-12">
        <Link to="/">
          <img src={darkMode.value ? LogoDark : Logo} className="grow logo" />
        </Link>
      </div>
      <div className="col-xs-8 col-sm-10 col-md-12 nav-buttons">
        <div>
          <div className="is-black flex margin-1-t justify-space-between">
            <button type="button" className="grow">
              <h2
                onClick={() =>
                  darkMode.value ? darkMode.disable() : darkMode.enable()
                }
                className={`las la-adjust link margin-0 nav-icon rotate-icon  ${
                  darkMode.value ? "rotate-dark" : "rotate-light"
                }`}
              ></h2>
            </button>
            <button type="button">
              <Link to="/about">
                <h2 className={`las la-info-circle link margin-0 nav-icon`} />
              </Link>
            </button>
            <button type="button">
              <Link to="/search">
                <h2 className={`las la-search link margin-0 nav-icon`}></h2>
              </Link>
            </button>
          </div>
          <div className="is-black flex margin-1-t justify-space-between">
            <button type="button">
              <Link to="/suggest">
                <h2 className={`las la-plus link margin-0 nav-icon`}></h2>
              </Link>
            </button>
            <button type="button">
              <a href="https://write.designrant.app">
                <h2 className={`las la-feather link margin-0 nav-icon`}></h2>
              </a>
            </button>
            <button type="button">
              <Link to="/stats">
                <h2 className={`las la-chart-bar link margin-0 nav-icon`}></h2>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
