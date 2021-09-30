import React, { Component } from 'react';
import Loading from '../ajax-loader.gif'

export default class Spinner extends Component {
    render() {
        return (
            <div className="text-center" >
                <img className="my-5" src={Loading} alt="Loading" />
            </div>
        )
    }
}
