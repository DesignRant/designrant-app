import React from "react"
import { Link, graphql } from "gatsby"
import { kebabCase } from "lodash"
import Layout from "../components/layout"
// import { DirectiveLocation } from 'graphql';
import SEO from "../components/seo"

const TagsPage = ({ data }) => {
  const allTags = data.allMarkdownRemark.group.sort(
    (a, b) => b.totalCount - a.totalCount
  )
  return (
    <Layout>
      <SEO
        title="Tags"
        keywords={[`Design Rant`, `design`, `rant`, `blog`, `tags`]}
      />
      <div className=" row ">
        <div className="col-xs-12">
          <h1 className="margin-0 margin-3-b">Tags</h1>
          <p className="margin-0">
            The following is a list of all the tags on this site.
          </p>
        </div>
        <div className="col-xs-12 margin-5-b">
          <div className="tag-row">
            {allTags.map(tag => (
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                <p className="tag-link-secondary">{tag.fieldValue}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
