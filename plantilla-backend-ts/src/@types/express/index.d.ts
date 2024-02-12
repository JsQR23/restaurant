import IJwtPayload from "@common/interfaces/jwt-payload.interface";
/*Yes, by using the declaration merging feature in TypeScript, 
you are effectively adding a new property to the Express Request object that 
can be accessed in your route handlers or middleware throughout your application. 
This is done through the declare module 'express' syntax, which modifies the type 
definitions of the 'express' module without altering 
the module's actual implementation. */
declare module 'express' {
    export interface Request {
        payload?: IJwtPayload;
    };
};