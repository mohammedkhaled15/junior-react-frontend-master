//libraries components
import { Component } from "react";
import { BrowserRouter, json } from "react-router-dom";
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
    predictedProduct: {},
    shoopingCart: [],
  };

  componentDidUpdate() {
    // console.log(this.state.predictedProduct);
    console.log(this.state.shoopingCart);
    // console.log(
    //   json.toString(this.state.shoopingCart[0]) ===
    //     json.toString(this.state.shoopingCart[1])
    // );
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
    let newObj = new Object();
    newObj.id = productId;
    newObj.count = 1;
    this.setState({ predictedProduct: newObj });
  };

  addAttrToProduct = (attrName, value) => {
    let newObj = this.state.predictedProduct;
    newObj[`${attrName}`] = value;
    let newObjSorted = Object.keys(newObj)
      .sort()
      .reduce((acc, key) => ({ ...acc, [key]: newObj[key] }), {});
    this.setState({ ...this.state, predictedProduct: newObjSorted });
  };

  addToCart = (predictedProduct) => {
    let newObj = [...this.state.shoopingCart];
    let productExist = { index: 0, flag: false };
    // newObj.map((product, index) => {
    //   console.log("true");
    //   if (product.id === predictedProduct.id) {
    //     productExist = Object.keys(product)
    //       .filter((key) => key !== "id" && key !== "count")
    //       .map((attr) => {
    //         if (!product[attr] === predictedProduct[attr]) {
    //           productExist.flag = false;
    //         }
    //       });
    //   } else {
    //     productExist.index = false;
    //   }
    // });

    if (!productExist.flag) {
      newObj.push(this.state.predictedProduct);
    } else {
      newObj[productExist.index].count++;
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
