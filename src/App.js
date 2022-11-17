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
    if (
      this.state.currency !== prevState.currency ||
      prevState.totallProducts !== this.state.totallProducts
    ) {
      this.calcTotalPrice();
    }
    if (
      JSON.stringify(this.state.predictedProduct) !==
      JSON.stringify(prevState.predictedProduct)
    ) {
      this.checkProductExistance();
    }
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
    console.log(newShoppingCart);
    if (newShoppingCart[index].count === 0) {
      let filteredNewShoppingCart = newShoppingCart.filter(
        (product) => product.count !== 0
      );
      console.log(filteredNewShoppingCart);
      this.setState({ shoppingCart: filteredNewShoppingCart }, () => {
        this.calcTotallProducts();
        this.checkProductExistance();
      });
    } else {
      this.setState({ shoppingCart: newShoppingCart }, () =>
        this.calcTotallProducts()
      );
    }
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
    newObj.prices = product.prices;
    newObj.price = price;
    newObj.attrs = product.attributes;
    newObj.count = 1;
    newObj.thumbnail = product.gallery[0];
    // setting default values to each product
    product.attributes.map((attr) => {
      return (newObj[attr.name] =
        product.attributes[
          product.attributes.indexOf(attr)
        ].items[0].displayValue);
    });
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
    console.log(this.state.shoppingCart);
    let copyOfshoppingCart = [...this.state.shoppingCart];
    if (this.state.shoppingCart.length === 0) {
      this.setState({ productExistBol: false, productExistIndex: -1 });
    } else {
      for (let i = 0; i < copyOfshoppingCart.length; i++) {
        if (
          Object.keys(copyOfshoppingCart[i])
            .filter((key) => key !== "count")
            .every(
              (attr) =>
                copyOfshoppingCart[i][attr] ===
                this.state.predictedProduct[attr]
            )
        ) {
          this.setState({ productExistBol: true, productExistIndex: i });
          break;
        } else {
          this.setState({ productExistBol: false, productExistIndex: -1 });
        }
      }
    }
  };

  addToCart = () => {
    if (this.state.productExistBol) {
      let copyOfshoppingCart = [...this.state.shoppingCart];
      // console.log(copyOfshoppingCart);
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
      (acc, item) =>
        acc +
        item.prices.filter(
          (price) => price.currency.label === this.state.currency
        )[0].amount *
          item.count,
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
