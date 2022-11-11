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
      // productExist: { index: 0, flag: false },
      predictedProduct: {},
      shoopingCart: [],
      productExistBol: false,
      ptoductExistIndex: 0,
    };
  }

  componentDidUpdate() {
    // console.log(this.state.productExist.flag);
    // console.log(this.state.shoopingCart);
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
    this.setState({ ...this.state, predictedProduct: newObj });
    // this.checkProductExistance();
  };

  checkProductExistance = () => {
    let copyOfShoopingCart = [...this.state.shoopingCart];
    copyOfShoopingCart.filter((product, index) => {
      return Object.keys(product)
        .filter((key) => key !== "id" && key !== "count")
        .every((attr) => product[attr] === this.state.predictedProduct[attr]);
    });
    // let newShoppingCart = [...this.state.shoopingCart];
    // newShoppingCart.map((product, index) => {
    //   if (product.id === this.state.predictedProduct.id) {
    //     let value = Object.keys(product)
    //       .filter((key) => key !== "id" && key !== "count")
    //       .every((attr) => product[attr] === this.state.predictedProduct[attr]);
    //     if (value) {
    //       let obj = { ...this.state };
    //       obj.productExistBol = true;
    //       obj.ptoductExistIndex = index;
    //       return this.setState(obj);
    //     } else {
    //       let obj = { ...this.state };
    //       obj.productExistBol = false;
    //       obj.ptoductExistIndex = index;
    //       this.setState(obj);
    //     }
    //   } else {
    //     let obj = { ...this.state };
    //     obj.productExistBol = false;
    //     obj.ptoductExistIndex = index;
    //     this.setState(obj);
    //   }
    // });
  };

  addToCart = () => {
    // console.log(this.state.predictedProduct);
    // let newObj = [...this.state.shoopingCart];
    // if (!this.state.productExistBol) {
    //   newObj.push(this.state.predictedProduct);
    //   // console.log(this.state.predictedProduct);
    //   // console.log(newObj);
    //   let count = this.state.count;
    //   this.setState(
    //     { ...this.state, shoopingCart: [...newObj], count: count++ },
    //     console.log(this.state)
    //   );
    //   // this.setState({ productExist: { index: newObj.length - 1, flag: true } });
    //   let obj = { ...this.state };
    //   obj.productExistBol = true;
    //   obj.ptoductExistIndex = newObj.length - 1;
    //   this.setState(obj);
    // } else {
    //   let productToModifyCount = {
    //     ...this.state.shoopingCart[this.state.ptoductExistIndex],
    //   };
    //   productToModifyCount.count++;
    //   // newObj[this.state.productExistIndex].count++;
    //   this.setState({
    //     ...this.state,
    //     shoopingCart: [...this.state.shoopingCart, productToModifyCount],
    //   });
    // }
    let copyOfShoopingCart = [...this.state.shoopingCart];
    copyOfShoopingCart.push(this.state.predictedProduct);
    this.setState({ shoopingCart: copyOfShoopingCart });
    console.log(this.state.productExistBol, this.state.ptoductExistIndex);
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
