import React, { Component } from 'react'
//import svg
import logo from "../../assets/logo.svg"

export class Logo extends Component {
    render() {
        return (
            <div className='header__logo'>
                <img src={logo} alt="logo" />
            </div>
        )
    }
}

export default Logo