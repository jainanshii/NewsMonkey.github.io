import React, { Component } from 'react'
import loading from   './loading.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-10 mx-10">
        <img src={loading} alt="loading..." style={{width:"150px",height:"159px"}}/>
      </div>
    )
  }
}
