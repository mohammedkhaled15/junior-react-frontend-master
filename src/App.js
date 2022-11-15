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
      shoppingCart: [],
      totallProducts: 0,
      productExistBol: false,
      productExistIndex: -1,
      cartModal: false,
      totalPrice: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.totallProducts !== this.state.totallProducts) {
      this.calcTotalPrice();
    }
    // console.log(prevState);
  }

  handleCounterIncreament = (item) => {
    let newShoppingCart = [...this.state.shoppingCart];
    const index = newShoppingCart.indexOf(item);
    newShoppingCart[index] = { ...newShoppingCart[index] };
    newShoppingCart[index].count++;
    this.setState({ shoppingCart: newShoppingCart }, () =>
      this.calcTotallProducts()
    );
  };
  handleCounterDecreament = (item) => {
    let newShoppingCart = [...this.state.shoppingCart];
    const index = newShoppingCart.indexOf(item);
    newShoppingCart[index] = { ...newShoppingCart[index] };
    newShoppingCart[index].count--;
    this.setState({ shoppingCart: newShoppingCart }, () =>
      this.calcTotallProducts()
    );
  };

  showCartModal = () => {
    this.setState({ cartModal: true });
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
    newObj.attrs = product.attributes;
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
    let copyOfshoppingCart = [...this.state.shoppingCart];
    for (let i = 0; i < copyOfshoppingCart.length; i++) {
      if (
        Object.keys(copyOfshoppingCart[i])
          .filter((key) => key !== "count")
          .every(
            (attr) =>
              copyOfshoppingCart[i][attr] === this.state.predictedProduct[attr]
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
      let copyOfshoppingCart = [...this.state.shoppingCart];
      copyOfshoppingCart[this.state.productExistIndex].count++;
      this.setState({ shoppingCart: copyOfshoppingCart }, () =>
        this.calcTotallProducts()
      );
    } else {
      let copyOfShoppingCart = [...this.state.shoppingCart];
      copyOfShoppingCart.push(this.state.predictedProduct);
      this.setState({ shoppingCart: copyOfShoppingCart }, () =>
        this.calcTotallProducts()
      );
      this.setState({
        productExistBol: true,
        productExistIndex: copyOfShoppingCart.length - 1,
      });
    }
  };

  calcTotallProducts = () => {
    let totallProducts = this.state.shoppingCart.reduce(
      (acc, { count }) => acc + count,
      0
    );
    this.setState({ totallProducts: totallProducts });
  };

  calcTotalPrice = () => {
    let newState = { ...this.state };
    newState.totalPrice = this.state.shoppingCart.reduce(
      (acc, item) => acc + item.price.amount * item.count,
      0
    );
    this.setState(newState);
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
            shoppingCart: this.state.shoppingCart,
            totallProducts: this.state.totallProducts,
            cartModal: this.state.cartModal,
            totalPrice: this.state.totalPrice,
            showCartModal: this.showCartModal,
            changeCurrency: this.changeCurrency,
            showCurrencyModal: this.showCurrencyModal,
            hideAnyModal: this.hideAnyModal,
            addAttrToProduct: this.addAttrToProduct,
            addToCart: this.addToCart,
            settingNewPredictedProduct: this.settingNewPredictedProduct,
            handleCounterIncreament: this.handleCounterIncreament,
            handleCounterDecreament: this.handleCounterDecreament,
            calcTotalPrice: this.calcTotalPrice,
          }}
        >
          <CustomRoutes />
        </AppProvider>
      </BrowserRouter>
    );
  }
}

export default App;
