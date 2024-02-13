export interface User{
    password:string;
    email:string
}
export interface Session{
    id:number;
    email:string;
    password:string
}
export interface Dish{
    nombre?:string;
    precio:string;
    img?:string;
}
