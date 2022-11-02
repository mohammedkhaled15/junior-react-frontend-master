import { Component } from "react";
import { Route, Routes } from "react-router-dom"
import SharedLayout from "../components/SharedLayout";

export class CustomRoutes extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<SharedLayout />} >
                    <Route index element={<h1>All Products</h1>} />
                    <Route path="/clothes" element={<h2>Clothes</h2>} />
                    <Route path="/tech" element={<h2>Tech</h2>} />
                    <Route path="/*" element={<h1>404 Error</h1>} />
                </Route>
            </Routes>
        )
    }
}


export default CustomRoutes