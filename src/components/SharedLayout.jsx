import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'

export class SharedLayout extends Component {
    render() {
        return (
            <div>
                <Header />
                <Outlet />
            </div>
        )
    }
}

export default SharedLayout