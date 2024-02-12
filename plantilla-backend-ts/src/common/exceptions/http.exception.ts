import logger from "@common/logger";
//extends = inherits from Error
export default class HttpException extends Error {
    statusCode?: number;
    status?: number;
    message: string;
    error: string | null;

    constructor(statusCode: number, message: string, error?: string) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.error = error || null;
//si hay un error en forma de string, se imprime eso, si no, se imprime el 
//mensaje
        error ? logger.error(this.error) : logger.error(this.message);
    }
}