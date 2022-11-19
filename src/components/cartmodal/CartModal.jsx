import React, { Component } from 'react'
//import context
import { AppConsumer } from '../context/appContext'
//import required components
import CartContent from './CartContent'

export default class CartModal extends Component {
  render() {
    return (
      <AppConsumer>
        {
          ({ shoppingCart, totallProducts, handleCounterIncreament, handleCounterDecreament, hideAnyModal, totalPrice, currency }) => {
            return (
              <div className='backdrop' onClick={(e) => hideAnyModal(e)}>
                <div className='cartmodal' onClick={e => e.stopPropagation()}>
                  <h2 className='cartmodal__title'>
                    My Bag,
                    <span className='cartmodal__title-span'>
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
