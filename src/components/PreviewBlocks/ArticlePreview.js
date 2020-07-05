import React from "react"
import { Link } from "gatsby"

const ArticlePreview = ({ title, date, tags, slug, description, excerpt }) => {
  return (
    <Link to={slug} className="margin-0 padding-0">
      <div className="row is-white-bg  margin-3-b grow link">
        <div className=" col-xs-12">
          <div key={slug} className=" pad-3-lr pad-2-tb">
            <div>
              <h2 className="margin-1-b">{title}</h2>
            </div>
            <div className="flex align-horizontal">
              <p className="is-black margin-0 margin-1-r margin-1-t">{date}</p>
              {tags.map((item, index) => (
                <p
                  className={`tag-primary ${
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
                  __html: description || excerpt,
                }}
              />
            </section>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ArticlePreview
