import UserRequest,{IUserRequest} from "@entities/usuario/users-request.model";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import IUserController from "@common/interfaces/controller.interface";
import IController from "@common/interfaces/controller.interface";
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import UserResponse from "./usuario-response.model";

@ApiPath({
    name: 'User',
    path: '/user'
})
class UserController implements IController {
    public path:string = "read"
    public pathCreate: string = "create";
    public pathDelete: string = "delete";
    public pathOfId: string = "getid";
    public pathUpdate: string = "update";

    public router: Router = Router();

    constructor() {
        this.inicializarRoutes();
    }
    
    public inicializarRoutes(): void {
        this.router.get(`/${this.path}/`, this.read);
        this.router.post(`/${this.pathCreate}/`, this.create);
        this.router.delete(`/${this.pathDelete}/:id/`, this.delete);
        this.router.post(`/${this.pathOfId}/`, this.getId);
        this.router.put(`/${this.pathUpdate}/`, this.update);
    }

    @ApiOperationPost({
        path: '/',
        parameters: {
            body: {
                model: 'UserRequest'
            }
        },
        responses: {
            '200': {
                model: 'UserResponse',
                description: 'Retorna los datos del usuario.'
            }
        }
    })

    /**
     * @description Manda los datos desde una requets hasta el dao para crear nuevos usuarios
     */
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const body: IUserRequest = req.body;

            const userRequest: UserRequest = new UserRequest(body);
            const userResponse: UserResponse = await userRequest.registrarCredenciales();

            if ( !userResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('Usuario no pudo ser registrado.');
                return;
            }

            res.status(StatusCodes.OK).json(userResponse);
        } catch (error) {
            next(error);
        }
    }
    /**
     * @description Manda los datos desde una requets hasta el dao para eliminar usuarios
     */
    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log("req_params:   ",req.params)
            const params: IUserRequest = req.params;
            const elId:number=+req.params.id
            const userRequest: UserRequest = new UserRequest(params);
            const userResponse: UserResponse = await userRequest.eliminarCredenciales(elId);

            if ( !userResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('Usuario no pudo ser eliminado.');
                return;
            }

            res.status(StatusCodes.OK).json(userResponse);
        } catch (error) {
            next(error);
        }
    }
    /**
     * @description Manda los datos desde una requets hasta el dao para ver todos los usuarios
     */
    public async read(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body: IUserRequest = req.body;

            const userRequest: UserRequest = new UserRequest(body);
            const userResponse: UserResponse = await userRequest.obtenerCredenciales();

            if ( !userResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('Usuario no pudo ser eliminado.');
                return;
            }

            res.status(StatusCodes.OK).json(userResponse);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Manda los datos desde una requets hasta el dao para obtener elID de un usuario en particular
     *              esto sirve a la hora de actualizar
     */
    public async getId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body: IUserRequest = req.body;

            const userRequest: UserRequest = new UserRequest(body);
            const userResponse: UserResponse = await userRequest.obtenerId();

            if ( !userResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('El id del usuario no pudo ser encontrado.');
                return;
            }

            res.status(StatusCodes.OK).json(userResponse);
        } catch (error) {
            next(error);
        }
    }
    /**
     * @description Manda los datos desde una requets hasta el dao para actualizar usuarios
     */
    public async update(req: any, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const body: UserRequest = req.body;
            console.log("body de update>>>>>>>>>>>>",body)
            const userRequest: UserRequest = new UserRequest(body);
            const userResponse: UserResponse = await userRequest.actualizarCredenciales();

            if ( !userResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('Usuario no pudo ser actualizado.');
                return;
            }

            res.status(StatusCodes.OK).json(userResponse);
        } catch (error) {
            next(error);
        }
    }

}
export default UserController;