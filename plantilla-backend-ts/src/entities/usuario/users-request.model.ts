import ClassValidationException from "@common/exceptions/class-validation.exception";
import { IsOptional, IsString, validate } from "class-validator";
import { ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts"
import LoginResponse from "@entities/login/login-response.model";
import Usuario, { IUsuario } from "@entities/usuario/usuario.model";
import UsuarioDao from "@entities/usuario/usuario.dao";
import PasswordHashing from "@common/encryption";
import IJwtPayload from "@common/interfaces/jwt-payload.interface";
import { Jwt } from "@common/jwt";

export interface IUserInterface {
    id?:number;
    email?:string;
    password?: string;
}

class UserRequest implements IUserInterface {
    @IsOptional()
    @IsString()
    @ApiModelProperty({
        description: 'id del usuario para actualizar.',
        type: SwaggerDefinitionConstant.NUMBER,
        required: true
    })
    public id?: number;

    @IsOptional()
    @IsString()
    @ApiModelProperty({
        description: 'Email del usuario para ingresar al sistema.',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public email?: string;

    @IsString()
    @ApiModelProperty({
        description: 'Contraseña del usuario para ingresar al sistema.',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public password: string;

    constructor(credenciales: IUserInterface) {
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
    public async actualizarCredenciales(): Promise<LoginResponse | null> {
        const usuario: any = await UsuarioDao.ActualizarUsuario(this.email, this.password, this.id);
        console.log("REQUEST:::::::::::::::: ", usuario);
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
}
export default UserRequest;