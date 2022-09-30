import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import productsReducer from "./reducers/getProductsR";
import animalsReducer from "./reducers/getAnimalsR";
import paginadoReducer from "./reducers/paginadoR";
import animalDetailsReducer from "./reducers/animalDetailsReducer.js";
import productDetailsReducer from "./reducers/productDetailsReducer.js";
    
    export const store = createStore(
        combineReducers({
            products: productsReducer,
            animals: animalsReducer,
            currentPage: paginadoReducer,
            ProductDetails: productDetailsReducer,
            AnimalDetails: animalDetailsReducer
        }), 
        composeWithDevTools(applyMiddleware(thunk)));
