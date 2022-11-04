import React from "react";

const CurrencyContext = React.createContext();

const CurrencyProvider = CurrencyContext.Provider;
const CurrencyConsumer = CurrencyContext.Consumer;

export { CurrencyProvider, CurrencyConsumer };
