import { IPrivilegios } from "@common/interfaces/privilegio.interface";
import { IsEmail, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts"

export interface ILoginResponse {
    token: string;
    password?:string;
    email?:string;
}


class LoginResponse implements ILoginResponse {
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

    constructor(loginResponse: ILoginResponse) {
        Object.assign(this, loginResponse)
    }
    
}

export default LoginResponse;