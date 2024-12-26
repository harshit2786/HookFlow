import { Comp } from "./models/helper";
import CreateZap from "./pages/Create";
import Home from "./pages/Home";
import SignIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import ZapList from "./pages/ZapList";


export function getComponent(name: Comp ) {

    const Components = { Home, SignIn, SignUp , CreateZap , ZapList };

    return Components[name];
}