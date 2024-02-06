import { Router } from "express";
import LoginController from "./login/login.controller";
//import UsuarioController from "./usuario/usuario.controller";


class BaseRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.use(new LoginController().router);
        //this.router.use(new RegistroController().router);
        //this.router.use(new UsuarioController().router);
    }
}

export default BaseRouter;