import React, { Component } from 'react'
import Actions from './Actions'
import Logo from './Logo'
import Navigation from "./Navigation"


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