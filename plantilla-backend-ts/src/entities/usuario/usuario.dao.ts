import { pool } from "@common/database";
import MysqlException from "@common/exceptions/mysql.exception";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import Usuario, { IUsuario } from "./usuario.model";
import PasswordHashing from "@common/encryption";
import HttpException from "@common/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import { PoolConnection } from "mysql2/promise";
import { decompress } from "compress-json";
import logger from "@common/logger";

class UsuarioDao {
    /**
     * @description: Comprueba que el usuario tenga acceso a la plataforma
     * @param {string} idUsuario
     * @author: Alejandra Sanchez - 2023/12/14
     * @returns {Promise<Usuario | null>}
     */
    public static comprobarRegistroUsuario = async (email: string): Promise<Usuario | null> => {
        let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;
        console.log("email en dao: ",email)
        const queryComprobarRegistroUsuario: string = `SELECT id, email, password FROM usuario WHERE email=?`;

        try {
            [rows] = await pool.query(queryComprobarRegistroUsuario,[email]);
            console.log("rowsssss: ",rows)
        } catch (error) {
            
            throw new MysqlException('comprobarRegistroUsuario', error.message);
        }
        

        if ( Object.keys(rows).length === 0 ) return null;

        const usuario: any = {
            id: rows[0].id,
            email: rows[0].email,
            password: rows[0].password
            
        }
        return new Usuario(usuario);
    }




    /**
     * @description: Comprueba que el usuario tenga acceso a la plataforma
     * @param {string} idUsuario
     * @author: Alejandra Sanchez - 2023/12/14
     * @returns {Promise<Usuario | null>}
     */
    public static RegistrarUsuario = async (email: string, password: string): Promise<Usuario | null> => {
        let hashed = await PasswordHashing.hashPasword(password);
        console.log(`Hashed password: ${hashed}`);
    
        let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;
    
        const queryRealizarRegistroUsuario: string = `INSERT INTO usuario (email, password) VALUES (?, ?)`;
    
        try {
            [rows] = await pool.query(queryRealizarRegistroUsuario, [email, hashed]);
            console.log("Rows after query: ", rows);
        } catch (error) {
            console.error(`Error during query: ${error.message}`);
            throw new MysqlException('realizarRegistroUsuario', error.message);
        }
    
        if (Object.keys(rows).length === 0) return null;
    
        const usuario: IUsuario = {
            email: rows[0].email,
            password: rows[0].password
        }
        console.log("Usuario: ", usuario);
        return new Usuario(usuario);
    }
    
    /**
     * @description: Comprueba que el usuario tenga acceso a la plataforma
     * @param {string} idUsuario
     * @author: Alejandra Sanchez - 2023/12/14
     * @returns {Promise<Usuario | null>}
     */
    public static EliminarUsuario = async (email: string): Promise<Usuario | null> => {
    
        let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;
    
        const queryEliminarUsuario: string = `DELETE FROM usuario WHERE email=?`;
    
        try {
            [rows] = await pool.query(queryEliminarUsuario, [email]);
            console.log("Rows after query: ", rows);
        } catch (error) {
            console.error(`Error during query: ${error.message}`);
            throw new MysqlException('eliminarUsuario', error.message);
        }
    
        if (Object.keys(rows).length === 0) return null;
    
        const usuario: IUsuario = {
            email: rows[0].email,
            password: rows[0].password
        }
        console.log("Usuario: ", usuario);
        return new Usuario(usuario);
    } 



    /**
     * @description: Comprueba que el usuario tenga acceso a la plataforma
     * @param {string} idUsuario
     * @author: Alejandra Sanchez - 2023/12/14
     * @returns {Promise< | null>}
     */
    public static ObtenerUsuarios = async (): Promise<any | null> => {
    
        let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;
    
        const queryObtenerUsuarios: string = `SELECT * FROM usuario`;
    
        try {
            [rows] = await pool.query(queryObtenerUsuarios);
            
        } catch (error) {
            console.error(`Error during query: ${error.message}`);
            throw new MysqlException('eliminarUsuario', error.message);
        }
    
        if (Object.keys(rows).length === 0) return null;
        
        if (!Array.isArray(rows)) {
            throw new Error('Query did not return an array');
        }
        console.log("Rows query: ", rows);
        return rows;
    }

    /**
     * @description: Comprueba que el usuario tenga acceso a la plataforma
     * @param {string} idUsuario
     * @author: Alejandra Sanchez - 2023/12/14
     * @returns {Promise<Usuario | null>}
     */
    public static ActualizarUsuario = async (email: string, password: string, id:number): Promise<Usuario | null> => {
        let hashed = await PasswordHashing.hashPasword(password);
    
        let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;
    
        const queryRealizarRegistroUsuario: string = 'UPDATE usuario SET email = ?, password = ? WHERE id = ?';
    
        try {
            [rows] = await pool.query(queryRealizarRegistroUsuario, [email, hashed, id]);
            console.log("Rows after query: ", rows);
        } catch (error) {
            console.error(`Error during query: ${error.message}`);
            throw new MysqlException('realizarRegistroUsuario', error.message);
        }
    
        if (Object.keys(rows).length === 0) return null;
    
        const usuario: IUsuario = {
            email: rows[0].email,
            password: rows[0].password
        }
        console.log("Usuario: ", usuario);
        return new Usuario(usuario);
    }
}

export default UsuarioDao;