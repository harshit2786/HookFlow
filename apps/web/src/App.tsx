import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import rts from "./routes.json";
import { Comp } from "./models/helper";
import "./App.css";
import { getComponent } from "./getComponent";

interface RouteInterface {
  element: Comp;
  path: string;
  nestedRoutes?: RouteInterface[];
}

function App() {
  const renderRoutes = (routes: RouteInterface[]) => {
    return (
      <Routes>
        {routes.map((route, index) =>
          route.nestedRoutes ? (
            <Route
              key={index}
              element={React.createElement(getComponent(route.element))}
              path={route.path}
            >
              {renderRoutes(route.nestedRoutes)}
            </Route>
          ) : (
            <Route
              key={index}
              element={React.createElement(getComponent(route.element))}
              path={route.path}
            />
          )
        )}
      </Routes>
    );
  };

  return <BrowserRouter>{renderRoutes(rts as RouteInterface[])}</BrowserRouter>;
}

export default App;
