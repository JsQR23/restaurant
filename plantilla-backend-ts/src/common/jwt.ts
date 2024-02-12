import jwt from 'jsonwebtoken';
import IJwtPayload  from './interfaces/jwt-payload.interface';

export class Jwt {
    /**
     * @description Genera el token para el manejo de la sesión
     * @param {IJwtPayload} payload payload que se almacena en el token
     * @param {string} expiration tiempo de expiración del token
     * @param {string} secret el secreto con el que se firmará el token
     * @returns {Promise<string>}
     */
    public static generarJwt = async(payload: IJwtPayload, expiration: string, secret: string): Promise<string> => {
        return new Promise<string>((resolve, reject)=> {
            jwt.sign(
                payload,
                secret,
                { expiresIn: expiration },
                (err, encoded) => {
                    if ( err ) {
                        reject (err);
                        return;
                    }
                    resolve (encoded);
                }
            );
        });
    }
}