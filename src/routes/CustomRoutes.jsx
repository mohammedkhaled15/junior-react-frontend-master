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
import { GET_CATEGORY_NAME } from "../gql/Query"

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
                    <Routes>
                      <Route path="/" element={<SharedLayout />} >
                        <>
                          {
                            data.categories.map((category, index) => {
                              return (
                                <Route key={category.name} index={category.name === "all"} path={`${category.name === "all" ? "" : "/" + category.name}`} element={<PLP category={category.name} currency={currency} />} />
                              )
                            })
                          }
                        </>
                        <Route path="/*" element={<h1>404 Error</h1>} />
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