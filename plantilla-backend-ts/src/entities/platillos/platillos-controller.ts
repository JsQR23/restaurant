import PlatilloRequest from "./platillos-request.model";
import { IPlatilloRequest } from "./platillos-request.model";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import IController from "@common/interfaces/controller.interface";
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import PlatilloResponse from "./platillos-response.model";
import PlatilloDao from "./platillo.dao";

@ApiPath({
    name: 'Platillos',
    path: '/platillos'
})
class PlatilloController implements IController {
    public path: string = "platillos";
    public pathGet: string = "platillos/get";
    public router: Router = Router();

    constructor() {
        
        this.inicializarRoutes();
    }
    
    public inicializarRoutes(): void {
        this.router.post(`/${this.path}/`, this.create);
        this.router.get(`/${this.pathGet}/`, this.read);
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
            
            const platilloRequest: PlatilloRequest = new PlatilloRequest(body);
            const platilloResponse: PlatilloResponse = await platilloRequest.registrarPlatillo();

            if ( !platilloResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('No se pudo agregar el platillo.');
                return;
            }

            res.status(StatusCodes.OK).json(platilloResponse);
        } catch (error) {
            next(error);
        }
    }
    /**
     * @description Manda los datos desde una requets hasta el dao para ver todos los usuarios
     */
    public async read(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body: IPlatilloRequest = req.body;

            const platilloRequest: PlatilloRequest = new PlatilloRequest(body);

            const platilloResponse: PlatilloResponse = await platilloRequest.obtenerPlatillos();
            console.log("platillo response: ",platilloResponse)
            if ( !platilloResponse ) {
                res.status(StatusCodes.BAD_REQUEST).json('No se pudieron obtener los platillos.');
                return;
            }

            res.status(StatusCodes.OK).json(platilloResponse);
        } catch (error) {
            next(error);
        }
    }
} export default PlatilloController