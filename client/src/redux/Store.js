import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
//detalle
import thunk from "redux-thunk";
import productsReducer from "./reducers/getProductsR";
import animalsReducer from "./reducers/getAnimalsR";
import paginadoReducer from "./reducers/paginadoR";
import animalDetailsReducer from "./reducers/animalDetailsReducer.js";
import productDetailsReducer from "./reducers/productDetailsReducer.js";
import shoppingCartReducer from "./reducers/shoppingCartR";
import inqueriesReducer from "./reducers/inqueriesReducer";
import petitionReducer from "./reducers/petitionsR";
import getShoppingCartReducer from "./reducers/shoppingCartViewR";
import authReducer from "./reducers/authR";
import usersReducer from "./reducers/getAllUsersR";

export const store = createStore(
  combineReducers({
    products: productsReducer,
    animals: animalsReducer,
    currentPage: paginadoReducer,
    ProductDetails: productDetailsReducer,
    AnimalDetails: animalDetailsReducer,
    shoppingCart: shoppingCartReducer,
    inqueries: inqueriesReducer,
    petitions: petitionReducer,
    getShoppingCart: getShoppingCartReducer,
    auth: authReducer,
    users: usersReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
