import React, { Component } from 'react'
import downArrow from "../../assets/downArrow.svg"
import cart from "../../assets/cart.svg"
import { AppConsumer } from '../context/appContext'
import { Query } from '@apollo/client/react/components'
import { GET_CURRENCY_DATA } from '../../gql/Query'


export class Actions extends Component {

    render() {
        return (
            <AppConsumer>
                {({ currency, currencySymbol, currencyModal, changeCurrency, showCurrencyModal, totallProducts }) => {
                    return (
                        <div className='navigation__actions'>
                            <div onClick={showCurrencyModal} className='navigation__actions__currency'>
                                <span style={{ fontWeight: 500, fontSize: "18px" }}>{currencySymbol}</span>
                                <span>
                                    <img src={downArrow} alt="arrow" />
                                </span>
                                <Query query={GET_CURRENCY_DATA}>
                                    {
                                        ({ loading, error, data }) => {
                                            if (error) return "";
                                            if (loading || !data) return "";
                                            return (
                                                <ul className='navigation__actions__currency__list' style={currencyModal ? { opacity: "100%", display: "block" } : { opacity: "0", display: "none" }}>
                                                    {
                                                        data.currencies.map((curr, index) => {
                                                            return (
                                                                <li key={index}
                                                                    onClick={() => changeCurrency(curr.label, curr.symbol)}
                                                                    className='navigation__actions__currency__list__ele'
                                                                    style={currency === curr.label ? { backgroundColor: "#eee" } : null}>
                                                                    <span>{curr.symbol}</span>
                                                                    <span>{curr.label}</span>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            )
                                        }}
                                </Query>
                            </div>
                            <div className='navigation__actions-cart'>
                                <img src={cart} alt="cart" width={"24px"} />
                                {totallProducts !== 0 ? <div className='navigation__actions-cart-ind'>{totallProducts}</div> : null}
                            </div>
                        </div >
                    )
                }}
            </AppConsumer>
        )
    }
}

export default Actions