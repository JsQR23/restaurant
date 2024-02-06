import ClassValidationException from "@common/exceptions/class-validation.exception";
import { IPrivilegios } from "@common/interfaces/privilegio.interface";
import { IsNumber, IsString, IsEmail, IsBoolean, validate, IsOptional } from "class-validator";
import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";

export interface IUsuario {
    token?:string;
    password?:string;
    email?:string;
}

export interface IUsuarioSesion extends Pick<IUsuario, 'email'>{}


@ApiModel({
    name: 'Usuario'
})
export class Usuario implements IUsuario {
    @IsOptional()
    @IsString()
    @ApiModelProperty({
        description: 'token.',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public token?: string;
    
    @IsOptional()
    @IsString()
    @ApiModelProperty({
        description: 'Contraseña del usuario.',
        type: SwaggerDefinitionConstant.STRING,
        required: true
    })
    public password?: string;

    @IsEmail()
    @IsOptional()
    @ApiModelProperty({
        description: 'Email del usuario.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public email?: string;

    constructor(usuario: IUsuario) {
        Object.assign(this, usuario);
    }

    /**
    * @description Valida los datos que envia el usuario en la petición
    * @param {IUsuario} usuario
    */
    public async validarPeticion(usuario: IUsuario): Promise<void> {
        const erroresValidacion = await validate(usuario);
        if ( erroresValidacion.length > 0 ) {
            throw new ClassValidationException(erroresValidacion);
        }
    }
}

export default Usuario;