import React, { Component } from 'react'
//import context
import { AppConsumer } from '../context/appContext'
//import required components
import CartContent from './CartContent'
//import css styles
import styles from "./CartModal.module.css"

export default class CartModal extends Component {
  render() {
    return (
      <AppConsumer>
        {
          ({ shoppingCart, totallProducts, handleCounterIncreament, handleCounterDecreament, hideAnyModal, totalPrice, currency }) => {
            return (
              <div className={styles.backdrop} onClick={(e) => hideAnyModal(e)}>
                <div className={styles.cartmodal} onClick={e => e.stopPropagation()}>
                  <h2 className={styles.cartmodalTitle}>
                    My Bag,
                    <span className={styles.span}>
                      {totallProducts === 0 ? "" : totallProducts} {totallProducts === 0 ? "No Items" : totallProducts === 1 ? "item" : "items"}
                    </span>
                  </h2>
                  <CartContent
                    shoppingCart={shoppingCart} currency={currency}
                    handleCounterIncreament={handleCounterIncreament} handleCounterDecreament={handleCounterDecreament} totallProducts={totallProducts} totalPrice={totalPrice} hideAnyModal={hideAnyModal}
                    view={"cartModal"} />
                </div>
              </div>
            )
          }
        }
      </AppConsumer>
    )
  }
}
