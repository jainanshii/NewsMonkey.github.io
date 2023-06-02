import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
export default class News extends Component {

    capitalize=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
     }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1
        }
        document.title=`NewsMonkey-${this.capitalize(this.props.category)}`
}

 async componentDidMount(){
    var url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=ee6c61bc313b43e6a4718c1c49591143&page=1&pageSize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parseddata = await data.json();
    this.setState({articles:parseddata.articles,totalresult:parseddata.totalResults,
    loading:false});
            }
    handleprevclick=async()=>{
        var url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=ee6c61bc313b43e6a4718c1c49591143&page=${this.state.page-1}&pageSize=${this.props.pagesize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parseddata = await data.json();
        this.setState({articles:parseddata.articles,loading:false,
        page:this.state.page-1});
    }
    
    handlenextclick=async()=>{
        var url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=ee6c61bc313b43e6a4718c1c49591143&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parseddata = await data.json();
        this.setState({
            page:this.state.page+1,
            articles:parseddata.articles,
            loading:false
       });
    }
  render() {
    return (
        <div className="container my-3 text-center">
            <h2>NewsMonkey</h2>
            {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading &&this.state.articles.map((e)=>{
     return <div className="col md-4">
        <Newsitem title={e.title?e.title.slice(0,40):""} description={e.description?e.description.slice(0,80):""} imageurl={e.urlToImage?e.urlToImage:"https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png"} url={e.url}
        author={e.author?e.author:"Unknown"} date={e.publishedAt?e.publishedAt:"Unknown"} source={e.source.name}/>
      </div>
  })}
      </div>
      <div className='d-flex justify-content-between'>
      <button disabled={this.state.page<=1} onClick={this.handleprevclick} type="button" className="btn btn-dark">&larr; Previous</button>
      <button disabled={this.state.page+1>Math.ceil(this.state.totalresult/this.props.pagesize)} onClick={this.handlenextclick} type="button" className="btn btn-dark">Next &rarr;</button>
      </div>
      </div>
    )
  }
}
