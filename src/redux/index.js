import { createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import reduxThunk from "redux-thunk";
import FeedbacksReducer from "./modules/FeedbacksReducer";


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const rootReducer = combineReducers({
  FeedbacksReducer: FeedbacksReducer,
  form: formReducer
});

const configureStore = initialState =>
  createStoreWithMiddleware(rootReducer, initialState);
export default configureStore;
