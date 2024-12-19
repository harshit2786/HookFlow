import { Comp } from "./models/helper";
import Home from "./pages/Home";
import SignIn from "./pages/Login";
import SignUp from "./pages/SignUp";


export function getComponent(name: Comp ) {

    const Components = { Home, SignIn, SignUp };

    return Components[name];
}