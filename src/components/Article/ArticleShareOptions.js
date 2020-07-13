import React from "react"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share"

export default ({ location, twitter }) => (
  <div className="row flex" style={{ justifyContent: "center" }}>
    <div className="col-xs-12  text-align-center">
      <FacebookShareButton url={location.href} className="grow">
        <FacebookIcon round={true} style={{ height: 40 }} />
      </FacebookShareButton>
      <LinkedinShareButton url={location.href} className="grow">
        <LinkedinIcon round={true} style={{ height: 40 }} />
      </LinkedinShareButton>
      <TwitterShareButton
        url={`Just found this - ${location.href} by @${twitter} on @DesignRantApp`}
        className="grow"
      >
        <TwitterIcon round={true} style={{ height: 40 }} />
      </TwitterShareButton>
    </div>
  </div>
)
