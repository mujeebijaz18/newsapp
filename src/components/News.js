import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 0,
            totalResults: 0
        }
        document.title = `News Planet - ${this.capitalizeFirstLetter(this.props.category)}`
    }

    async componentDidMount() {
        this.props.setProgress(10);
        // let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.props.apiKey}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let url = `http://api.mediastack.com/v1/news?access_key=${this.props.apiKey}&categories=${this.props.category}&languages=en&sort=published_desc&offset=${this.state.page}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(50);
        console.log(parsedData);
        this.setState({ articles: parsedData.data });
        this.setState({ totalResults: parsedData.total });
        this.setState({ loading: false });
        this.props.setProgress(100);

    }

    fetchMoreData = async () => {
        this.props.setProgress(10);
        this.setState({ page: this.state.page + 25 })
        let url = `http://api.mediastack.com/v1/news?access_key=${this.props.apiKey}&categories=${this.props.category}&languages=en&sort=published_desc&offset=${this.state.page}`;
        // let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.props.apiKey}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({ articles: this.state.articles.concat(parsedData.data) });
        this.setState({ totalResults: parsedData.total });
        this.setState({ loading: false });
        this.props.setProgress(100);

    };


    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <>
                <h2 className="text-center my-4" style={{ paddingTop: '60px' }}>News Planet - Top headlines for {this.capitalizeFirstLetter(this.props.category)}</h2>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row my-6">
                            {this.state.articles.map((element) => {
                                if (element.image) {
                                    return <div className="col-md-3 my-2" key={element.url}>
                                        <NewsItem title={element.title ? element.title.slice(0, 40) : null} description={element.description ? element.description.slice(0, 80) : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper iaculis viverra."} imageUrl={element.image} moreUrl={element.url} author={element.author ? element.author : "Unknown"} publishedAt={element.published_at} source={element.source.slice(0, 15)} />
                                    </div>
                                } else {
                                    return false;
                                }
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
