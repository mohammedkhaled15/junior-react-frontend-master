import React, { Component } from 'react'
import CartContent from '../cartmodal/CartContent'
import { AppConsumer } from '../context/appContext'

export default class ShoppingCart extends Component {
  render() {
    return (
      <AppConsumer>
        {
          ({ shoppingCart, totallProducts, handleCounterIncreament, handleCounterDecreament, hideAnyModal, totalPrice, currency, nextImg, prevImg, showRightArrow, showLeftArrow }) => {

            let usedCurrencySymbol = shoppingCart[shoppingCart.length - 1]?.prices?.filter(price => price.currency.label === currency)[0].currency.symbol

            let titleStyle = { fontWeight: "400", fontSize: "24px" }
            let dataStyle = { fontWeight: "700", fontSize: "24px" }

            return (
              <section className='shoppingcart'>
                <h1 style={{ marginBottom: "55px", position: "relative" }}>Cart</h1>

                <CartContent
                  shoppingCart={shoppingCart} currency={currency}
                  handleCounterIncreament={handleCounterIncreament} handleCounterDecreament={handleCounterDecreament} totallProducts={totallProducts} totalPrice={totalPrice} hideAnyModal={hideAnyModal}
                  view={"shoppingCart"} nextImg={nextImg} showRightArrow={showRightArrow} showLeftArrow={showLeftArrow} prevImg={prevImg} />
                {totallProducts === 0 && <div style={{ display: "flex", justifyContent: "center", alignItem: "center", fontSize: "40px", fontWeight: "700" }}><h2>There is No Items In Your Cart</h2></div>}
                {totallProducts !== 0 &&
                  <div className='shoppingcart__summary'>
                    <table style={{ marginBottom: "16px" }}>
                      <tbody>
                        <tr>
                          <td style={titleStyle}>Tax 21%:</td>
                          <td style={dataStyle}>{usedCurrencySymbol}{(totalPrice * 21 / 100).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td style={titleStyle}>Quantity:</td>
                          <td style={dataStyle}>{totallProducts}</td>
                        </tr>
                        <tr>
                          <td style={titleStyle}>Total:</td>
                          <td style={dataStyle}>{usedCurrencySymbol}{(totalPrice + (totalPrice * 21 / 100)).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <button className='order'>ORDER</button>
                  </div>}
              </section>
            )
          }
        }
      </AppConsumer>
    )
  }
}
