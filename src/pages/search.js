import React, { Component } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import { format } from "date-fns"
import { Index } from "elasticlunr"
import Layout from "../components/layout"
import SEO from "../components/seo"

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          className="input"
          placeholder="Search titles, tags, descriptions and more..."
          value={this.state.query}
          onChange={this.search}
          autoFocus
        />
        <div className="row margin-3-t">
          {this.state.results.map(page => {
            console.log({ page })
            return (
              <Link
                style={{ boxShadow: `none`, textDecoration: "none" }}
                to={page.slug}
                className=""
              >
                <div className="row is-white-bg  margin-3-b grow link">
                  <div className=" col-xs-12  ">
                    <div key={page.slug} className=" pad-3-lr pad-2-tb  ">
                      <div>
                        <h2 className="margin-1-b">{page.title}</h2>
                      </div>
                      <div className="flex align-horizontal">
                        <p className="is-black margin-0 margin-1-r">
                          {format(new Date(page.date), "EEE', 'dd LLL yyyy")}
                        </p>
                        {page.tags.split(" ").map((item, index) => (
                          <p
                            className={`margin-0 pad-1-tb pad-2-lr is-light-grey-bg border-radius-sm is-black ${
                              index !== 0 ? "margin-1-l" : ""
                            }`}
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                      <section>
                        <p
                          className="is-black"
                          dangerouslySetInnerHTML={{
                            __html: page.description || page.excerpt,
                          }}
                        />
                      </section>
                      <section className="flex"></section>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
          {this.state.query.length > 0 && this.state.results.length === 0 && (
            <div className="col-xs-12 ">
              <h4 className="is-black">
                No results found matching that search term.
              </h4>
            </div>
          )}
        </div>
      </div>
    )
  }
  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      results: this.index
        .search(query, { expand: true })
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}

const SearchPage = ({ data, location }) => {
  return (
    <Layout>
      <SEO title="Search" />
      <div className="is-black">
        <h2 className="margin-0">Site Search</h2>
        <StaticQuery
          query={graphql`
            query SearchIndexQuery {
              siteSearchIndex {
                index
              }
            }
          `}
          render={data => <Search searchIndex={data.siteSearchIndex.index} />}
        />
      </div>
    </Layout>
  )
}

export default SearchPage
