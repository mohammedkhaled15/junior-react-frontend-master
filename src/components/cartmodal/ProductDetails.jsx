import React, { Component } from 'react'

export default class ProductDetails extends Component {
  render() {
    return (
      <div className='cartmodal__content__item-details'>
        <h5 style={{ fontWeight: "300", fontSize: "16px" }}>{this.props.item.brand}</h5>
        <h5 style={{ fontWeight: "300", fontSize: "16px", marginBottom: "4px" }}>{this.props.item.name}</h5>
        <h5 style={{ fontWeight: "500", fontSize: "16px", marginBottom: "8px" }}>
          {this.props.item.prices.filter(price => price.currency.label === this.props.currency)[0].currency.symbol}
          {this.props.item.prices.filter(price => price.currency.label === this.props.currency)[0].amount}
        </h5>
        {
          this.props.item.attrs.map(attr => {
            return (
              <div className='attr-content' key={attr.id}>
                <h5 className='attr__title' style={{ fontWeight: "400", fontSize: "14px", marginBottom: "8px" }}>{attr.name}:</h5>
                <div className='attr__items'>
                  {attr.items.map(value => {
                    return (
                      attr.type !== "swatch" ?
                        <span key={value.id}
                          style={{ width: "24px", height: "24px", fontSize: "14px", fontWeight: "400", marginBottom: "8px", pointerEvents: "none" }}
                          className={this.props.item[`${attr.name}`] === value.displayValue ? "active attr__value" : "attr__value"}>
                          {value.displayValue}
                        </span> :
                        <div key={value.id}
                          className={this.props.item[`${attr.name}`] === value.displayValue ? "active attr__value attr__value-color" : "attr__value attr__value-color"}
                          style={{ backgroundColor: `${value.displayValue}`, width: "24px", height: "24px", marginBottom: "8px", pointerEvents: "none" }}>
                        </div>
                    )
                  })}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
