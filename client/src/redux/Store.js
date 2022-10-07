import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import productsReducer from "./reducers/getProductsR";
import animalsReducer from "./reducers/getAnimalsR";
import paginadoReducer from "./reducers/paginadoR";
import animalDetailsReducer from "./reducers/animalDetailsReducer.js";
import productDetailsReducer from "./reducers/productDetailsReducer.js";
import shoppingCartReducer from "./reducers/shoppingCartR";
import getShoppingCartReducer from "./reducers/shoppingCartViewR";

    
    export const store = createStore(
        combineReducers({
            products: productsReducer,
            animals: animalsReducer,
            currentPage: paginadoReducer,
            ProductDetails: productDetailsReducer,
            AnimalDetails: animalDetailsReducer,
            shoppingCart: shoppingCartReducer,
            getShoppingCart: getShoppingCartReducer
        }), 
        composeWithDevTools(applyMiddleware(thunk)));
