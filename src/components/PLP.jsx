import { Query } from '@apollo/client/react/components'
import React, { Component } from 'react'
import { GET_PRODUCTS_FOR_CATEGORY } from "../gql/Query"


export class PLP extends Component {

    render() {

        const currency = this.props.currency
        // console.log(this.props.currency)
        return (
            <div className='PLP'>
                < h1 className='PLP__title'> {this.props.category}</h1 >
                <div className='PLP__content'>
                    <Query query={GET_PRODUCTS_FOR_CATEGORY(this.props.category)}>{ //Query component to fetch graphql data
                        ({ loading, error, data }) => {
                            if (error) return <h1>Error...</h1>;
                            if (loading || !data) return <h1>Loading...</h1>;
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
                                    //simply distructur object
                                    const { symbol, price } = getPriceForCurrency(currency)

                                    return (
                                        <div key={product.id} className='PLP__content__card'>
                                            <img src={product.gallery[0]} alt="product" />
                                            <div className='PLP__content__card__desc'>
                                                <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                                                    <span>{product.name}</span>
                                                    <span>{product.brand}</span>
                                                </div>
                                                <span style={{ color: "black", fontWeight: "500" }}>{symbol} {price}</span>
                                            </div>
                                            {!product.inStock && <div className='PLP__content__card__overlay'>Out Of Stock</div>}
                                        </div>
                                    )
                                })

                            )
                        }
                    }
                    </ Query>
                </div >
            </div >
        )
    }
}

export default PLP