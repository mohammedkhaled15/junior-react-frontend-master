//libraries
import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
//conntext
import { AppConsumer } from './context/appContext'
//component
import Header from './header/Header'

export class SharedLayout extends Component {
  render() {
    return (
      <AppConsumer>
        {
          (value) => {
            return (
              <div className='main' onClick={value.currencyModal || value.cartModal ? value.hideAnyModal : null}>
                <Header />
                <Outlet />
              </div>
            )
          }
        }
      </AppConsumer>
    )
  }
}

export default SharedLayout