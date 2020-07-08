import React from "react"
import Layout from "../components/layout"

import Coffee from "../../content/assets/coffee.png"
import Twitter from "../../content/assets/twitter.svg"
import Website from "../../content/assets/website.svg"

function Stats({ user }) {
  const rants = 4
  const authors = 3
  const words = 3439
  const totalViews = 178
  const mostTotalViews = 56
  const mostUniqueViewers = 22
  const votes = 59
  const upVotePercentage = 74
  const averagePercentage = 70
  const twoWeeksRants = 4
  const twoWeeksAuthorsContributed = 3
  const twitterI = 123
  const websiteI = 13
  const kofiI = 7
  const buymeacoffeeI = 2
  const approval = {
    title: `What's wrong with WhatsApp's "Delete for Everyone" feature`,
    author: "Yannis",
    downVotePercentage: 2,
    upVotePercentage: 98,
    downVotes: 1,
    upVotes: 49,
  }
  const contested = {
    title: "What is DesignRant?",
    author: "Samuel Larsen Disney",
    downVotePercentage: 50,
    upVotePercentage: 50,
    downVotes: 16,
    upVotes: 16,
  }
  const controversial = {
    title: "Cookies Everywhere",
    author: "Ryan Gregory",
    downVotePercentage: 87,
    upVotePercentage: 13,
    downVotes: 7,
    upVotes: 1,
  }
  const mjolnir = {
    title: `What's wrong with WhatsApp's "Delete for Everyone" feature`,
    author: "Yannis",
    downVotePercentage: 2,
    upVotePercentage: 98,
    downVotes: 1,
    upVotes: 49,
  }
  const topRantsMonth = [
    {
      id: "afsdfvdfv",
      title: "My very first post",
      hero:
        "https://designrant.app/static/icon-4b2d12b45903abdca2ee7c635f626597.svg", // will just be a link to posts hero
      rating: 75,
      link: "https://designrant.app", // Will be link to post
    },
    {
      id: "afsdfvdfsdsdvv",
      title: "What is DesignRant?",
      hero:
        "https://designrant.app/static/icon-4b2d12b45903abdca2ee7c635f626597.svg", // will just be a link to posts hero
      rating: 50,
      link: "https://designrant.app",
    },
    {
      id: "afsdfvdfvasdaskc",
      title: `What's wrong with WhatsApp's "Delete for Everyone" feature`,
      hero:
        "https://designrant.app/static/icon-4b2d12b45903abdca2ee7c635f626597.svg", // will just be a link to posts hero
      rating: 98,
      link: "https://designrant.app",
    },
    {
      id: "afs231313dfvdfv",
      title: "Cookies Everywhere",
      hero:
        "https://designrant.app/static/icon-4b2d12b45903abdca2ee7c635f626597.svg", // will just be a link to posts hero
      rating: 13,
      link: "https://designrant.app",
    },
  ]
  user = {
    ...user,
    twitter: "SamLarsenDisney",
    website: "https://sld.codes/",
    kofi: "sldcodes",
    buymeacoffee: "yannis",
  }
  console.log(user)

  let orderedPosts = topRantsMonth.sort((a, b) =>
    a.rating > b.rating ? -1 : b.rating > a.rating ? 1 : 0
  )
  console.log(orderedPosts)

  const addCommas = value => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-xs-12 margin-2-b is-white-bg pad-3">
          <h1>The Numbers</h1>
          <h3>
            <span className="large-number">{addCommas(rants)}</span>
            {rants !== 1 ? <>{" rants have "}</> : <>{" rant has "}</>}
            been written, totalling{" "}
            <span className="large-number">{addCommas(words)}</span>
            {authors !== 1 ? <>{" words from "}</> : <>{" word from "}</>}
            <span className="large-number">{addCommas(authors)}</span>
            {authors !== 1 ? (
              <>{" unique authors. "}</>
            ) : (
              <>{" unique author. "}</>
            )}
          </h3>
          <h3>
            Rants have been viewed{" "}
            {totalViews !== 1 ? (
              <>
                <span className="large-number">{addCommas(totalViews)}</span>{" "}
                {"times, "}
              </>
            ) : (
              <> {"once, "}</>
            )}
            with the most popular rant being viewed{" "}
            {mostTotalViews !== 1 ? (
              <>
                <span className="large-number">
                  {addCommas(mostTotalViews)}
                </span>{" "}
                {"times by "}
              </>
            ) : (
              <> {"once by "}</>
            )}
            {mostUniqueViewers !== 1 ? (
              <>
                <span className="large-number">
                  {addCommas(mostUniqueViewers)}
                </span>{" "}
                {" different people."}
              </>
            ) : (
              <> {" 1 person."}</>
            )}
          </h3>
          <h3>
            <span className="large-number">{addCommas(votes)}</span>
            {rants !== 1 ? <>{" votes have "}</> : <>{" vote has "}</>}
            been cast with{" "}
            <span className="large-number">{addCommas(upVotePercentage)}</span>%
            of votes being upvotes. The average rant-worthy-ness of a post is{" "}
            <span className="large-number">{addCommas(averagePercentage)}</span>
            %.
          </h3>
          <h3>
            In the last two weeks,{" "}
            <span className="large-number">{addCommas(twoWeeksRants)}</span>
            {rants !== 1 ? <>{" new rants have "}</> : <>{" new rant has "}</>}
            been submitted and{" "}
            <span className="large-number">
              {addCommas(twoWeeksAuthorsContributed)}
            </span>
            {rants !== 1 ? <>{" authors have "}</> : <>{" author has "}</>}
            contributed to the site.
          </h3>
        </div>
        <div className="col-xs-12 margin-2-b is-white-bg pad-3">
          <h1>Spreading The Love</h1>
          <h3>
            We love to see our authors getting the attention they deserve. Let's
            see how our author's personal links have been interacted with.
          </h3>
          <div className="col-xs-12 pad-0">
            <div className="row">
              <div className="col-xs-6 pad-0">
                <h3>Link</h3>
              </div>
              <div className="col-xs-6">
                <h3>Interactions</h3>
              </div>
            </div>
            {user.website && (
              <div className="row">
                <div className="col-xs-6 pad-0">
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noreferrer"
                    className="row interactions-link"
                  >
                    <div className="col-xs-3 pad-0 interactions-link">
                      <img
                        src={Website}
                        className="social grow-lg"
                        alt="coffee"
                      />
                    </div>
                    <div className="col-xs-9 pad-2-l interactions-link">
                      <h3>Personal Sites</h3>
                    </div>
                  </a>
                </div>
                <div className="col-xs-6 align-interactions-vertical">
                  <h3 className="large-number">{addCommas(websiteI)}</h3>
                </div>
              </div>
            )}
            {user.twitter && (
              <div className="row">
                <div className="col-xs-6 pad-0">
                  <a
                    href={`https://twitter.com/${user.twitter}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="row interactions-link"
                  >
                    <div className="col-xs-3 pad-0 interactions-link">
                      <img
                        src={Twitter}
                        className="social grow-lg"
                        alt="coffee"
                      />
                    </div>
                    <div className="col-xs-9 pad-2-l interactions-link">
                      <h3>Twitter Pages</h3>
                    </div>
                  </a>
                </div>
                <div className="col-xs-6 align-interactions-vertical">
                  <h3 className="large-number">{addCommas(twitterI)}</h3>
                </div>
              </div>
            )}
            {(user.kofi || user.buymeacoffee) && (
              <div className="row">
                <div className="col-xs-6 pad-0">
                  <a
                    href={
                      user.kofi
                        ? `https://ko-fi.com/${user.kofi}/`
                        : `https://www.buymeacoffee.com/${user.buymeacoffee}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="row interactions-link"
                  >
                    <div className="col-xs-3 pad-0 interactions-link">
                      <img
                        src={Coffee}
                        className="social grow-lg"
                        alt="coffee"
                      />
                    </div>
                    <div className="col-xs-9 pad-2-l interactions-link">
                      <h3>Coffee Purchases</h3>
                    </div>
                  </a>
                </div>
                <div className="col-xs-6 align-interactions-vertical">
                  <h3 className="large-number">
                    {user.kofi ? addCommas(kofiI) : addCommas(buymeacoffeeI)}{" "}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-xs-12 margin-2-b is-white-bg pad-3">
          <h1>Rant Awards</h1>
          <h3>Universal Approval - (Highest Voted)</h3>
          <div className="flex margin-1-t">
            <div
              className="is-yellow-bg-always"
              style={{
                width: `${approval.downVotePercentage}%`,
                height: 20,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
              data-tip={`${approval.downVotePercentage}% - ${approval.downVotes} Downvotes`}
            />
            <div
              className="is-light-blue-bg-always"
              style={{
                width: `${approval.upVotePercentage}%`,
                height: 20,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}
              data-tip={`${approval.upVotePercentage}% - ${approval.upVotes} Upvotes`}
            />
          </div>
          <h3>Heaviest Contested - (Closest to 50% with more than 10 votes)</h3>
          <div className="flex margin-1-t">
            <div
              className="is-yellow-bg-always"
              style={{
                width: `${contested.downVotePercentage}%`,
                height: 20,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
              data-tip={`${contested.downVotePercentage}% - ${contested.downVotes} Downvotes`}
            />
            <div
              className="is-light-blue-bg-always"
              style={{
                width: `${contested.upVotePercentage}%`,
                height: 20,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}
              data-tip={`${contested.upVotePercentage}% - ${contested.upVotes} Upvotes`}
            />
          </div>
          <h3>Most Controversial - (Lowest ranking)</h3>
          <div className="flex margin-1-t">
            <div
              className="is-yellow-bg-always"
              style={{
                width: `${controversial.downVotePercentage}%`,
                height: 20,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
              data-tip={`${controversial.downVotePercentage}% - ${controversial.downVotes} Downvotes`}
            />
            <div
              className="is-light-blue-bg-always"
              style={{
                width: `${controversial.upVotePercentage}%`,
                height: 20,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}
              data-tip={`${controversial.upVotePercentage}% - ${controversial.upVotes} Upvotes`}
            />
          </div>
          <h3>Mjolnir - (The week's most worthy)</h3>
          <div className="flex margin-1-t">
            <div
              className="is-yellow-bg-always"
              style={{
                width: `${mjolnir.downVotePercentage}%`,
                height: 20,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
              data-tip={`${mjolnir.downVotePercentage}% - ${mjolnir.downVotes} Downvotes`}
            />
            <div
              className="is-light-blue-bg-always"
              style={{
                width: `${mjolnir.upVotePercentage}%`,
                height: 20,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}
              data-tip={`${mjolnir.upVotePercentage}% - ${mjolnir.upVotes} Upvotes`}
            />
          </div>
        </div>
        <div className="col-xs-12 margin-2-b is-white-bg pad-3">
          <h1>Rants Of The Month</h1>
          {orderedPosts.length > 0 &&
            orderedPosts.map((post, index) => {
              if (index > 4) return
              else
                return (
                  <a href={post.link} target="_blank" rel="noreferrer">
                    <div
                      key={`post-${post.id}`}
                      className="row align-interactions-vertical top-rants is-black-border"
                    >
                      <div className="col-xs-12 col-sm-2">
                        <img src={post.hero} className="social" alt="hero" />
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <h3 className="top-rants-title">{post.title}</h3>
                      </div>
                      <div className="col-xs-12 col-sm-2">
                        <h3 className="top-rants-rating">
                          {post.rating} Views
                        </h3>
                      </div>
                      <div className="col-xs-12 col-sm-2">
                        <h3 className="top-rants-rating">
                          {post.rating}% Rating
                        </h3>
                      </div>
                    </div>
                  </a>
                )
            })}
        </div>
      </div>
    </Layout>
  )
}

export default Stats
