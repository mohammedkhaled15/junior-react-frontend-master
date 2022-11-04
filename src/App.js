import { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./routes/CustomRoutes";
import { CurrencyProvider } from "./components/context/currencyContext";

export class App extends Component {
  state = {
    currency: "USD",
    currencySymbol: "$",
    currencyModal: false,
  };

  showCurrencyModal = () => {
    this.setState({ currencyModal: !this.state.currencyModal });
  };

  hideCurrencyModal = (e) => {
    this.setState({ currencyModal: false });
    e.stopPropagation();
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
            currency: this.state.currency,
            currencySymbol: this.state.currencySymbol,
            currencyModal: this.state.currencyModal,
            changeCurrency: this.changeCurrency,
            showCurrencyModal: this.showCurrencyModal,
            hideCurrencyModal: this.hideCurrencyModal,
          }}
        >
          <CustomRoutes />
        </CurrencyProvider>
      </BrowserRouter>
    );
  }
}

export default App;
