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
  constructor(props) {
    super(props);
    this.state = {
      currency: "USD",
      currencySymbol: "$",
      currencyModal: false,
      predictedProduct: {},
      shoopingCart: [],
      totallProducts: 0,
      productExistBol: false,
      productExistIndex: -1,
    };
  }

  componentDidUpdate(prevState, prevProps) {
    // console.log(this.state.predictedProduct);
    // console.log(this.state.shoopingCart);
    // console.log(this.state.productExistBol, this.state.productExistIndex);
    // this.calcTotallProducts();
    // if (
    //   json.toString([...prevState.shoopingCart]) !==
    //   json.toString([...this.state.shoopingCart])
    // ) {
    //   console.log("changed");
    // }
    // if (
    //   json.toString([...prevState.shoopingCart]) !==
    //   json.toString(this.state.shoopingCart)
    // ) {
    //   console.log("changed");
    // }
    // console.log(prevState, prevProps);
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
    newObj.count = 1;
    this.setState({ predictedProduct: newObj }, () =>
      this.checkProductExistance()
    );
  };

  checkProductExistance = () => {
    let copyOfShoopingCart = [...this.state.shoopingCart];
    for (let i = 0; i < copyOfShoopingCart.length; i++) {
      if (
        Object.keys(copyOfShoopingCart[i])
          .filter((key) => key !== "count")
          .every(
            (attr) =>
              copyOfShoopingCart[i][attr] === this.state.predictedProduct[attr]
          )
      ) {
        this.setState({ productExistBol: true, productExistIndex: i });
        break;
      } else {
        this.setState({ productExistBol: false, productExistIndex: -1 });
      }
    }
  };

  addToCart = () => {
    if (this.state.productExistBol) {
      let copyOfShoopingCart = [...this.state.shoopingCart];
      copyOfShoopingCart[this.state.productExistIndex].count++;
      this.setState({ shoopingCart: copyOfShoopingCart }, () =>
        this.calcTotallProducts()
      );
    } else {
      let copyOfShoopingCart = [...this.state.shoopingCart];
      copyOfShoopingCart.push(this.state.predictedProduct);
      this.setState({ shoopingCart: copyOfShoopingCart }, () =>
        this.calcTotallProducts()
      );
      this.setState({
        productExistBol: true,
        productExistIndex: copyOfShoopingCart.length - 1,
      });
    }
  };

  calcTotallProducts = () => {
    console.log(this.state.shoopingCart);
    let totallProducts = this.state.shoopingCart.reduce(
      (acc, { count }) => acc + count,
      0
    );
    this.setState({ totallProducts: totallProducts });
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
            shoopingCart: this.state.shoopingCart,
            totallProducts: this.state.totallProducts,
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
