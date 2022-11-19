import React, { Component } from 'react'
//import custom components
import Actions from './Actions'
import Navigation from "./Navigation"
import Logo from './Logo'


export class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className='header__content'>
                    <Navigation />
                    <Logo />
                    <Actions />
                </div>
            </div>
        )
    }
}

export default Header