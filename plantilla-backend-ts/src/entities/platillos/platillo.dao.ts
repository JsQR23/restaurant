import { pool } from "@common/database";
import MysqlException from "@common/exceptions/mysql.exception";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import Platillo, {IPlatillo} from "./platillo.model";
class PlatilloDao {
    /**
     * @description: Registra un nuevo usuario en la base de datos
     * @param {string} nombre
     * @param {number} precio
     * @param {string} img
     * @author: Fabián Quintanar 13/02/24
     * @returns {Promise<Platillo | null>}
     */
    public static RegistrarPlatillo = async (nombre:string,precio:number,img:string): Promise<Platillo | null> => {

        let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;
    
        const queryRealizarRegistroUsuario: string = `INSERT INTO platillos (nombre, precio, img) VALUES (?, ?, ?)`;
    
        try {
            const [rows] = await pool.query(queryRealizarRegistroUsuario, [nombre, precio, img]);
            console.log("Rows after query: ", rows);
        } catch (error) {
            console.error(`Error during query: ${error.message}`);
            throw new MysqlException('realizarRegistroUsuario', error.message);
        }
    
        if (Object.keys(rows).length === 0) return null;
    
        const platillo: IPlatillo = {
            nombre:rows[0],
            precio:rows[0],
            img:rows[0]
        }
        console.log("platillo en dao: ",platillo)
        return new Platillo(platillo);
    }

        /**
     * @description: Obtiene todos los nombre de los platillos de la base de datos
     * @param {string} idUser
     * @author: Fabián Quintanar 6/02/24
     * @returns {Promise< | null>}
     */
        public static ObtenerPlatillos = async (): Promise<any | null> => {
    
            let rows: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;
        
            const queryObtenerPlatillos: string = `SELECT * FROM platillos`;
        
            try {
                [rows] = await pool.query(queryObtenerPlatillos);

            } catch (error) {
                console.error(`Error during query: ${error.message}`);
                throw new MysqlException('obtenerPlatillos', error.message);
            }
        
            if (Object.keys(rows).length === 0) return null;
            
            if (!Array.isArray(rows)) {
                throw new Error('Query did not return an array');
            }

            return rows;
        }
}
export default PlatilloDao