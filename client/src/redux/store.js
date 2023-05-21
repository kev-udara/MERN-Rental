import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { carsReducer } from './reducers/carsReducer';
import { alertsReducer } from './reducers/alertsReducer';
import { bookingsReducer } from './reducers/bookingsReducer';
import { accessoriesReducer } from './reducers/accessoriesReducer';
import { usersReducer } from './reducers/usersReducer';
import { reportsReducer } from './reducers/reportsReducer';
import { requestsReducer } from './reducers/requestsReducer';
const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
carsReducer,
alertsReducer,
bookingsReducer,
accessoriesReducer,
usersReducer,
reportsReducer,
requestsReducer
})

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store