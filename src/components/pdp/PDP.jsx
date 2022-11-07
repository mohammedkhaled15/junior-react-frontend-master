//libraries
import React, { Component } from 'react'
import { Query } from '@apollo/client/react/components'
//import withRouter Hoc
import withRouter from '../HOC/withRouter'
//import queries
import { GET_PRODUCT_DETAILS } from '../../gql/Query'


class PDP extends Component {

  render() {
    //getting values from params of the queries
    const { categoryName, productId } = this.props.params
    // console.log(this.state.heroImage)
    return (

      <section className='PDP'>
        <Query query={GET_PRODUCT_DETAILS(productId)}>
          {
            ({ loading, error, data }) => {
              if (error) return "";
              if (loading || !data) return "";
              console.log(data.product.gallery)
              return (
                <>
                  <aside className='PDP__aside'>
                    {data.product.gallery.map(image => {
                      return (
                        <div key={image} className='PDP__aside__img-container'>
                          <img src={image} alt="Detailed-pic" />
                        </div>
                      )
                    })}
                  </aside>
                  <main className='PDP__main'>
                    <div className='PDP__hero-image'>
                      <img src={data.product.gallery[0]} alt="main-view" />
                    </div>
                    <div className='PDP__main__details'>

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

export default withRouter(PDP)
