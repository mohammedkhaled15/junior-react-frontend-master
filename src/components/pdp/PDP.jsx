//libraries
import React, { Component } from 'react'
//import withRouter Hoc
import withRouter from '../HOC/withRouter'

class PDP extends Component {
    render() {
        console.log(this.props)
        const id = this.props.params.productId
        return (
            <div className='PDP'>PDP {id}</div>
        )
    }
}

export default withRouter(PDP)
