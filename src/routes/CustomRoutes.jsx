//Libraries
import { Component } from "react";
import { Query } from '@apollo/client/react/components';
import { Route, Routes } from "react-router-dom"
//Components
import PLP from "../components/PLP";
import SharedLayout from "../components/SharedLayout";
//context
import { AppConsumer } from "../components/context/appContext";
//queries
import { GET_CATEGORY_NAME, GET_PRODUCTS_FOR_CATEGORY } from "../gql/Query"
import PDP from "../components/pdp/PDP";
import React from "react";

export class CustomRoutes extends Component {

  render() {
    return (
      <AppConsumer>
        {({ currency, ...rest }) => {
          return (
            <Query query={GET_CATEGORY_NAME}>
              {
                ({ loading, error, data }) => {
                  if (error) return "";
                  if (loading || !data) return "";
                  return (
                    <>
                      <Routes>
                        <Route path="/" element={<SharedLayout />} >
                          {
                            data.categories.map((category) => {
                              return (
                                <React.Fragment key={category.name}>
                                  <Route key={category.name} path={`${category.name}`} element={<PLP category={category.name} currency={currency} />} >
                                  </Route>
                                  {/* <Query query={GET_PRODUCTS_FOR_CATEGORY(category.name)}>
                                    {
                                      ({ loading, error, data }) => {
                                        if (error) return "";
                                        if (loading || !data) return "";
                                        console.log(data)
                                        return ( */}
                                  <Route path={`:categoryName/:productId`} element={<PDP />} />
                                  {/* )
                                      }
                                    }
                                  </Query> */}
                                </React.Fragment>
                              )
                            })
                          }
                          <Route path="/*" element={<h1 style={{ fontSize: "200px", marginTop: "200px" }}>404 Error</h1>} />
                        </Route>
                      </Routes>
                    </>
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