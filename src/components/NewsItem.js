import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, moreUrl, author, publishedAt, source } = this.props;
        return (
            <div>
                <div className="card">
                    <img src={imageUrl ? imageUrl : "https://topesdegama.com/app/uploads-topesdegama.com/2021/09/tablets.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: 1 }}>
                            {source}
                        </span>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p class="card-text"><small class="text-muted">By "{author}" on {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={moreUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
