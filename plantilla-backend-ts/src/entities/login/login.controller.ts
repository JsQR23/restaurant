import LoginRequest, { ILoginRequest } from "./login-request.model";
//import UserRequest,{IUserInterface} from "@entities/usuario/users-request.model";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import IController from "@common/interfaces/controller.interface";
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import LoginResponse from "./login-response.model";

@ApiPath({
    name: 'Login',
    path: '/login'
})
class LoginController implements IController {
    public path: string = "login";


    public router: Router = Router();

    constructor() {
        
        this.inicializarRoutes();
    }
    
    public inicializarRoutes(): void {
        this.router.post(`/${this.path}/`, this.login);
    }

    @ApiOperationPost({
        path: '/',
        parameters: {
            body: {
                model: 'LoginRequest'
            }
        },
        responses: {
            '200': {
                model: 'LoginResponse',
                description: 'Retorna los datos del usuario.'
            }
        }
    })
    
    /**
     * @description controla la petición con request trayendo los datos y con response comparándolos
     */
    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const body: ILoginRequest = req.body;
            
            const loginRequest: LoginRequest = new LoginRequest(body);
            const loginResponse: LoginResponse = await loginRequest.comprobarCredenciales();

            if ( !loginResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('Usuario o contraseña incorrectas.');
                return;
            }

            res.status(StatusCodes.OK).json(loginResponse);
        } catch (error) {
            next(error);
        }
    }

}
export default LoginController;