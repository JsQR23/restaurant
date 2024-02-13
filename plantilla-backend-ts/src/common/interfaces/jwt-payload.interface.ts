export default interface IJwtPayload {
    password:string;
    email?: string;
}

export interface IJwtPayloadSession extends Pick<IJwtPayload, 'email'>{}
