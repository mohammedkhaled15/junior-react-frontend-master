//libraries components
import React, { Component } from 'react'
import { Query } from '@apollo/client/react/components'
import { Link } from 'react-router-dom'
//queries
import { GET_PRODUCTS_FOR_CATEGORY } from "../../gql/Query"
import { Outlet } from 'react-router-dom'
//import svg
import cart from "../../assets/whiteCart.svg"
//import context
import { AppConsumer } from '../context/appContext'

export class PLP extends Component {
  render() {
    const currency = this.props.currency
    return (
      <AppConsumer>
        {
          ({ shoppingCart }) => {
            console.log(shoppingCart)
            return (
              <>
                <div className='PLP'>
                  < h1 className='PLP__title'> {this.props.category}</h1 >
                  <div className='PLP__content'>
                    <Query query={GET_PRODUCTS_FOR_CATEGORY(this.props.category)}>
                      { //Query component to fetch graphql data
                        ({ loading, error, data }) => {
                          if (error) return "";
                          if (loading || !data) return <div className="lds-dual-ring"></div>;
                          return (
                            data.category.products.map((product) => {
                              //function to extract the price depending on product and choosen currency
                              const getPriceForCurrency = (currency) => {
                                const [wantedPriceObject] = product.prices.filter(price => price.currency.label === currency)
                                //return object with the symbol and price
                                return {
                                  symbol: wantedPriceObject.currency.symbol,
                                  price: wantedPriceObject.amount
                                }
                              }
                              //simply distructure object
                              const { symbol, price } = getPriceForCurrency(currency)
                              // console.log(this.props.category)
                              return (
                                <Link key={product.id} to={`${product.id}`} className='PLP__content__card'>
                                  <img src={product.gallery[0]} alt="product" />
                                  {shoppingCart.filter((prod) => prod.id === product.id).length !== 0 &&
                                    <div className='brought-product'>
                                      <img src={cart} alt="brought" />
                                    </div>}
                                  <div className='PLP__content__card__desc'>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                                      <span>{product.name}</span>
                                      <span>{product.brand}</span>
                                    </div>
                                    <span style={{ color: "black", fontWeight: "500" }}>{symbol} {price}</span>
                                  </div>
                                  {/* Adding overlay depending on inStock value */}
                                  {!product.inStock && <div className='PLP__content__card__overlay'>Out Of Stock</div>}
                                </Link>
                              )
                            })
                          )
                        }
                      }
                    </ Query>
                  </div >
                </div >
                <Outlet />
              </>
            )
          }
        }
      </AppConsumer>
    )
  }
}

export default PLP