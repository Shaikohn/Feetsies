import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import productsReducer from "./reducers/getProductsR";
import animalsReducer from "./reducers/getAnimalsR";
import paginadoReducer from "./reducers/paginadoR";

export const store = createStore(
    combineReducers({
        products: productsReducer,
        animals: animalsReducer,
        currentPage: paginadoReducer
    }), 
    composeWithDevTools(applyMiddleware(thunk)));