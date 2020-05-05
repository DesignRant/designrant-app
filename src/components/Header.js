import React from "react"
import Logo from "../../content/assets/icon.svg"
import LogoDark from "../../content/assets/icon-dark.svg"
import { Link } from "gatsby"
import useDarkMode from "use-dark-mode"

export default () => {
  const darkMode = useDarkMode(false)
  return (
    <div style={{ marginLeft: "auto", minHeight: 170 }}>
      <Link to="/" style={{ height: 120 }}>
        <img
          src={darkMode.value ? LogoDark : Logo}
          style={{ height: 120 }}
          className="grow"
        />
      </Link>
      <div
        className="is-black flex"
        style={{ height: 10, justifyContent: "space-between" }}
      >
        <button type="button">
          <h2
            onClick={() =>
              darkMode.value ? darkMode.disable() : darkMode.enable()
            }
            className={`las la-adjust link margin-0 rotate-icon ${
              darkMode.value ? "rotate-dark" : "rotate-light"
            }`}
            style={{ fontSize: 32 }}
          ></h2>
        </button>
        <button type="button">
          <Link to="/about">
            <h2
              className={`las la-info-circle link margin-0`}
              style={{ fontSize: 32 }}
            />
          </Link>
        </button>
        <button type="button">
          <h2
            className={`las la-plus-circle link margin-0`}
            style={{ fontSize: 32 }}
          ></h2>
        </button>
      </div>
    </div>
  )
}
