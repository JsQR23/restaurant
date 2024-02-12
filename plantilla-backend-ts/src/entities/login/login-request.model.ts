import ClassValidationException from "@common/exceptions/class-validation.exception";
import { IsOptional, IsString, validate } from "class-validator";
import { ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";
import LoginResponse from "./login-response.model";
import Usuario, { IUser } from "@entities/usuario/usuario.model";
import UsuarioDao from "@entities/usuario/usuario.dao";
import PasswordHashing from "@common/encryption";
import IJwtPayload from "@common/interfaces/jwt-payload.interface";
import { Jwt } from "@common/jwt";

export interface ILoginRequest {
    id?:Number;
    email?:string;
    password?: string;
}

class LoginRequest implements ILoginRequest {
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

    constructor(credenciales: ILoginRequest) {
        Object.assign(this, credenciales);
    }

    /**
     * @description Comprueba las credenciales ingresadas por el usuario, si son validas se retorna el objeto 'LoginResponse' con los datos del usuario
     * @author: 
     * @returns {Promise<LoginResponse|null>}
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
        console.log("respuesta en login-request: ",response)
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

export default LoginRequest;