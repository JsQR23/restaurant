import { Router } from "express";
import LoginController from "./login/login.controller";
import UserController from "./usuario/usuario.controller";
import PlatilloController from "./platillos/platillos-controller";


class BaseRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.use(new LoginController().router);
        //this.router.use(new RegistroController().router);
        this.router.use(new UserController().router);
        this.router.use(new PlatilloController().router)
    }
}

export default BaseRouter;