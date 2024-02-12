#imagen base 
FROM node:16.13
#ahora hay que establecer los pasos 
#como si estuvieras configurando las cosas en 
#un servidor:
RUN mkdir /home/node/app
#workdir crea una carpeta y ahí se ejecutan
#los siguientes comandos:
WORKDIR /home/node/app
#copy te permite copiar archivos de la 
#computadora a la imagen en el servidor
#es importante, pues copiar las dependencias
#que en este caso son las están en package.json
COPY package*.json ./
#este corre todas las dependencias instaladas 
RUN npm ci
#copy copia todas las cosas de la carpeta donde
#se encuentra el archivo de docker y lo pega en 
#la imagen del contenedor que se usa
COPY . .

RUN npm run build:prod
#en cuanto inicie el contenedor, ejecute:
CMD [ "npm", "run", "start:prod" ]
#ACHTUNG si hay cosas que se quisieran omitir
#a la hora de subir los arichivos, se puede usar 
#un archivo .dockerignore

