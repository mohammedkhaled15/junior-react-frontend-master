import React, { Component } from 'react'
import downArrow from "../../assets/downArrow.svg"

export class Actions extends Component {
    render() {
        return (
            <div className='navigation__actions'>
                <div className='navigation__actions__currency'>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>$</span>
                    <span>
                        <img src={downArrow} alt="arrow" />
                    </span>
                </div>
            </div>
        )
    }
}

export default Actions