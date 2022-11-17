import React, { Component } from 'react'
import CartContent from '../cartmodal/CartContent'
import { AppConsumer } from '../context/appContext'

export default class ShoppingCart extends Component {
  render() {
    return (
      <AppConsumer>
        {
          ({ shoppingCart, totallProducts, handleCounterIncreament, handleCounterDecreament, hideAnyModal, totalPrice, currency }) => {
            return (
              <section className='shoppingcart'>
                <h1>Cart</h1>

                <CartContent
                  shoppingCart={shoppingCart} currency={currency}
                  handleCounterIncreament={handleCounterIncreament} handleCounterDecreament={handleCounterDecreament} totallProducts={totallProducts} totalPrice={totalPrice} hideAnyModal={hideAnyModal}
                  view={"shoppingCart"} />

              </section>
            )
          }
        }
      </AppConsumer>
    )
  }
}
