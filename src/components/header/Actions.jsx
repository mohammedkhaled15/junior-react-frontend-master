import React, { Component } from 'react'
import downArrow from "../../assets/downArrow.svg"
import cart from "../../assets/cart.svg"
import { CurrencyConsumer } from '../context/currencyContext'
import { Query } from '@apollo/client/react/components'
import { GET_CURRENCY_DATA } from '../../gql/Query'


export class Actions extends Component {

    state = {
        currencyModal: true
    }

    showCurrencyModal = () => {
        // const newState = {...this.state}
        // newState.currencyModal = 
        this.setState({ currencyModal: !this.state.currencyModal })
    }

    render() {
        return (

            <div className='navigation__actions'>
                <CurrencyConsumer>
                    {({ changeCurrency, currency, currencySymbol }) => <div onClick={this.showCurrencyModal} className='navigation__actions__currency'>
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
                                        <>
                                            <ul className='navigation__actions__currency__list' style={this.state.currencyModal ? { height: "120px" } : { height: "0px" }}>
                                                {
                                                    data.currencies.map((curr, index) => {
                                                        return (
                                                            <li key={index}
                                                                onClick={() => changeCurrency(curr.label, curr.symbol)}
                                                                className='navigation__actions__currency__list__ele'>
                                                                <span>{curr.symbol}</span>
                                                                <span>{curr.label}</span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </>
                                    )
                                }
                            }
                        </Query>
                    </div>}
                </CurrencyConsumer>
                <div className='navigation__actions-cart'>
                    <img src={cart} alt="cart" width={"24px"} />
                </div>
            </div >
        )
    }
}

export default Actions