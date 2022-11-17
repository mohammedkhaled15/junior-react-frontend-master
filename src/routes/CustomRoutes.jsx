//Libraries
import { Component } from "react";
import { Query } from '@apollo/client/react/components';
import { Navigate, Route, Routes } from "react-router-dom"
//Components
import PLP from "../components/PLP";
import SharedLayout from "../components/SharedLayout";
import ShoppingCart from "../components/shoppingcart/ShoppingCart";
//context
import { AppConsumer } from "../components/context/appContext";
//queries
import { GET_CATEGORY_NAME } from "../gql/Query"
import PDP from "../components/pdp/PDP";
import React from "react";

export class CustomRoutes extends Component {

  render() {
    return (
      <AppConsumer>
        {({ currency, predictedProduct, settingNewPredictedProduct, ...rest }) => {
          return (
            <Query query={GET_CATEGORY_NAME}>
              {
                ({ loading, error, data }) => {
                  if (error) return "";
                  if (loading || !data) return "";
                  return (
                    <Routes>
                      <Route path="/" element={<SharedLayout />} >
                        {/* making home page all products page */}
                        <Route path="/" element={<Navigate to="/all" />} />
                        {
                          data.categories.map((category) => {
                            return (
                              <React.Fragment key={category.name}>
                                <Route key={category.name} path={`${category.name}`} element={<PLP category={category.name} currency={currency} />} >
                                </Route>
                                <Route path={`:categoryName/:productId`}
                                  element={<PDP
                                    predictedProduct={predictedProduct}
                                    categories={data.categories}
                                    currency={currency}
                                    settingNewPredictedProduct={settingNewPredictedProduct} />} />
                              </React.Fragment>
                            )
                          })
                        }
                        <Route path="/shoppingcart" element={<ShoppingCart />} />
                        <Route path="/*" element={<h1 style={{ fontSize: "200px", marginTop: "200px" }}>404 Error</h1>} />
                      </Route>
                    </Routes>
                  )
                }
              }
            </Query>
          )
        }}
      </AppConsumer>
    )
  }
}


export default CustomRoutes