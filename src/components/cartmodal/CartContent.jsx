import React, { Component } from 'react'
// import components from libraries
import { Link } from 'react-router-dom'
//import required svgs
import leftArrow from "../../assets/leftArrow.svg"
import rightArrow from "../../assets/rightArrow.svg"
//import css styles modules
import styles from "./CartContent.module.css"

export default class CartContent extends Component {
  render() {
    return (
      <div className={styles.content}>
        {this.props.shoppingCart.map((item, index) => {
          return (
            <div key={item.id + `${index}`} className={styles.item} style={this.props.view === "shoppingCart" ? { justifyContent: "space-between" } : null}>
              <div className={styles.details} style={this.props.view === "shoppingCart" ? { width: "30%" } : null}>
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
                      <div key={attr.id}>
                        <h5 className={styles.attrtitle} style={this.props.view === "cartModal" ? { fontWeight: "400", fontSize: "14px", marginBottom: "8px" } : { fontWeight: "700", fontSize: "18px", marginBottom: "8px" }}>
                          {attr.name}:
                        </h5>
                        <div className={styles.attritems}>
                          {attr.items.map(value => {
                            return (
                              attr.type !== "swatch" ?
                                <span key={value.id}
                                  style={this.props.view === "cartModal" ? { width: "24px", height: "24px", fontSize: "14px", pointerEvents: "none" } : { width: "63px", height: "45px", fontSize: "16px", pointerEvents: "none" }}
                                  className={item[`${attr.name}`] === value.displayValue ? `${styles.attrvalue} ${styles.active}` : `${styles.attrvalue}`}>
                                  {value.displayValue}
                                </span> :
                                <div key={value.id}
                                  className={item[`${attr.name}`] === value.displayValue ? `${styles.attrvalue} ${styles.active} ${styles.attrvaluecolor}` : `${styles.attrvalue} ${styles.attrvaluecolor}`}
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
              <div className={styles.counter} style={this.props.view === "shoppingCart" ? { width: "5%", flex: "1", placeItems: "end" } : null}>
                <span style={this.props.view === "shoppingCart" ? { width: "45px", height: "45px", fontSize: "36px" } : null} onClick={() => this.props.handleCounterIncreament(item)}>+</span>
                <span style={this.props.view === "cartModal" ? { fontWeigth: "500", fontSize: "16px", textAlign: "center" } : { fontWeigth: "500", fontSize: "24px", textAlign: "center", width: "45px", height: "45px" }}>{item.count}</span>
                <span style={this.props.view === "shoppingCart" ? { width: "45px", height: "45px", fontSize: "36px" } : null} onClick={() => this.props.handleCounterDecreament(item)}>-</span>
              </div>
              <div className={styles.image} style={this.props.view === "shoppingCart" ? { width: "22%", flex: "unset" } : null}>
                <img src={item.thumbnail} alt="preview" />
                {this.props.view === "shoppingCart" && item.gallery.length !== 1 &&
                  <div className={styles.imageArrows} style={this.props.showRightArrow && !this.props.showLeftArrow ? { justifyContent: "end" } : null}>
                    {this.props.showLeftArrow && <img src={leftArrow} alt="left" onClick={() => this.props.prevImg(item)} />}
                    {this.props.showRightArrow && <img src={rightArrow} alt="right" onClick={() => this.props.nextImg(item)} />}
                  </div>}
              </div>
              {this.props.view === "shoppingCart" &&
                <div style={{ width: "100%", height: "2px", backgroundColor: "rgba(229, 229, 229, 1)", marginTop: "30px" }}></div>}
            </div>
          )
        })}
        {this.props.totallProducts > 0 && this.props.view === "cartModal" &&
          <div className={styles.total}>
            <span>Total</span>
            <span>
              {this.props.shoppingCart[this.props.shoppingCart.length - 1]?.prices?.filter(price => price.currency.label === this.props.currency)[0].currency.symbol}
              {this.props.totalPrice.toFixed(2)}</span>
          </div>}
        {this.props.totallProducts > 0 && this.props.view === "cartModal" &&
          <div className={styles.buttons}>
            <Link to="shoppingcart" onClick={(e) => { this.props.hideAnyModal(e) }}>
              <div className={styles.viewbag}>View Bag</div>
            </Link>
            <button className={styles.checkout}>Check Out</button>
          </div>}
      </div>
    )
  }
}
