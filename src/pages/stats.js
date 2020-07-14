import React, { useEffect } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { useCollectionOnce } from "react-firebase-hooks/firestore"
import SEO from "../components/seo"
import CountUp from "react-countup"
import ReactTooltip from "react-tooltip"
let firebase

const isProd = process.env.GATSBY_PRODUCTION

if (typeof window !== "undefined" && isProd) {
  firebase = require("firebase/app")
  require("firebase/firestore")
}

export default ({ user, data }) => {
  // Starting values
  let today = new Date().getDate()
  let oneWeekAgo = new Date(new Date().setDate(today - 8)) // Set to 8 to include 7th day ago
  let twoWeeksAgo = new Date(new Date().setDate(today - 15)) // Set to 15 to include 14th day ago
  let totalWords = 0
  let authorList = []
  let totalWorthy = 0
  let totalUnworthy = 0
  let totalRank = 0
  let postsTwoWeeks = 0
  let authorsTwoWeeks = []
  let highestVoted = 0
  let lowestVoted = 100
  let contestedDistanceFrom50 = 50
  let highestVotedWeek = 0
  let highestVotedIndex = 0
  let lowestVotedIndex = 0
  let contestedIndex = 0
  let weekWorthyIndex = 0
  let orderedPosts = []

  // Get post data
  let posts = data.allMarkdownRemark.nodes.map(item => {
    totalWords += item.wordCount.words
    authorList.push(item.frontmatter.author.id)
    if (new Date(item.frontmatter.date) > twoWeeksAgo) {
      postsTwoWeeks += 1
      authorsTwoWeeks.push(item.frontmatter.author.id)
    }
    return {
      url: item.fields.slug,
      reactsID: item.fields.slug.split("/blog/")[1],
      ...item.frontmatter,
      author: item.frontmatter.author.id,
      wordCount: item.wordCount.words,
    }
  })

  const [reacts, loading, error] =
    typeof window !== "undefined" && isProd
      ? useCollectionOnce(firebase.firestore().collection(`reacts`))
      : [0, true, false]

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [loading])

  // Get ranking data
  if (!loading && !error) {
    reacts.forEach(react => {
      const { id } = react
      const data = react.data()
      if (data.worthy) totalWorthy += data.worthy
      if (data.unworthy) totalUnworthy += data.unworthy

      // Overall ranking
      let rank = 0
      if (data.worthy) {
        rank = data.unworthy
          ? (data.worthy / (data.worthy + data.unworthy)) * 100
          : 100
      }
      totalRank += rank

      let postRef = posts.findIndex(item => item.reactsID === id)
      if (postRef > -1) {
        posts[postRef].reacts = {
          ...data,
          rank: Math.round(rank),
        }
      }

      // Ranking for the month
      let monthWorthys = 0
      let monthUnworthys = 0
      let rankDates = Object.keys(posts[postRef].reacts.byDay)
      rankDates.forEach(date => {
        // Check if ranked in current month
        if (
          new Date(date).getMonth === new Date().getMonth &&
          new Date(date).getFullYear === new Date().getFullYear
        ) {
          if (posts[postRef].reacts.byDay[date].worthy)
            monthWorthys += posts[postRef].reacts.byDay[date].worthy
          if (posts[postRef].reacts.byDay[date].unworthy)
            monthUnworthys += posts[postRef].reacts.byDay[date].unworthy
        }
      })
      if (postRef > -1) {
        posts[postRef].reacts = {
          ...posts[postRef].reacts,
          monthRank: Math.round(
            (monthWorthys / (monthWorthys + monthUnworthys)) * 100
          ),
        }
      }

      // Universal Approval
      if (rank > highestVoted) {
        highestVoted = rank
        highestVotedIndex = postRef
      }
      if (rank === highestVoted) {
        // If equal ranking but older then has held longer and is better
        if (posts[postRef].date < posts[highestVotedIndex.date])
          highestVotedIndex = postRef
      }

      // Most Controversial
      if (rank < lowestVoted) {
        lowestVoted = rank
        lowestVotedIndex = postRef
      }
      if (rank === lowestVoted) {
        // If equal ranking but older then has held longer and is worse
        if (posts[postRef].date < posts[highestVotedIndex.date])
          lowestVotedIndex = postRef
      }

      // Heaviest Contested
      if (Math.abs(rank - 50) < contestedDistanceFrom50) {
        contestedDistanceFrom50 = Math.abs(rank - 50)
        contestedIndex = postRef
      }
      let totalNew = 0
      let totalOld = 0
      // If equal ranking then see which has most votes
      if (Math.abs(rank - 50) === contestedDistanceFrom50) {
        if (data.worthy) totalNew += data.worthy
        if (data.unworthy) totalNew += data.unworthy
        if (posts[contestedIndex].worthy)
          totalOld += posts[contestedIndex].worthy
        if (posts[contestedIndex].unworthy)
          totalOld += posts[contestedIndex].unworthy
        if (totalNew > totalOld) {
          contestedIndex = postRef
        }
      }

      // Mjolnir
      if (
        rank > highestVotedWeek &&
        new Date(posts[postRef].date) > oneWeekAgo
      ) {
        highestVotedWeek = rank
        weekWorthyIndex = postRef
      }
      if (
        rank === highestVotedWeek &&
        new Date(posts[postRef].date) > oneWeekAgo
      ) {
        // If equal ranking but older then has held longer and is better
        if (posts[postRef].date < posts[weekWorthyIndex.date])
          weekWorthyIndex = postRef
      }
    })

    // Order posts by rank
    orderedPosts = [...posts]
      .sort((a, b) => {
        if (a.reacts && b.reacts) {
          return a.reacts.monthRank > b.reacts.monthRank
            ? -1
            : b.reacts.monthRank > a.reacts.monthRank
            ? 1
            : 0
        } else return 0
      })
      .filter(posts => posts.reacts)
  }
  console.log(posts)

  const totalRants = posts.length
  const rants = posts.filter(post => post.reacts).length
  const authors = [...new Set(authorList)].length
  const words = totalWords
  const timeToRead = Math.floor(totalWords / 200)
  const totalViews = 178
  const mostTotalViews = 56
  const mostUniqueViewers = 22
  const votes = totalWorthy + totalUnworthy
  const upVotePercentage = Math.round((totalWorthy / votes) * 100)
  const averagePercentage = Math.round(totalRank / rants)
  const twoWeeksRants = postsTwoWeeks
  const twoWeeksAuthorsContributed = [...new Set(authorsTwoWeeks)].length
  const twitterI = 123
  const websiteI = 13
  const kofiI = 7
  const buymeacoffeeI = 2
  const approval = posts[highestVotedIndex]
  const contested = posts[contestedIndex]
  const controversial = posts[lowestVotedIndex]
  const mjolnir = posts[weekWorthyIndex]
  user = {
    ...user,
    twitter: "SamLarsenDisney",
    website: "https://sld.codes/",
    kofi: "sldcodes",
    buymeacoffee: "yannis",
  }

  const addCommas = value => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <Layout>
      <ReactTooltip
        className="info-tooltip"
        className="is-black-bg is-white lato"
      />
      <SEO title="Stats" />
      <div className="row">
        <div className="col-xs-12 margin-2-b is-white-bg pad-3">
          <h1>
            <i class="las la-glasses"></i> The Numbers
          </h1>
          <h3>
            <span className="large-number">
              <CountUp end={totalRants} start={0} duration={0.5} />
            </span>
            {rants !== 1 ? <>{" rants have "}</> : <>{" rant has "}</>}
            been written, totalling{" "}
            <span className="large-number">
              <CountUp end={words} start={0} duration={0.5} />
            </span>
            {authors !== 1 ? <>{" words from "}</> : <>{" word from "}</>}
            <span className="large-number">
              <CountUp end={authors} start={0} duration={0.5} />
            </span>
            {authors !== 1 ? (
              <>{" unique authors. "}</>
            ) : (
              <>{" unique author. "}</>
            )}
            It would take you <span className="large-number">{timeToRead}</span>{" "}
            minutes to read every post on this site.
          </h3>
          {process.env.GOOGLE_ANALYTICS_IS_LIVE && (
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
          )}
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
        {process.env.GOOGLE_ANALYTICS_IS_LIVE ? (
          <div className="col-xs-12 margin-2-b is-white-bg pad-3">
            <h1>
              <i class="las la-heart"></i> Spreading The Love
            </h1>
            <h3>
              We love to see our authors getting the attention they deserve.
              Let's see how many times our author's personal links have been
              visited.
            </h3>

            <div className="col-xs-12 pad-0">
              <div className="row">
                <div className="col-xs-6 pad-0">
                  <h3>Link</h3>
                </div>
                <div className="col-xs-6">
                  <h3>Visits</h3>
                </div>
              </div>
              {user.website && (
                <div className="row">
                  <div className="col-xs-6 pad-0">
                    <h3>
                      <i class="las la-globe"></i> Personal Site
                    </h3>
                  </div>
                  <div className="col-xs-6 align-interactions-vertical">
                    <h3 className="large-number">{addCommas(websiteI)}</h3>
                  </div>
                </div>
              )}
              {user.twitter && (
                <div className="row">
                  <div className="col-xs-6 pad-0">
                    <h3>
                      <i class="lab la-twitter"></i> Twitter
                    </h3>
                  </div>
                  <div className="col-xs-6 align-interactions-vertical">
                    <h3 className="large-number">{addCommas(twitterI)}</h3>
                  </div>
                </div>
              )}
              {(user.kofi || user.buymeacoffee) && (
                <div className="row">
                  <div className="col-xs-6 pad-0">
                    <h3>
                      <i class="las la-coffee"></i> Coffee
                    </h3>
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
        ) : (
          <div></div>
        )}
        {!loading && !error && (
          <div className="col-xs-12 margin-2-b is-white-bg pad-3">
            <h1>
              {" "}
              <i class="las la-medal"></i> Rant Awards
            </h1>
            <h3>Universal Approval - (Highest voted)</h3>
            <div className="row">
              <div className="col-xs-12 pad-0">
                <a href={approval.url} target="_blank" rel="noreferrer">
                  <h4 className="margin-0">
                    {approval.title} - {approval.author}
                  </h4>
                </a>
              </div>
            </div>
            <div className="flex margin-1-t margin-8-b">
              <div
                className="is-yellow-bg-always"
                style={{
                  width: `${100 - approval.reacts.rank}%`,
                  height: 20,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderTopRightRadius: !approval.reacts.worthy && 5,
                  borderBottomRightRadius: !approval.reacts.worthy && 5,
                }}
                data-tip={
                  !loading
                    ? `${100 - approval.reacts.rank}% - ${
                        approval.reacts.unworthy
                      } Downvotes`
                    : ""
                }
              />
              <div
                className="is-light-blue-bg-always"
                style={{
                  width: `${approval.reacts.rank}%`,
                  height: 20,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopLeftRadius: !approval.reacts.unworthy && 5,
                  borderBottomLeftRadius: !approval.reacts.unworthy && 5,
                }}
                data-tip={
                  !loading
                    ? `${approval.reacts.rank}% - ${approval.reacts.worthy} Upvotes`
                    : ""
                }
              />
            </div>
            <h3>Heaviest Contested - (Closest to 50%)</h3>
            <div className="row">
              <div className="col-xs-12 pad-0">
                <a href={contested.url} target="_blank" rel="noreferrer">
                  <h4 className="margin-0">
                    {contested.title} - {contested.author}
                  </h4>
                </a>
              </div>
            </div>
            <div className="flex margin-1-t margin-8-b">
              <div
                className="is-yellow-bg-always"
                style={{
                  width: `${100 - contested.reacts.rank}%`,
                  height: 20,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderTopRightRadius: !contested.reacts.worthy && 5,
                  borderBottomRightRadius: !contested.reacts.worthy && 5,
                }}
                data-tip={`${100 - contested.reacts.rank}% - ${
                  contested.reacts.unworthy
                } Downvotes`}
              />
              <div
                className="is-light-blue-bg-always"
                style={{
                  width: `${contested.reacts.rank}%`,
                  height: 20,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopLeftRadius: !contested.reacts.unworthy && 5,
                  borderBottomLeftRadius: !contested.reacts.unworthy && 5,
                }}
                data-tip={`${contested.reacts.rank}% - ${contested.reacts.worthy} Upvotes`}
              />
            </div>
            <h3>Most Controversial - (Lowest ranking)</h3>
            <div className="row">
              <div className="col-xs-12 pad-0">
                <a href={controversial.url} target="_blank" rel="noreferrer">
                  <h4 className="margin-0">
                    {controversial.title} - {controversial.author}
                  </h4>
                </a>
              </div>
            </div>
            <div className="flex margin-1-t margin-8-b">
              <div
                className="is-yellow-bg-always"
                style={{
                  width: `${100 - controversial.reacts.rank}%`,
                  height: 20,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderTopRightRadius: !controversial.reacts.worthy && 5,
                  borderBottomRightRadius: !controversial.reacts.worthy && 5,
                }}
                data-tip={`${100 - controversial.reacts.rank}% - ${
                  controversial.reacts.unworthy
                } Downvotes`}
              />
              <div
                className="is-light-blue-bg-always"
                style={{
                  width: `${controversial.reacts.rank}%`,
                  height: 20,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopLeftRadius: !controversial.reacts.unworthy && 5,
                  borderBottomLeftRadius: !controversial.reacts.unworthy && 5,
                }}
                data-tip={`${controversial.reacts.rank}% - ${controversial.reacts.worthy} Upvotes`}
              />
            </div>
            <h3>Mjolnir - (The week's most worthy)</h3>
            <div className="row">
              <div className="col-xs-12 pad-0">
                <a href={mjolnir.url} target="_blank" rel="noreferrer">
                  <h4 className="margin-0">
                    {mjolnir.title} - {mjolnir.author}
                  </h4>
                </a>
              </div>
            </div>
            <div className="flex margin-1-t">
              <div
                className="is-yellow-bg-always"
                style={{
                  width: `${100 - mjolnir.reacts.rank}%`,
                  height: 20,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderTopRightRadius: !mjolnir.reacts.worthy && 5,
                  borderBottomRightRadius: !mjolnir.reacts.worthy && 5,
                }}
                data-tip={`${100 - mjolnir.reacts.rank}% - ${
                  mjolnir.reacts.unworthy
                } Downvotes`}
              />
              <div
                className="is-light-blue-bg-always"
                style={{
                  width: `${mjolnir.reacts.rank}%`,
                  height: 20,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopLeftRadius: !mjolnir.reacts.unworthy && 5,
                  borderBottomLeftRadius: !mjolnir.reacts.unworthy && 5,
                }}
                data-tip={`${mjolnir.reacts.rank}% - ${mjolnir.reacts.worthy} Upvotes`}
              />
            </div>
          </div>
        )}
        {orderedPosts.length > 0 && (
          <div className="col-xs-12 margin-2-b is-white-bg pad-3">
            <h1>
              <i class="las la-calendar"></i> Rants Of The Month
            </h1>
            {orderedPosts.map((post, index) => {
              if (index > 4) return
              else
                return (
                  <a
                    href={post.url}
                    key={post.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      key={`post-${post.id}`}
                      className="row align-interactions-vertical top-rants is-black-border margin-1-b"
                    >
                      <div className="col-xs-12 col-sm-2 ">
                        <Img
                          fluid={post.hero.childImageSharp.fluid}
                          className="top-rants-image"
                        />
                      </div>
                      <div className="col-xs-6 col-sm-6">
                        <h3 className="top-rants-title margin-1-tb">
                          {post.title}
                        </h3>
                      </div>
                      {process.env.GOOGLE_ANALYTICS_IS_LIVE && (
                        <div className="col-xs-12 col-sm-2">
                          <h3 className="top-rants-rating margin-0">
                            {post.rating} Views
                          </h3>
                        </div>
                      )}
                      <div
                        className={`col-xs-6 text-align-right ${
                          process.env.GOOGLE_ANALYTICS_IS_LIVE
                            ? "col-sm-2"
                            : "col-sm-4"
                        } `}
                      >
                        <h3 className="top-rants-rating margin-0">
                          {post.reacts
                            ? post.reacts.monthRank + "% Worthy"
                            : "Unvoted"}
                        </h3>
                      </div>
                    </div>
                  </a>
                )
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "Post" } } }) {
      nodes {
        fields {
          slug
        }
        wordCount {
          words
        }
        frontmatter {
          type
          title
          author {
            id
          }
          date
          hero {
            childImageSharp {
              fluid(maxWidth: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`
