import { Comp } from "./models/helper";
import CreateZap from "./pages/Create";
import Home from "./pages/Home";
import SignIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import SingleZap from "./pages/SingleZap";
import ZapList from "./pages/ZapList";


export function getComponent(name: Comp ) {

    const Components = { Home, SignIn, SignUp , CreateZap , ZapList , SingleZap };

    return Components[name];
}