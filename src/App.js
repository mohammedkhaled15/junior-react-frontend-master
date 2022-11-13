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
      cartModal: false,
    };
  }

  showCartModal = () => {
    this.setState({ cartModal: !this.state.cartModal });
    console.log("clicked");
  };

  showCurrencyModal = () => {
    this.setState({ currencyModal: !this.state.currencyModal });
  };

  hideAnyModal = (e) => {
    this.setState({ currencyModal: false, cartModal: false });
    e.stopPropagation();
  };
  changeCurrency = (currency, symbol) => {
    const newState = { ...this.state };
    newState.currency = currency;
    newState.currencySymbol = symbol;
    this.setState(newState);
  };

  settingNewPredictedProduct = (product, price) => {
    let newObj = {};
    newObj.id = product.id;
    newObj.name = product.name;
    newObj.brand = product.brand;
    newObj.price = price;
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
            cartModal: this.state.cartModal,
            showCartModal: this.showCartModal,
            changeCurrency: this.changeCurrency,
            showCurrencyModal: this.showCurrencyModal,
            hideAnyModal: this.hideAnyModal,
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
