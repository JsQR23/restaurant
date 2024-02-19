import ClassValidationException from "@common/exceptions/class-validation.exception";
import { IsOptional, IsString, IsNumber, validate } from "class-validator";
import { ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts"
import PlatilloResponse from "./platillos-response.model";
import Platillo,{IPlatillo} from "./platillo.model";
import PlatilloDao from "./platillo.dao";
import PasswordHashing from "@common/encryption";
import IJwtPayloadPlatillo from "@common/interfaces/jwt-payloadPlt.interface";
import { Jwt } from "@common/jwt";

export interface IPlatilloRequest {
    nombre?:string;
    precio?:number;
    img?:string;
}

class PlatilloRequest implements IPlatilloRequest {
    @IsString()
    @IsOptional()
    @ApiModelProperty({
        description: 'token.',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public nombre?: string;
    
    @IsOptional()
    @ApiModelProperty({
        description: 'Precio del platillo.',
        type: SwaggerDefinitionConstant.NUMBER,
        required: true
    })
    public precio?: number;

    @IsString()
    @IsOptional()
    @ApiModelProperty({
        description: 'Imagen del platillo.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public img?: string;

    constructor(platillo: IPlatillo) {
        Object.assign(this, platillo);
    }

    /**
     * @description Crea un usuario a través del Dao y retorna una instancia de la clase PlatillosResponse con los datos de éste
     * @author: 
     * @returns {Promise<PlatilloResponse|null>}
     */
    public async registrarPlatillo(): Promise<PlatilloResponse | null> {
        /**
         * * Validamos los datos enviados por el usuario
         */
        await this.validarPeticion();

        const platillo: Platillo = await PlatilloDao.RegistrarPlatillo(this.nombre,this.precio,this.img);

        if ( !platillo ) {
            return null;
        }
        const jwtPayloadPlt: any={
            nombre:platillo.nombre,
            precio:+platillo.precio,
            img:platillo.img
        }

        const token: string = await Jwt.generarJwt(jwtPayloadPlt, process.env.JWT_EXPIRATION || '8h', process.env.JWT_SECRET);

        const response = new PlatilloResponse({
            token,
            nombre:platillo.nombre,
            precio:platillo.precio,
            img:platillo.img
        });
        
        return response;
    }

    /**
     * @description Obtiene toda la información de los usuarios y retorna un objeto con sus emails y sus contraseñas
     * @author: 
     * @returns {Promise<UserResponse|Object>}
     */
    public async obtenerPlatillos(): Promise<any | null> {

        const platillo: any = await PlatilloDao.ObtenerPlatillos();
        
        if ( !platillo ) {
            return null;
        }

        const jwtPayloadPlt: any={
            nombre:platillo.nombre,
            precio:+platillo.precio,
            img:platillo.img
        }

        const token: string = await Jwt.generarJwt(jwtPayloadPlt, process.env.JWT_EXPIRATION || '8h', process.env.JWT_SECRET);
        
        const response: IPlatillo[] = [];

        for (const row of platillo) {
            response.push({
                nombre:row.nombre,
                precio:row.precio,
                img:row.img
            });
        }
        return response;
        
    }
    /**
     * @description Valida que los datos de la petición tenga el formato correcto
     */
    private async validarPeticion() {
        const erroresValidacion = await validate(this);
        if ( erroresValidacion.length > 0 ) {
            throw new ClassValidationException(erroresValidacion);
        }
    }
}

export default PlatilloRequest;