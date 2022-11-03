import { Component } from "react";
import { Route, Routes } from "react-router-dom"
import PLP from "../components/PLP";
import SharedLayout from "../components/SharedLayout";

export class CustomRoutes extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<SharedLayout />} >
                    <Route index element={<PLP category={"all"} currency={"USD"} />} />
                    <Route path="/clothes" element={<PLP category={"clothes"} currency={"USD"} />} />
                    <Route path="/tech" element={<PLP category={"tech"} currency={"USD"} />} />
                    <Route path="/*" element={<h1>404 Error</h1>} />
                </Route>
            </Routes>
        )
    }
}


export default CustomRoutes