import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import { createBrowserHistory } from "history";
import { createEpicMiddleware } from "redux-observable";
import "rxjs";
import rootReducer from "reducers/rootReducer";
import rootEpic from "./epics/rootEpic";
import apis from "./apis/index";

export const history = createBrowserHistory();

// const initialState = {
//   sidebarShow: "responsive",
// };

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case "set":
//       return { ...state, ...rest };
//     default:
//       return state;
//   }
// };

const epicMiddleware = createEpicMiddleware({
  dependencies: { ...apis },
});

// const enhancers = [];
const middleware = [routerMiddleware(history), epicMiddleware];

// const composedEnhancers = compose(
//     applyMiddleware(...middleware),
//     ...enhancers,
// );
const store = createStore(
  rootReducer,
  // initialState,
  applyMiddleware(...middleware)
);
epicMiddleware.run(rootEpic);
// const store = createStore(
//     rootReducer,
//     initialState,
//     composedEnhancers,
// );

export default store;
