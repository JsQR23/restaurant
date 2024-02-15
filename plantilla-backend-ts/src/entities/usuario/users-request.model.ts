import ClassValidationException from "@common/exceptions/class-validation.exception";
import { IsOptional, IsString, validate } from "class-validator";
import { ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";
import UserResponse from "./usuario-response.model";
import Usuario, { IUser } from "@entities/usuario/usuario.model";
import UsuarioDao from "@entities/usuario/usuario.dao";
import PasswordHashing from "@common/encryption";
import IJwtPayload from "@common/interfaces/jwt-payload.interface";
import { Jwt } from "@common/jwt";

export interface IUserRequest {
    id?:Number;
    email?:string;
    password?: string;
}

class UserRequest implements IUserRequest {
    @IsOptional()
    @IsString()
    @ApiModelProperty({
        description: 'ID del usuario.',
        type: SwaggerDefinitionConstant.NUMBER,
        required: false
    })
    public id?: number;

    @IsOptional()
    @IsString()
    @ApiModelProperty({
        description: 'Email del usuario para ingresar al sistema.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public email?: string;
    
    @IsOptional()
    @IsString()
    @ApiModelProperty({
        description: 'Contraseña del usuario para ingresar al sistema.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public password?: string;

    constructor(credenciales: IUserRequest) {
        Object.assign(this, credenciales);
    }

    /**
     * @description Comprueba las credenciales ingresadas por el usuario, si son validas se retorna el objeto 'LoginResponse' con los datos del usuario
     * @author: 
     * @returns {Promise<UserResponse|null>}
     */
    public async comprobarCredenciales(): Promise<UserResponse | null> {
        /**
         * * Validamos los datos enviados por el usuario
         */
        await this.validarPeticion();

        const usuario: Usuario = await UsuarioDao.comprobarRegistroUsuario(this.email);
        
        if ( !usuario ) {
            return null;
        }

        /**
         * * Validar la contraseña que ingresó el usuario
         */

        const passwordValida = await PasswordHashing.validatePassword(this.password, usuario.password);

        if ( !passwordValida ) {
            return null;
        }

        const jwtPayload: IJwtPayload = {
            email: usuario.email,
            password:usuario.password
        };

        const token: string = await Jwt.generarJwt(jwtPayload, process.env.JWT_EXPIRATION || '8h', process.env.JWT_SECRET);

        const response = new UserResponse({
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
     * @description Crea un usuario a través del Dao y retorna una instancia de la clase LoginResponse con los datos de éste
     * @author: 
     * @returns {Promise<UserResponse|null>}
     */
    /**
     * 
     * @returns 
     */
    public async registrarCredenciales(): Promise<UserResponse | null> {
        /**
         * * Validamos los datos enviados por el usuario
         */
        await this.validarPeticion();

        const usuario: Usuario = await UsuarioDao.RegistrarUsuario(this.email,this.password);

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

        const response = new UserResponse({
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
     * @returns {Promise<UserResponse|null>}
     */
    /**
     * 
     * @returns 
     */
    public async eliminarCredenciales(id:number): Promise<UserResponse | null> {
        /**
         * * Validamos los datos enviados por el usuario
         */
        await this.validarPeticion();

        const usuario: Usuario = await UsuarioDao.EliminarUsuario(id);

        if ( !usuario ) {
            return null;
        }

        /**
         * * Validar la contraseña que ingresó el usuario
*/
       
        const jwtPayload: IJwtPayload = {
            email: usuario.email,
            password:usuario.password
        };

        const token: string = await Jwt.generarJwt(jwtPayload, process.env.JWT_EXPIRATION || '8h', process.env.JWT_SECRET);

        const response = new UserResponse({
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
     * @returns {Promise<UserResponse|Object>}
     */
    /**
     * 
     * @returns 
     */
    public async obtenerCredenciales(): Promise<any | null> {

        const usuario: any = await UsuarioDao.ObtenerUsuarios();

        if ( !usuario ) {
            return null;
        }
        const jwtPayload: IJwtPayload = {
            email: usuario.email,
            password:usuario.password
        };

        const token: string = await Jwt.generarJwt(jwtPayload, process.env.JWT_EXPIRATION || '8h', process.env.JWT_SECRET);
        
        const response: IUser[] = [];

        for (const row of usuario) {
            response.push({
                email: row.email,
                password: row.password
            });
        }
        
        response.push({token:token})
        
        return response;
    }

    /**
     * @description Obtiene los datos del usuario y también su id. Retorna un objeto
     * @author: 
     * @returns {Promise<UserResponse|null>}
     */
    public async obtenerId(): Promise<UserResponse | null> {
        /**
         * * Validamos los datos enviados por el usuario
         */
        await this.validarPeticion();
        const usuario: Usuario = await UsuarioDao.comprobarRegistroUsuario(this.email);
        
        if ( !usuario ) {
            return null;
        }

        /**
         * * Validar la contraseña que ingresó el usuario
         */

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
    
    /**
     * @description Comprueba las credenciales ingresadas por el usuario, si son validas se retorna el objeto 'LoginResponse' con los datos del usuario
     * @author: 
     * @returns {Promise<UserResponse|null>}
     */
    public async actualizarCredenciales(): Promise<UserResponse | null> {
        const usuario: any = await UsuarioDao.ActualizarUsuario(this.email, this.password, this.id);
        console.log("REQUEST:::::::::::::::: en actualizar ", usuario);
        if (!usuario) {
            return null;
        }
    
        const jwtPayload: IJwtPayload = {
            email: usuario.email,
            password: usuario.password
        };
    
        const token: string = await Jwt.generarJwt(jwtPayload, process.env.JWT_EXPIRATION || '8h', process.env.JWT_SECRET);
    
        const response: any = ({
            token,
            id: usuario.id,
            email: usuario.email,
            password: usuario.password,
        });
    
        // Return the response here if needed, or perform any further actions
        return response; // Or whatever the appropriate return value is
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

export default UserRequest;