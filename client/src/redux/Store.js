import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import animalDetailsReducer from "./reducers/animalDetailsReducer.js";
import productDetailsReducer from "./reducers/productDetailsReducer.js";

export const store = createStore(combineReducers({getProductDetails: productDetailsReducer, 
    getAnimalDetails: animalDetailsReducer}), composeWithDevTools(applyMiddleware(thunk)));