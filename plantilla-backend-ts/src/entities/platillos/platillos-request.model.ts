import ClassValidationException from "@common/exceptions/class-validation.exception";
import { IsOptional, IsString, IsNumber, validate } from "class-validator";
import { ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts"
import PlatilloResponse from "./platillos-response.model";
import Platillo,{IPlatillo} from "./platillo.model";
import PlatilloDao from "./platillo.dao";
import PasswordHashing from "@common/encryption";
import IJwtPayload from "@common/interfaces/jwt-payload.interface";
import { Jwt } from "@common/jwt";

export interface IPlatilloRequest {
    nombre?:string;
    precio?:Number;
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
    @IsNumber()
    @ApiModelProperty({
        description: 'Precio del platillo.',
        type: SwaggerDefinitionConstant.NUMBER,
        required: true
    })
    public precio?: Number;

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
     * @description Crea un usuario a través del Dao y retorna una instancia de la clase LoginResponse con los datos de éste
     * @author: 
     * @returns {Promise<PlatilloResponse|null>}
     */
    /**
     * 
     * @returns 
     */
    public async registrarCredenciales(): Promise<PlatilloResponse | null> {
        /**
         * * Validamos los datos enviados por el usuario
         */
        await this.validarPeticion();

        const usuario: Platillo = await PlatilloDao.RegistrarPlatillo();

        if ( !usuario ) {
            return null;
        }

        const jwtPayload: IJwtPayload = {
            email: usuario.email,
            password:usuario.password
        };

        const token: string = await Jwt.generarJwt(jwtPayload, process.env.JWT_EXPIRATION || '8h', process.env.JWT_SECRET);

        const response = new LoginResponse({
            token,
            email:usuario.email,
            password:usuario.password,
        });
        
        /**
         * * Actualizar la fecha de ultimo acceso al sistema
         */
       // await UsuarioDao.actualizarUltimoAcceso(usuario.idPersonal);

        //await Privilegios.guardarPrivilegiosRedis(usuario.idPersonal.toString(), JSON.stringify(usuario.privilegios));

        return response;
    }





    /**
     * @description Elimina un usuario a través de su email, regresa un token y los datos del usuario
     * @author: 
     * @returns {Promise<LoginResponse|null>}
     */
    /**
     * 
     * @returns 
     */
    public async eliminarCredenciales(email:string): Promise<LoginResponse | null> {
        /**
         * * Validamos los datos enviados por el usuario
         */
        await this.validarPeticion();
        console.log("el email en el request",email)
        const usuario: Usuario = await UsuarioDao.EliminarUsuario(email);

        if ( !usuario ) {
            return null;
        }

        /**
         * * Validar la contraseña que ingresó el usuario

        const passwordValida = await PasswordHashing.validatePassword(this.password, usuario.password);

        if ( !passwordValida ) {
            return null;
        }
         */
        const jwtPayload: IJwtPayload = {
            email: usuario.email,
            password:usuario.password
        };

        const token: string = await Jwt.generarJwt(jwtPayload, process.env.JWT_EXPIRATION || '8h', process.env.JWT_SECRET);

        const response = new LoginResponse({
            token,
            email:usuario.email,
            password:usuario.password,
        });
        
        /**
         * * Actualizar la fecha de ultimo acceso al sistema
         */
       // await UsuarioDao.actualizarUltimoAcceso(usuario.idPersonal);

        //await Privilegios.guardarPrivilegiosRedis(usuario.idPersonal.toString(), JSON.stringify(usuario.privilegios));

        return response;
    }




    /**
     * @description Obtiene toda la información de los usuarios y retorna un objeto con sus emails y sus contraseñas
     * @author: 
     * @returns {Promise<LoginResponse|Object>}
     */
    /**
     * 
     * @returns 
     */
    public async obtenerCredenciales(): Promise<any | null> {

        const usuario: any = await UsuarioDao.ObtenerUsuarios();
        console.log("REQUEST:::::::::::::::: ",usuario)
        if ( !usuario ) {
            return null;
        }
        const jwtPayload: IJwtPayload = {
            email: usuario.email,
            password:usuario.password
        };

        const token: string = await Jwt.generarJwt(jwtPayload, process.env.JWT_EXPIRATION || '8h', process.env.JWT_SECRET);
        
        const response: IUsuario[] = [];

        for (const row of usuario) {
            response.push({
                email: row.email,
                password: row.password
            });
        }
        
        response.push({token:token})
        
        /**
         * * Actualizar la fecha de ultimo acceso al sistema
         */
       // await UsuarioDao.actualizarUltimoAcceso(usuario.idPersonal);

        //await Privilegios.guardarPrivilegiosRedis(usuario.idPersonal.toString(), JSON.stringify(usuario.privilegios));
        return response;
    }



    /**
     * @description Obtiene los datos del usuario y también su id. Retorna un objeto
     * @author: 
     * @returns {Promise<LoginResponse|null>}
     */
    /**
     * 
     * @returns 
     */
    public async obtenerId(): Promise<LoginResponse | null> {
        /**
         * * Validamos los datos enviados por el usuario
         */
        await this.validarPeticion();
        console.log("this-password",this.password)
        const usuario: any = await UsuarioDao.comprobarRegistroUsuario(this.email);
        
        if ( !usuario ) {
            return null;
        }

        /**
         * * Validar la contraseña que ingresó el usuario
         */
        console.log("usuario: ",usuario.password)
        console.log("ID DE USSUARIO::::::::::::::::::::::::::::::::>>>>>>>>>>>>>>>>> ",usuario.id)
        const passwordValida = await PasswordHashing.validatePassword(this.password, usuario.password);

        if ( !passwordValida ) {
            return null;
        }

        const jwtPayload: IJwtPayload = {
            email: usuario.email,
            password:usuario.password
        };

        const token: string = await Jwt.generarJwt(jwtPayload, process.env.JWT_EXPIRATION || '8h', process.env.JWT_SECRET);

        const response:any = ({
            token,
            id:usuario.id,
            email:usuario.email,
            password:usuario.password,
        });
        
        /**
         * * Actualizar la fecha de ultimo acceso al sistema
         */
       // await UsuarioDao.actualizarUltimoAcceso(usuario.idPersonal);

        //await Privilegios.guardarPrivilegiosRedis(usuario.idPersonal.toString(), JSON.stringify(usuario.privilegios));

        return response;
    }

//actualizar credenciales está en users-request.model

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