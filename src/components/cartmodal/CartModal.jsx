import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AppConsumer } from '../context/appContext'
import ProductDetails from './ProductDetails'

export default class CartModal extends Component {
  render() {
    return (
      <AppConsumer>
        {
          ({ shoppingCart, totallProducts, handleCounterIncreament, handleCounterDecreament, hideAnyModal, totalPrice, currency }) => {
            return (
              <div className='backdrop' onClick={hideAnyModal}>
                <div className='cartmodal' onClick={e => e.stopPropagation()}>
                  <h2 className='cartmodal__title'>
                    My Bag,
                    <span className='cartmodal__title-span'>
                      {totallProducts === 0 ? "" : totallProducts} {totallProducts === 0 ? "No Items" : totallProducts === 1 ? "item" : "items"}
                    </span>
                  </h2>
                  <div className='cartmodal__content'>
                    {shoppingCart.map((item, index) => {
                      console.log(item)
                      return (
                        <div key={item.id + `${index}`} className='cartmodal__content__item'>
                          {/* <div className='cartmodal__content__item-details'>
                            <h5 style={{ fontWeight: "300", fontSize: "16px" }}>{item.brand}</h5>
                            <h5 style={{ fontWeight: "300", fontSize: "16px", marginBottom: "4px" }}>{item.name}</h5>
                            <h5 style={{ fontWeight: "500", fontSize: "16px", marginBottom: "8px" }}>
                              {item.prices.filter(price => price.currency.label === currency)[0].currency.symbol}
                              {item.prices.filter(price => price.currency.label === currency)[0].amount}
                            </h5>
                            {
                              item.attrs.map(attr => {
                                return (
                                  <div className='attr-content' key={attr.id}>
                                    <h5 className='attr__title' style={{ fontWeight: "400", fontSize: "14px", marginBottom: "8px" }}>{attr.name}:</h5>
                                    <div className='attr__items'>
                                      {attr.items.map(value => {
                                        return (
                                          attr.type !== "swatch" ?
                                            <span key={value.id}
                                              style={{ width: "24px", height: "24px", fontSize: "14px", fontWeight: "400", marginBottom: "8px", pointerEvents: "none" }}
                                              className={item[`${attr.name}`] === value.displayValue ? "active attr__value" : "attr__value"}>
                                              {value.displayValue}
                                            </span> :
                                            <div key={value.id}
                                              className={item[`${attr.name}`] === value.displayValue ? "active attr__value attr__value-color" : "attr__value attr__value-color"}
                                              style={{ backgroundColor: `${value.displayValue}`, width: "24px", height: "24px", marginBottom: "8px", pointerEvents: "none" }}>
                                            </div>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </div> */}
                          <ProductDetails item={item} currency={currency} />
                          <div className='cartmodal__content__item-counter'>
                            <span onClick={() => handleCounterIncreament(item)}>+</span>
                            <span style={{ fontWeigth: "500", fontSize: "16px", textAlign: "center" }}>{item.count}</span>
                            <span onClick={() => handleCounterDecreament(item)}>-</span>
                          </div>
                          <div className='cartmodal__content__item-image'>
                            <img src={item.thumbnail} alt="preview" />
                          </div>
                        </div>
                      )
                    })}
                    {totallProducts > 0 &&
                      <div className='cartmodal__content__total'>
                        <span>Total</span>
                        <span>
                          {shoppingCart[shoppingCart.length - 1]?.prices?.filter(price => price.currency.label === currency)[0].currency.symbol}
                          {totalPrice.toFixed(2)}</span>
                      </div>}
                    {totallProducts > 0 &&
                      <div className='cartmodal__content__buttons'>
                        <Link to="shoppingcart">
                          <button onClick={hideAnyModal} className='cartmodal__content__buttons__viewbag'>View Bag</button>
                        </Link>
                        <button className='cartmodal__content__buttons__checkout'>Check Out</button>
                      </div>}
                  </div>
                </div>
              </div>
            )
          }
        }
      </AppConsumer>
    )
  }
}
