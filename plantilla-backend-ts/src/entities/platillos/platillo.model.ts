import ClassValidationException from "@common/exceptions/class-validation.exception";
import { IPrivilegios } from "@common/interfaces/privilegio.interface";
import { IsNumber, IsString, IsEmail, IsBoolean, validate, IsOptional } from "class-validator";
import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";

export interface IPlatillo {
    nombre?:string;
    precio?:Number;
    img?:string;
}

//export interface IUsuarioSesion extends Pick<IUsuario, 'email'>{}


@ApiModel({
    name: 'Platillo'
})
export class Platillo implements IPlatillo{
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
    * @description Valida los datos que envia el usuario en la petición
    * @param {IPlatillo} platillo
    */
    public async validarPeticion(platillo: IPlatillo): Promise<void> {
        const erroresValidacion = await validate(platillo);
        if ( erroresValidacion.length > 0 ) {
            throw new ClassValidationException(erroresValidacion);
        }
    }
}

export default Platillo;