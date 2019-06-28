import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import AppRoot from "./App/AppRoot";
import { AppContainer } from "react-hot-loader";
import createReduxStore from "./redux";


delete window.__PRELOADED_STATE__;
const store = createReduxStore();
const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}
function render(Component) {
  ReactDOM.hydrate(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById("react-root")
  );
}
render(AppRoot);

if (module.hot) {
  module.hot.accept("./App/AppRoot.js", () => {
    const NewAppRoot = require("./App/AppRoot.js").default;
    render(NewAppRoot);
  });
}
