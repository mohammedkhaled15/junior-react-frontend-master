import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import leftArrow from "../../assets/leftArrow.svg"
import rightArrow from "../../assets/rightArrow.svg"

export default class CartContent extends Component {
  render() {
    return (
      <div className='cartmodal__content'>
        {this.props.shoppingCart.map((item, index) => {
          // console.log(item)
          return (
            <div key={item.id + `${index}`} className='cartmodal__content__item' style={this.props.view === "shoppingCart" ? { justifyContent: "space-between" } : null}>
              <div className='cartmodal__content__item-details' style={this.props.view === "shoppingCart" ? { width: "30%" } : null}>
                <h5 style={this.props.view === "cartModal" ? { fontWeight: "300", fontSize: "16px" } : { fontWeight: "600", fontSize: "30px" }}>
                  {item.brand}
                </h5>
                <h5 style={this.props.view === "cartModal" ? { fontWeight: "300", fontSize: "16px", marginBottom: "4px" } : { fontWeight: "400", fontSize: "30px", marginBottom: "4px" }}>
                  {item.name}
                </h5>
                <h5 style={this.props.view === "cartModal" ? { fontWeight: "500", fontSize: "16px", marginBottom: "8px" } : { fontWeight: "700", fontSize: "24px", marginBottom: "8px" }}>
                  {item.prices.filter(price => price.currency.label === this.props.currency)[0].currency.symbol}
                  {item.prices.filter(price => price.currency.label === this.props.currency)[0].amount}
                </h5>
                {
                  item.attrs.map(attr => {
                    return (
                      <div className='attr-content' key={attr.id}>
                        <h5 className='attr__title' style={this.props.view === "cartModal" ? { fontWeight: "400", fontSize: "14px", marginBottom: "8px" } : { fontWeight: "700", fontSize: "18px", marginBottom: "8px" }}>
                          {attr.name}:
                        </h5>
                        <div className='attr__items'>
                          {attr.items.map(value => {
                            return (
                              attr.type !== "swatch" ?
                                <span key={value.id}
                                  style={this.props.view === "cartModal" ? { width: "24px", height: "24px", fontSize: "14px", pointerEvents: "none" } : { width: "63px", height: "45px", fontSize: "16px", pointerEvents: "none" }}
                                  className={item[`${attr.name}`] === value.displayValue ? "active attr__value" : "attr__value"}>
                                  {value.displayValue}
                                </span> :
                                <div key={value.id}
                                  className={item[`${attr.name}`] === value.displayValue ? "active attr__value attr__value-color" : "attr__value attr__value-color"}
                                  style={this.props.view === "cartModal" ? { backgroundColor: `${value.displayValue}`, width: "24px", height: "24px", pointerEvents: "none" } : { backgroundColor: `${value.displayValue}`, width: "36px", height: "36px", pointerEvents: "none" }}>
                                </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className='cartmodal__content__item-counter' style={this.props.view === "shoppingCart" ? { width: "5%", flex: "1", placeItems: "end" } : null}>
                <span style={this.props.view === "shoppingCart" ? { width: "45px", height: "45px", fontSize: "36px" } : null} onClick={() => this.props.handleCounterIncreament(item)}>+</span>
                <span style={this.props.view === "cartModal" ? { fontWeigth: "500", fontSize: "16px", textAlign: "center" } : { fontWeigth: "500", fontSize: "24px", textAlign: "center", width: "45px", height: "45px" }}>{item.count}</span>
                <span style={this.props.view === "shoppingCart" ? { width: "45px", height: "45px", fontSize: "36px" } : null} onClick={() => this.props.handleCounterDecreament(item)}>-</span>
              </div>
              <div className='cartmodal__content__item-image' style={this.props.view === "shoppingCart" ? { width: "22%", flex: "unset" } : null}>
                <img src={item.thumbnail} alt="preview" />
                {this.props.view === "shoppingCart" && item.gallery.length !== 1 && <div className='image-arrows'>
                  {this.props.showLeftArrow && <img src={leftArrow} alt="left" onClick={() => this.props.prevImg(item)} />}
                  {this.props.showRightArrow && <img src={rightArrow} alt="right" onClick={() => this.props.nextImg(item)} />}
                </div>}
              </div>
            </div>
          )
        })}
        {this.props.totallProducts > 0 && this.props.view === "cartModal" &&
          <div className='cartmodal__content__total'>
            <span>Total</span>
            <span>
              {this.props.shoppingCart[this.props.shoppingCart.length - 1]?.prices?.filter(price => price.currency.label === this.props.currency)[0].currency.symbol}
              {this.props.totalPrice.toFixed(2)}</span>
          </div>}
        {this.props.totallProducts > 0 && this.props.view === "cartModal" &&
          <div className='cartmodal__content__buttons'>
            <Link to="shoppingcart">
              <button onClick={(e) => { this.props.hideAnyModal(); e.preventDefault() }} className='cartmodal__content__buttons__viewbag'>View Bag</button>
            </Link>
            <button className='cartmodal__content__buttons__checkout'>Check Out</button>
          </div>}
      </div>
    )
  }
}
