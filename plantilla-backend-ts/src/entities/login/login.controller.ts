import LoginRequest, { ILoginRequest } from "./login-request.model";
import UserRequest,{IUserInterface} from "@entities/usuario/users-request.model";
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
    public pathCreate: string = "create";
    public pathDelete: string = "delete";
    public pathRead: string = "read";
    public pathOfId: string = "getid";
    public pathUpdate: string = "update";
    public router: Router = Router();

    constructor() {
        
        this.inicializarRoutes();
    }
    
    public inicializarRoutes(): void {
        this.router.post(`/${this.path}/`, this.login);
        this.router.post(`/${this.pathCreate}/`, this.create);
        this.router.delete(`/${this.pathDelete}/:userEmail/:userPassword`, this.delete);
        this.router.get(`/${this.pathRead}/`, this.read);
        this.router.post(`/${this.pathOfId}/`, this.getId);
        this.router.put(`/${this.pathUpdate}/`, this.update);
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
            console.log("user del login: ",req)
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
    /**
     * @description controla la petición con request trayendo los datos y con response comparándolos
     */
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log("user del create: ",req)
            const body: ILoginRequest = req.body;

            const loginRequest: LoginRequest = new LoginRequest(body);
            const loginResponse: LoginResponse = await loginRequest.registrarCredenciales();

            if ( !loginResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('Usuario no pudo ser registrado.');
                return;
            }

            res.status(StatusCodes.OK).json(loginResponse);
        } catch (error) {
            next(error);
        }
    }
    /**
     * @description controla la petición con request trayendo los datos y con response comparándolos
     */
    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log("req_params:   ",req.params)
            const params: ILoginRequest = req.params;
            
            const loginRequest: LoginRequest = new LoginRequest(params);
            const loginResponse: LoginResponse = await loginRequest.eliminarCredenciales(req.params.userEmail);

            if ( !loginResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('Usuario no pudo ser eliminado.');
                return;
            }

            res.status(StatusCodes.OK).json(loginResponse);
        } catch (error) {
            next(error);
        }
    }
    /**
     * @description controla la petición con request trayendo los datos y con response comparándolos
     */
    public async read(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body: ILoginRequest = req.body;

            const loginRequest: LoginRequest = new LoginRequest(body);
            const loginResponse: LoginResponse = await loginRequest.obtenerCredenciales();

            if ( !loginResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('Usuario no pudo ser eliminado.');
                return;
            }

            res.status(StatusCodes.OK).json(loginResponse);
        } catch (error) {
            next(error);
        }
    }



    /**
     * @description controla la petición con request trayendo los datos y con response comparándolos
     */
    public async getId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body: ILoginRequest = req.body;

            const loginRequest: LoginRequest = new LoginRequest(body);
            const loginResponse: LoginResponse = await loginRequest.obtenerId();

            if ( !loginResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('El id del usuario no pudo ser encontrado.');
                return;
            }

            res.status(StatusCodes.OK).json(loginResponse);
        } catch (error) {
            next(error);
        }
    }
    /**
     * @description controla la petición con request trayendo los datos y con response comparándolos
     */
    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body: IUserInterface = req.body;

            const loginRequest: UserRequest = new UserRequest(body);
            const loginResponse: any = await loginRequest.actualizarCredenciales();

            if ( !loginResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('Usuario no pudo ser actualizado.');
                return;
            }

            res.status(StatusCodes.OK).json(loginResponse);
        } catch (error) {
            next(error);
        }
    }
}
export default LoginController;