import ClassValidationException from "@common/exceptions/class-validation.exception";
import { IPrivilegios } from "@common/interfaces/privilegio.interface";
import { IsNumber,  IsString, IsEmail, IsBoolean, validate, IsOptional} from "class-validator";
import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";

export interface IUser {
    token?:string;
    id?:string;
    password?:string;
    email?:string;
    validarPeticion?: (usuario: IUser) => Promise<void>;
}

export interface IUserSesion extends Pick<IUser, 'email'>{}


@ApiModel({
    name: 'User'
})
export class User implements IUser {
    @IsOptional()
    @IsString()
    @ApiModelProperty({
        description: 'id.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public id?: string;
    @IsOptional()
    @IsString()
    @ApiModelProperty({
        description: 'token.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public token?: string;
    
    @IsOptional()
    @IsString()
    @ApiModelProperty({
        description: 'Contraseña del user.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public password?: string;

    @IsEmail()
    @IsOptional()
    @ApiModelProperty({
        description: 'Email del user.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public email?: string;

    constructor(user: IUser) {
        Object.assign(this, user);
    }

    /**
    * @description Valida los datos que envia el usuario en la petición
    * @param {IUser} user
    * @returns Promise<void>
    * @async
    */
    public async validarPeticion(user: IUser): Promise<void> {
        const erroresValidacion = await validate(user);
        if ( erroresValidacion.length > 0 ) {
            throw new ClassValidationException(erroresValidacion);
        }
    }
}

export default User;