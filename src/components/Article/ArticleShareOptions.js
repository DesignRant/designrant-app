import React from "react"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share"

export default ({ location, twitter, desc }) => {
  const shareData = {
    title: "DesignRant",
    text: desc,
    url: "https://designrant.app" + location.pathname,
  }
  return (
    <div className="row flex" style={{ justifyContent: "center" }}>
      <div className="col-xs-12  text-align-center">
        <div
          className="flex align-horizontal justify-space-between"
          style={{ margin: "auto", maxWidth: 300 }}
        >
          {typeof navigator !== "undefined" && navigator.share && (
            <button
              className="is-green-bg is-white-always margin-0 margin-2-r grow"
              style={{ height: 38, width: 38, borderRadius: "50%" }}
              onClick={() => navigator.share(shareData)}
            >
              <h3 className="margin-0">
                <i class="las la-share"></i>
              </h3>
            </button>
          )}
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
    </div>
  )
}
