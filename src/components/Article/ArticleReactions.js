import React from "react"
import { Emojione } from "react-emoji-render"

export default ({ inline }) => {
  const Wrapper = ({ children }) => (
    <div
      style={
        inline
          ? {}
          : {
              position: "sticky",
              top: 10,
              width: 70,
              marginLeft: "auto",
              marginRight: -100,
            }
      }
      className={`is-white-bg pad-3 border-radius-sm  ${
        inline ? "hide-on-big flex" : "hide-on-small"
      }`}
    >
      {children}
    </div>
  )
  return (
    <Wrapper>
      <h2 className="margin-0 margin-1-b">
        <Emojione text="🍺" /> 12
      </h2>
    </Wrapper>
  )
}
