//libraries components
import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
//css file
import "./App.css";
//custom components
import CustomRoutes from "./routes/CustomRoutes";
//context
import { AppProvider } from "./components/context/appContext";

export class App extends Component {
  state = {
    currency: "USD",
    currencySymbol: "$",
    currencyModal: false,
    productExist: { index: 0, flag: false },
    predictedProduct: {},
    shoopingCart: [],
  };

  componentDidUpdate() {
    console.log(this.state.productExist.flag);
    console.log(this.state.shoopingCart);
  }

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

  settingNewPredictedProduct = (productId) => {
    let newObj = {};
    newObj.id = productId;
    newObj.count = 1;
    this.setState({ predictedProduct: newObj });
  };

  addAttrToProduct = (attrName, value) => {
    let newObj = { ...this.state.predictedProduct };
    newObj[`${attrName}`] = value;
    // let newObjSorted = Object.keys(newObj)
    //   .sort()
    //   .reduce((acc, key) => ({ ...acc, [key]: newObj[key] }), {});
    this.setState({ predictedProduct: newObj });
    this.checkProductExistance();
  };

  checkProductExistance = () => {
    let newShoppingCart = [...this.state.shoopingCart];
    newShoppingCart.map((product, index) => {
      if (product.id === this.state.predictedProduct.id) {
        let value = Object.keys(product)
          .filter((key) => key !== "id" && key !== "count")
          .every((attr) => product[attr] === this.state.predictedProduct[attr]);
        if (value) {
          return this.setState({ productExist: { index, flag: true } });
        } else {
          this.setState({ productExist: { flag: false } });
        }
      } else {
        this.setState({ productExist: { flag: false } });
      }
    });
  };

  addToCart = () => {
    let newObj = [...this.state.shoopingCart];
    if (!this.state.productExist.flag) {
      newObj.push(this.state.predictedProduct);
      this.setState({ productExist: { index: newObj.length - 1, flag: true } });
    } else {
      newObj[this.state.productExist.index].count++;
    }
    this.setState({ shoopingCart: newObj });
  };

  render() {
    return (
      <BrowserRouter>
        <AppProvider
          value={{
            currency: this.state.currency,
            currencySymbol: this.state.currencySymbol,
            currencyModal: this.state.currencyModal,
            predictedProduct: this.state.predictedProduct,
            changeCurrency: this.changeCurrency,
            showCurrencyModal: this.showCurrencyModal,
            hideCurrencyModal: this.hideCurrencyModal,
            addAttrToProduct: this.addAttrToProduct,
            addToCart: this.addToCart,
            settingNewPredictedProduct: this.settingNewPredictedProduct,
          }}
        >
          <CustomRoutes />
        </AppProvider>
      </BrowserRouter>
    );
  }
}

export default App;
