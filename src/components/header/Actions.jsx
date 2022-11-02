import React, { Component } from 'react'
import downArrow from "../../assets/downArrow.svg"
import cart from "../../assets/cart.svg"


export class Actions extends Component {
    render() {
        return (
            <div className='navigation__actions'>
                <div className='navigation__actions-currency'>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>$</span>
                    <span>
                        <img src={downArrow} alt="arrow" />
                    </span>
                </div>
                <div className='navigation__actions-cart'>
                    <img src={cart} alt="cart" />
                </div>
            </div>
        )
    }
}

export default Actions