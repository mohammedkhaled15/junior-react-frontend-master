import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'
import { AppConsumer } from './context/appContext'

export class SharedLayout extends Component {
    render() {
        return (
            <AppConsumer>
                {
                    ({ currency, currencySymbol, currencyModal, changeCurrency, showCurrencyModal, hideCurrencyModal }) => {
                        return (
                            <div onClick={currencyModal ? hideCurrencyModal : null}>
                                <Header />
                                <Outlet />
                            </div>
                        )
                    }
                }
            </AppConsumer>
        )
    }
}

export default SharedLayout