import ClassValidationException from "@common/exceptions/class-validation.exception";
import { IsOptional, IsString, validate } from "class-validator";
import { ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts"
import LoginResponse from "./login-response.model";
import Usuario, { IUsuario } from "@entities/usuario/usuario.model";
import UsuarioDao from "@entities/usuario/usuario.dao";
import PasswordHashing from "@common/encryption";
import IJwtPayload from "@common/interfaces/jwt-payload.interface";
import { Jwt } from "@common/jwt";

export interface ILoginRequest {
    email?:string;
    password?: string;
}

class LoginRequest implements ILoginRequest {
    @IsOptional()
    @IsString()
    @ApiModelProperty({
        description: 'Email del usuario para ingresar al sistema.',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public email?: string;
    
    @IsOptional()
    @IsString()
    @ApiModelProperty({
        description: 'Contraseña del usuario para ingresar al sistema.',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public password?: string;

    constructor(credenciales: ILoginRequest) {
        Object.assign(this, credenciales);
    }

    /**
     * @description Comprueba las credenciales ingresadas por el usuario, si son validas se retorna el objeto 'LoginResponse' con los datos del usuario
     * @author: 
     * @returns {Promise<LoginResponse|null>}
     */
    /**
     * 
     * @returns 
     */
    public async comprobarCredenciales(): Promise<LoginResponse | null> {
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
     * @description Comprueba las credenciales ingresadas por el usuario, si son validas se retorna el objeto 'LoginResponse' con los datos del usuario
     * @author: 
     * @returns {Promise<LoginResponse|null>}
     */
    /**
     * 
     * @returns 
     */
    public async registrarCredenciales(): Promise<LoginResponse | null> {
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
     * @description Comprueba las credenciales ingresadas por el usuario, si son validas se retorna el objeto 'LoginResponse' con los datos del usuario
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
     * @description Comprueba las credenciales ingresadas por el usuario, si son validas se retorna el objeto 'LoginResponse' con los datos del usuario
     * @author: 
     * @returns {Promise<LoginResponse|null>}
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
        console.log("RESSSSSSSSSSSSSSSSSSSSSS requ: ",response)
        return response;
    }



    /**
     * @description Comprueba las credenciales ingresadas por el usuario, si son validas se retorna el objeto 'LoginResponse' con los datos del usuario
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

export default LoginRequest;