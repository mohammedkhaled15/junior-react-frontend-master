import React, { Component } from 'react'
import { AppConsumer } from '../context/appContext'

export default class CartModal extends Component {
    render() {
        return (
            <AppConsumer>
                {
                    ({ shoopingCart, totallProducts }) => {
                        return (
                            <div className='cartmodal'>
                                <h2 className='cartmodal__title'>
                                    My Bag has
                                    <span className='cartmodal__title-span'>
                                        {totallProducts === 0 ? "" : totallProducts} {totallProducts === 0 ? "No Items" : totallProducts === 1 ? "item" : "items"}
                                    </span>
                                </h2>
                                <div className='cartmodal__content'>
                                    {shoopingCart.map(item => {
                                        return (
                                            <div key={item.id} className='cartmodal__content__item'>
                                                <div className='cartmodal__content__item-details'>
                                                    <h5>{item.brand}</h5>
                                                    <h5>{item.name}</h5>
                                                    <h5>{item.price.currency.symbol}{item.price.amount}</h5>
                                                </div>
                                                <div className='cartmodal__content__item-counter'>coonter</div>
                                                <div className='cartmodal__content__item-image'>image</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }
                }
            </AppConsumer>
        )
    }
}
