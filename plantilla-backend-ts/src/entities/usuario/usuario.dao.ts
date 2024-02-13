import { pool } from "@common/database";
import MysqlException from "@common/exceptions/mysql.exception";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import User, { IUser } from "./usuario.model";
import PasswordHashing from "@common/encryption";
import HttpException from "@common/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import { PoolConnection } from "mysql2/promise";
import { decompress } from "compress-json";
import logger from "@common/logger";

class UsuarioDao {
    result:any
    valid(plana:string,hasheada:string){
        this.result = PasswordHashing.validatePassword(plana,hasheada)
    }
    /**
     * @description: Comprueba que el usuario tenga acceso a la plataforma
     * @param {string} idUser
     * @author: Alejandra Sanchez - 2023/12/14
     * @returns {Promise<User | null>}
     */
    public static comprobarRegistroUsuario = async (email: string): Promise<User | null> => {
        let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;

        const queryComprobarRegistroUsuario: string = `SELECT id, email, password FROM user WHERE email=?`;

        try {
            [rows] = await pool.query(queryComprobarRegistroUsuario,[email]);

        } catch (error) {
            
            throw new MysqlException('comprobarRegistroUsuario', error.message);
        }
        

        if ( Object.keys(rows).length === 0 ) return null;

        const usuario: any = {
            id: rows[0].id,
            email: rows[0].email,
            password: rows[0].password 
        }

        return new User(usuario);
    }

    /**
     * @description: Registra un nuevo usuario en la base de datos
     * @param {string} idUser
     * @author: Fabián Quintanar
     * @returns {Promise<User | null>}
     */
    public static RegistrarUsuario = async (email: string, password: string): Promise<User | null> => {
        let hashed = await PasswordHashing.hashPasword(password);
    
        let rows: OkPacket 
    
        const queryRealizarRegistroUsuario: string = `INSERT INTO user (email, password) VALUES (?, ?)`;
    
        try {
            const [rows] = await pool.query(queryRealizarRegistroUsuario, [email, hashed]);
            console.log("Rows after query create: ", rows);
        } catch (error) {
            console.error(`Error during query: ${error.message}`);
            throw new MysqlException('realizarRegistroUsuario', error.message);
        }
    
        if (Object.keys(rows).length === 0) return null;
    
        const usuario: IUser = {
            email: rows[0].email,
            password: rows[0].password
        }
        console.log("usuario en dao (registrar): ",usuario)
        return new User(usuario);
    }
 
    /**
     * @description: Elimina un usuario de la base de datos
     * @param {string} idUser
     * @author: Fabián Quintanar 6/02/24
     * @returns {Promise<User | null>}
     */
    public static EliminarUsuario = async (id:number): Promise<User | null> => {

        let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;
        
        const queryEliminarUsuario: string = `DELETE FROM user WHERE id=?`;
        
        try {
            [rows] = await pool.query(queryEliminarUsuario, [id]);  

        } catch (error) {
            console.error(`Error during query: ${error.message}`);
            throw new MysqlException('eliminarUsuario', error.message);
        }
    
        if (Object.keys(rows).length === 0) return null;
    
        const usuario: IUser = {
            email: rows[0].email,
            password: rows[0].password
        }
        console.log("Usuario: ", usuario);
        return new User(usuario);
    } 

    /**
     * @description: Obtiene todos los correos de los usuarios de la base de datos
     * @param {string} idUser
     * @author: Fabián Quintanar 6/02/24
     * @returns {Promise< | null>}
     */
    public static ObtenerUsuarios = async (): Promise<any | null> => {
    
        let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;
    
        const queryObtenerUsuarios: string = `SELECT * FROM user`;
    
        try {
            [rows] = await pool.query(queryObtenerUsuarios);

        } catch (error) {
            console.error(`Error during query: ${error.message}`);
            throw new MysqlException('obtenerUsuarios', error.message);
        }
    
        if (Object.keys(rows).length === 0) return null;
        
        if (!Array.isArray(rows)) {
            throw new Error('Query did not return an array');
        }

        return rows;
    }

    /**
     * @description: Actualiza los datos del usuario en la base de datos
     * @param {string} idUsuario
     * @author: Fabián Quintanar 6/02/24
     * @returns {Promise<User| null>}
     */
    public static ActualizarUsuario = async (email: string, password: string, id:number): Promise<User | null> => {
        let hashed = await PasswordHashing.hashPasword(password);
    
        let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;
    
        const queryRealizarRegistroUsuario: string = 'UPDATE user SET email = ?, password = ? WHERE id = ?';
        console.log("id en actualizar: ",id)
        try {
            [rows] = await pool.query(queryRealizarRegistroUsuario, [email, hashed, id]);
            console.log("Rows after query ACTUALIZAR: ", rows);
        } catch (error) {
            console.error(`Error during query: ${error.message}`);
            throw new MysqlException('realizarRegistroUsuario', error.message);
        }
    
        if (Object.keys(rows).length === 0) return null;
    
        const usuario: IUser = {
            email: rows[0].email,
            password: rows[0].password
        }
        console.log("Usuario: ", usuario);
        return new User(usuario);
    }
}

export default UsuarioDao;