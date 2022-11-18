//libraries
import React, { Component } from 'react'
import { Query } from '@apollo/client/react/components'
import parse from 'html-react-parser';
//import withRouter Hoc
import withRouter from '../HOC/withRouter'
//import queries
import { GET_PRODUCT_DETAILS } from '../../gql/Query'
import { AppConsumer } from '../context/appContext';


class PDP extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categoryName: "",
      productId: "",
      productObject: {},
      heroImg: "",
      currency: null,
      priceObject: {}
    }
  }


  componentDidMount() {
    //get some data from params
    const { categoryName, productId } = this.props.params
    //declaring the choosen product
    let productObject = this.props.categories.filter(category => category.name === categoryName)[0].products.filter(product => product.id === productId)[0]
    //declaring the default hero image
    const imgUrl = productObject.gallery[0]
    //determine the price object depending on choosen currency
    let priceObject = productObject.prices.filter(price => price.currency.label === this.props.currency)
    //setting currrency = to props currency
    let currency = this.props.currency
    //setting the state wih the new values and setting predict product with new product as acaalback function 
    this.setState({ categoryName, productId, productObject, heroImg: imgUrl, currency, priceObject }, () => this.props.settingNewPredictedProduct(this.state.productObject, this.state.priceObject[0]))
  }

  componentDidUpdate(prevProps) {
    // changing currency state if currency props changed
    if (prevProps.currency !== this.props.currency) {
      let priceObject = this.state.productObject.prices.filter(price => price.currency.label === this.props.currency)
      this.setState({ currency: this.props.currency, priceObject }, () => this.props.settingNewPredictedProduct(this.state.productObject, this.state.priceObject[0]))
    }
  }

  render() {
    return (
      <AppConsumer>
        {
          ({ addAttrToProduct, predictedProduct, addToCart }) => {
            return (
              <section className='PDP'>
                <Query query={GET_PRODUCT_DETAILS(this.state.productId)}>
                  {
                    ({ loading, error, data }) => {
                      if (error) return "";
                      if (loading || !data) return "";
                      return (
                        <>
                          <aside className='PDP__aside'>
                            {data.product.gallery.map(image => {
                              return (
                                <div
                                  key={image}
                                  onClick={() => this.setState({ ...this.state, heroImg: image })}
                                  className={`${this.state.heroImg === image ? "active-pic" : null} PDP__aside__img-container`}>
                                  <img
                                    src={image} alt="Detailed-pic" className={`${this.state.heroImg === image ? "active-pic" : null}`} />
                                </div>
                              )
                            })}
                          </aside>
                          <main className='PDP__main'>
                            <div className='PDP__hero-image'>
                              <img src={this.state.heroImg} alt="main-view" />
                            </div>
                            <div className='PDP__main__details'>
                              <h2 className='brand'>{this.state.productObject.brand}</h2>
                              <h2 className='name'>{this.state.productObject.name}</h2>
                              <div className='attrs'>
                                {
                                  this.state.productObject.attributes?.map(attr => {
                                    return (
                                      <div className='attr-content' key={attr.id}>
                                        <h5 className='attr__title'>{attr.name}:</h5>
                                        <div className='attr__items'>
                                          {attr.items.map(value => {
                                            return (
                                              attr.type !== "swatch" ?
                                                <span key={value.id}
                                                  onClick={() => { addAttrToProduct(attr.name, value.displayValue, this.state.productId) }}
                                                  className={predictedProduct[`${attr.name}`] === value.displayValue ? "active attr__value" : "attr__value"}>
                                                  {value.displayValue}
                                                </span> :
                                                <div key={value.id}
                                                  onClick={() => { addAttrToProduct(attr.name, value.displayValue, this.state.productId) }}
                                                  className={predictedProduct[`${attr.name}`] === value.displayValue ? "active attr__value attr__value-color" : "attr__value attr__value-color"}
                                                  style={{ backgroundColor: `${value.displayValue}`, width: "36px", height: "36px" }}>
                                                </div>
                                            )
                                          })}
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                                <h5 className='attr__title'>PRICE:</h5>
                                <h3 className='attr__price'>
                                  {this.state.priceObject[0].currency.symbol}{this.state.priceObject[0].amount}
                                </h3>
                                <button
                                  onClick={addToCart}
                                  style={!this.state.productObject.inStock ? { pointerEvents: "none", backgroundColor: "#606e64" } : null}
                                  className='add-to-cart'>{!this.state.productObject.inStock ? "Out Of Stock" : "ADD to Cart"}</button>
                                <div className='description'>{parse(this.state.productObject.description)}</div>
                              </div>
                            </div>
                          </main>
                        </>
                      )
                    }
                  }
                </Query>
              </section>
            )
          }
        }
      </AppConsumer>
    )
  }
}

export default withRouter(PDP)
