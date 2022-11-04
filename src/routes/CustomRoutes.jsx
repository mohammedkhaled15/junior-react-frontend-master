import { Component } from "react";
import { Route, Routes } from "react-router-dom"
import PLP from "../components/PLP";
import SharedLayout from "../components/SharedLayout";
import { CurrencyConsumer } from "../components/context/currencyContext";

export class CustomRoutes extends Component {

    render() {
        return (
            <CurrencyConsumer>
                {({ currency, ...rest }) => {
                    return (
                        <Routes>
                            <Route path="/" element={<SharedLayout />} >
                                <Route index element={<PLP category={"all"} currency={currency} />} />
                                <Route path="/clothes" element={<PLP category={"clothes"} currency={currency} />} />
                                <Route path="/tech" element={<PLP category={"tech"} currency={currency} />} />
                                <Route path="/*" element={<h1>404 Error</h1>} />
                            </Route>
                        </Routes>
                    )
                }}
            </CurrencyConsumer>
        )
    }
}


export default CustomRoutes