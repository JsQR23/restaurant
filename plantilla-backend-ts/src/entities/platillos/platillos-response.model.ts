import { IPrivilegios } from "@common/interfaces/privilegio.interface";
import { IsEmail, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts"

export interface IPlatilloResponse {
    token?
    nombre?:string;
    precio?:Number;
    img?:string
}

class PlatilloResponse implements IPlatilloResponse {
    
    @IsString()
    @IsOptional()
    @ApiModelProperty({
        description: 'token.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public token?: string;

    @IsString()
    @IsOptional()
    @ApiModelProperty({
        description: 'Nombre del platillo.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public nombre?: string;

    @IsNumber()
    @IsOptional()
    @ApiModelProperty({
        description: 'Precio del platillo.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public precio?: Number;

    @IsString()
    @IsOptional()
    @ApiModelProperty({
        description: 'Imagen platillo.',
        type: SwaggerDefinitionConstant.STRING,
        required: false
    })
    public img?: string;

    constructor(platilloResponse: IPlatilloResponse) {
        Object.assign(this, platilloResponse)
    }  
}

export default PlatilloResponse;