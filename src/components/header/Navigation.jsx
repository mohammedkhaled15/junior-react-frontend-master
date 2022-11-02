import React, { Component } from 'react'
import { Query } from '@apollo/client/react/components';
import { GET_CATEGORY_NAME } from "../../gql/Query"
import { NavLink } from 'react-router-dom';


export class Navigation extends Component {
    render() {
        return (
            <Query query={GET_CATEGORY_NAME}>{
                ({ loading, error, data }) => {
                    if (error) return <h1>Error...</h1>;
                    if (loading || !data) return <h1>Loading...</h1>;
                    return <div className='navigation'>{data.categories.map((category, index) => {
                        return (
                            <NavLink key={index} to={`${category.name === "all" ? "/" : category.name.toLocaleLowerCase()}`} className={({ isActive }) => isActive ? "active link" : "link"}>
                                <h2 >{category.name}</h2>
                            </NavLink>
                        )
                    })}</div>
                }
            }</ Query>
        )
    }
}

export default Navigation

// function UseQuery(props) {
//     return props.children(useQuery(props.key, props.fn, props.options))
// }