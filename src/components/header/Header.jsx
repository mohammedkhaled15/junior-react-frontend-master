import React, { Component } from 'react'
import Actions from './Actions'
import Logo from './Logo'
import Navigation from "./Navigation"


export class Header extends Component {
    render() {
        return (
            <div className='header'>
                <Navigation />
                <Logo />
                <Actions />
            </div>
        )
    }
}

export default Header