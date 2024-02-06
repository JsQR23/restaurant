import bcrypt from 'bcrypt';

class PasswordHashing {

    /**
     * @description: Hashea el texto plano de una contraseña
     * @param {string} password la contraseña en texto plano
     * @returns {string} la contraseña hasheada
     */
    public static async hashPasword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    /**
     * @description Comprueba si la contraseña en texto plano coincide con la contraseña hasheada
     * @param {string} password la contraseña en texto plano
     * @param {string} hashPassword la contraseña hasheada
     * @returns {Promise<boolean>}
     */
    public static async validatePassword(password: string, hashPassword: string): Promise<boolean> {

        return await bcrypt.compare(password, hashPassword);
    }
}

export default PasswordHashing;