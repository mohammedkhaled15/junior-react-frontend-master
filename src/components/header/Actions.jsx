import React, { Component } from 'react'
//import svgs
import downArrow from "../../assets/downArrow.svg"
import cart from "../../assets/cart.svg"
//import context
import { AppConsumer } from '../context/appContext'
// import required query tools
import { Query } from '@apollo/client/react/components'
import { GET_CURRENCY_DATA } from '../../gql/Query'
// import custom components
import CartModal from '../cartmodal/CartModal'
// import css styles
import styles from "./Actions.module.css"

export class Actions extends Component {

  render() {
    return (
      <AppConsumer>
        {({ currency, currencySymbol, currencyModal, changeCurrency, showCurrencyModal, totallProducts, cartModal, showCartModal }) => {
          return (
            <div className={styles.actions}>
              <div onClick={showCurrencyModal} className={styles.currency}>
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
                        <ul className={styles.currencyList} style={currencyModal ? { opacity: "100%", display: "block" } : { opacity: "0", display: "none" }}>
                          {
                            data.currencies.map((curr, index) => {
                              return (
                                <li key={index}
                                  onClick={() => changeCurrency(curr.label, curr.symbol)}
                                  className={styles.currencyElement}
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
              <div onClick={showCartModal} className={styles.actionsCart}>
                <img src={cart} alt="cart" width={"24px"} />
                {totallProducts !== 0 ? <div className={styles.actionsCartInd}>{totallProducts}</div> : null}
                {cartModal && <CartModal totallProducts={totallProducts} />}
              </div>
            </div >
          )
        }}
      </AppConsumer>
    )
  }
}

export default Actions