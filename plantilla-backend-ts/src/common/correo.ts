import { readFileSync } from 'fs';
import { StatusCodes } from 'http-status-codes';
import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/ses-transport';
import { join } from 'path';
import HttpException from './exceptions/http.exception';
import { Attachment } from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

const LOGO = `LOGO.svg`;

const PLANTILLA_CORREO = readFileSync(join(process.cwd(), 'public/html', 'plantilla-correo.html'), {
    encoding: 'utf-8'
});

const APPURL: string = `${process.env.HOST_URL}/home`;

export class Correo {
    /**
     * @description: Método que envia un correo electrónico.
     * @param {string} de La dirección de correo electrónico que envia el mensaje.
     * @param {string} para La dirección de correo electrónico a las que va dirigido el mensaje.
     * @param {string} asunto Asunto del mesaje.
     * @param {string} mensaje Texto que llevará el cuerpo del mesaje.
     */
    public static enviaCorreo = async(de: string, para: string, asunto: string, mensaje: string, adjuntos?: Attachment[]): Promise<void> => {
        let html: string = PLANTILLA_CORREO;

        html = html.replace("${MENSAJE}", mensaje);
        html = html.replace("${APPURL}", APPURL);
        // html = html.replace("${LOGOAPPSER}", logoGC? LOGO_GC : LOGO_APPSER);

        const mailOptions: MailOptions = {
            from : de,
            to: para,
            subject: asunto,
            text: mensaje.replace(/(<([^>]+)>)/gi, ""), //eliminamos las etiquetas html
            html,
            attachments: [{
                filename: LOGO,
                path: join(process.cwd(), "public/images", LOGO),
                cid: 'logo'
            }]
        };
        adjuntos? mailOptions.attachments = [...mailOptions.attachments, ...adjuntos] : null;

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, (error as Error).message);
        }
    }
}

export default Correo;