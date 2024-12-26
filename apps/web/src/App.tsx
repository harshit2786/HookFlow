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
  const renderRoutes = (route: RouteInterface): JSX.Element => {
    return (
      <Route
        element={React.createElement(getComponent(route.element))}
        path={route.path}
      >
        {route.nestedRoutes && route.nestedRoutes.map((a) => renderRoutes(a))}
      </Route>
    );
  };
  const renderAllRoutes = (routes : RouteInterface[]) : JSX.Element => {
    return (
      <Routes>
        {routes.map((a) => renderRoutes(a))}
      </Routes>
    )
  }
  return (
    <div className="dark" >
      <BrowserRouter>
      {renderAllRoutes(rts as RouteInterface[])}
    </BrowserRouter>
    </div>
    
  );
}

export default App;
