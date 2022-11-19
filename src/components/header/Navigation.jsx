//libraries
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
//queries
import { GET_CATEGORY_NAME } from "../../gql/Query"

export class Navigation extends Component {
  render() {
    return (
      <Query query={GET_CATEGORY_NAME}>
        {
          ({ loading, error, data }) => {
            if (error) return <h1>Error...</h1>;
            if (loading || !data) return <div className="lds-dual-ring"></div>;
            return <div className='navigation'>{data.categories.map((category) => {
              return (
                <NavLink key={category.name} to={`${category.name.toLocaleLowerCase()}`} className={({ isActive }) => isActive ? "active link" : "link"}>
                  <h2 >{category.name}</h2>
                </NavLink>
              )
            })}</div>
          }
        }
      </ Query>
    )
  }
}

export default Navigation