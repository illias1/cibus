import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { augmentedTheme, CustomTheme } from "./utils/customCreateTheme";
import WithSnackbar from "./components/withSnackbar";
const MenuScreen = lazy(() => import("./pages/Menu/components/MenuScreen.tsx/MenuScreen"));
const HomePage = lazy(() => import("./pages/Home"));
const CartPage = lazy(() => import("./pages/Cart"));

const Loader: React.FC = ({ ...props }) => {
  return (
    <div className="container">
      <div className="yellow"></div>
      <div className="red"></div>
      <div className="blue"></div>
      <div className="violet"></div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider<CustomTheme> theme={augmentedTheme}>
      <BrowserRouter>
        <WithSnackbar>
          <CssBaseline />
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/:restaurantNameUrl/:tableName" component={MenuScreen} />
              <Route path="/:restaurantNameUrl/:tableName/cart" component={CartPage} />
              <Route exact path="/" component={HomePage} />
            </Switch>
          </Suspense>
        </WithSnackbar>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
