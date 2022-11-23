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
  componentDidMount() {
    if (window.sessionStorage.getItem("myAppState")) {
      this.setState(JSON.parse(window.sessionStorage.getItem("myAppState")));
    }
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
    window.sessionStorage.setItem("myAppState", JSON.stringify(this.state));
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
    if (newShoppingCart[index].count === 0) {
      let filteredNewShoppingCart = newShoppingCart.filter(
        (product) => product.count !== 0
      );
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
    newObj.gallery = product.gallery;
    newObj.showRightArrow = true;
    newObj.showLeftArrow = false;
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
    let copyOfshoppingCart = [...this.state.shoppingCart];
    if (this.state.shoppingCart.length === 0) {
      this.setState({ productExistBol: false, productExistIndex: -1 });
    } else {
      for (let i = 0; i < copyOfshoppingCart.length; i++) {
        if (
          Object.keys(copyOfshoppingCart[i])
            .filter(
              (key) =>
                key !== "count" &&
                key !== "attrs" &&
                key !== "price" &&
                key !== "prices" &&
                key !== "gallery"
            )
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

  nextImg = (item) => {
    let newShoppingCart = [...this.state.shoppingCart];
    let indexOfItem = newShoppingCart.indexOf(item);
    let imgIndex = newShoppingCart[indexOfItem].gallery.indexOf(
      newShoppingCart[indexOfItem].thumbnail
    );
    if (imgIndex < newShoppingCart[indexOfItem].gallery.length - 1) {
      newShoppingCart[indexOfItem].thumbnail =
        newShoppingCart[indexOfItem].gallery[imgIndex + 1];
    }
    imgIndex = newShoppingCart[indexOfItem].gallery.indexOf(
      newShoppingCart[indexOfItem].thumbnail
    );
    if (imgIndex === newShoppingCart[indexOfItem].gallery.length - 1) {
      newShoppingCart[indexOfItem].showRightArrow = false;
    }
    newShoppingCart[indexOfItem].showLeftArrow = true;
    this.setState({ shoppingCart: newShoppingCart });
  };

  prevImg = (item) => {
    let newShoppingCart = [...this.state.shoppingCart];
    let indexOfItem = newShoppingCart.indexOf(item);
    let imgIndex = newShoppingCart[indexOfItem].gallery.indexOf(
      newShoppingCart[indexOfItem].thumbnail
    );
    if (imgIndex > 0) {
      newShoppingCart[indexOfItem].thumbnail =
        newShoppingCart[indexOfItem].gallery[imgIndex - 1];
    }
    imgIndex = newShoppingCart[indexOfItem].gallery.indexOf(
      newShoppingCart[indexOfItem].thumbnail
    );
    if (imgIndex === 0) {
      newShoppingCart[indexOfItem].showLeftArrow = false;
    }
    newShoppingCart[indexOfItem].showRightArrow = true;
    this.setState({ shoppingCart: newShoppingCart });
  };

  handleOrdering = () => {
    window.sessionStorage.clear();
    this.setState({ shoppingCart: [], totalPrice: 0, totallProducts: 0 });
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
            showRightArrow: this.state.showRightArrow,
            showLeftArrow: this.state.showLeftArrow,
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
            nextImg: this.nextImg,
            prevImg: this.prevImg,
            handleOrdering: this.handleOrdering,
          }}
        >
          <CustomRoutes />
        </AppProvider>
      </BrowserRouter>
    );
  }
}

export default App;
