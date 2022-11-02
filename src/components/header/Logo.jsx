import React, { Component } from 'react'
import logo from "../../assets/logo.svg"

export class Logo extends Component {
    render() {
        return (
            <div>
                <img src={logo} alt="logo" />
            </div>
        )
    }
}

export default Logo