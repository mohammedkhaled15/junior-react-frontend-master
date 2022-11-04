import { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./routes/CustomRoutes";
import { CurrencyProvider } from "./components/context/currencyContext";

export class App extends Component {
  state = {
    currency: "USD",
    currencySymbol: "$",
  };

  changeCurrency = (currency, symbol) => {
    const newState = { ...this.state };
    newState.currency = currency;
    newState.currencySymbol = symbol;
    this.setState(newState);
  };
  render() {
    return (
      <BrowserRouter>
        <CurrencyProvider
          value={{
            changeCurrency: this.changeCurrency,
            currency: this.state.currency,
            currencySymbol: this.state.currencySymbol,
          }}
        >
          <CustomRoutes />
        </CurrencyProvider>
      </BrowserRouter>
    );
  }
}

export default App;
