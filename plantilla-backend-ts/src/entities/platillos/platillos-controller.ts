import LoginRequest, { ILoginRequest } from "./login-request.model";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import IController from "@common/interfaces/controller.interface";
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import PlatilloResponse from "./platillos-response.model";

@ApiPath({
    name: 'Login',
    path: '/login'
})
class PlatilloController implements IController {
    public path: string = "platillos";
    public router: Router = Router();

    constructor() {
        
        this.inicializarRoutes();
    }
    
    public inicializarRoutes(): void {
        this.router.post(`/${this.path}/`, this.create);
    }
    @ApiOperationPost({
        path: '/',
        parameters: {
            body: {
                model: 'PlatilloRequest'
            }
        },
        responses: {
            '200': {
                model: 'PlatilloResponse',
                description: 'Retorna los platillos propuestos por la clientela.'
            }
        }
    })
    
    /**
     * @description controla la petición con request trayendo los datos y con response comparándolos
     */
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const body: IPlatilloRequest = req.body;
            
            const loginRequest: PlatilloRequest = new LoginRequest(body);
            const loginResponse: PlatilloResponse = await loginRequest.comprobarCredenciales();

            if ( !loginResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('No se pudo agregar el platillo.');
                return;
            }

            res.status(StatusCodes.OK).json(loginResponse);
        } catch (error) {
            next(error);
        }
    }
}