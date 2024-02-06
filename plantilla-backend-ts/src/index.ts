import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
    path: path.join(__dirname, 'development.env')
});

console.log(`       
   ******    *******   ****     **** ******** **     **
  **////**  **/////** /**/**   **/**/**///// //**   ** 
 **    //  **     //**/**//** ** /**/**       //** **  
/**       /**      /**/** //***  /**/*******   //***   
/**       /**      /**/**  //*   /**/**////     **/**  
//**    **//**     ** /**   /    /**/**        ** //** 
 //******  //*******  /**        /**/******** **   //**
  //////    ///////   //         // //////// //     //                        
`);

if (process.env.NODE_ENV === 'production') {
    console.log(`
    ********************
    **** PRODUCCION ****
    ********************
    `);
}

import App from './app';
const app = new App(
    Number(process.env.PORT) || 3000
);

app.listen();