import React, { Component } from 'react'
//import custom components
import Actions from './Actions'
import Navigation from "./Navigation"
import Logo from './Logo'
// import styles css
import styles from "./Header.module.css"


export class Header extends Component {
    render() {
        return (
            <div className={styles.header}>
                <div className={styles.content}>
                    <Navigation />
                    <Logo />
                    <Actions />
                </div>
            </div>
        )
    }
}

export default Header