import React, { Component } from 'react'
//import svg
import logo from "../../assets/logo.svg"
// import css styles
import styles from "./Logo.module.css"

export class Logo extends Component {
    render() {
        return (
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>
        )
    }
}

export default Logo