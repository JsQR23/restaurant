import { IPrivilegios } from "@common/interfaces/privilegio.interface";
import { IsEmail, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts"

export interface IUserResponse {
    token: string;
    password?:string;
    email?:string;
}


class UserResponse implements IUserResponse {
    @IsString()
    @ApiModelProperty({
        description: 'Token generado por jwt.',
        type: SwaggerDefinitionConstant.STRING
    })
    public token: string;

    @IsEmail()
    @IsOptional()
    @ApiModelProperty({
        description: 'Email del usuario.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public email?: string;

    @IsString()
    @IsOptional()
    @ApiModelProperty({
        description: 'Contraseña del usuario.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public password?: string;

    constructor(userResponse: IUserResponse) {
        Object.assign(this, userResponse)
        console.log("response del usuario: ",userResponse)
    }
    
}

export default UserResponse;