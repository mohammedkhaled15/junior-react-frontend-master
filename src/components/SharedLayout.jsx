import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'
import { CurrencyConsumer } from './context/currencyContext'

export class SharedLayout extends Component {
    render() {
        return (
            <CurrencyConsumer>
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
            </CurrencyConsumer>
        )
    }
}

export default SharedLayout