# Establece la imagen base para el contenedor
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de configuración y dependencias del proyecto
COPY package*.json ./

COPY start.sh .

# Instala las dependencias del proyecto
RUN npm install

# Copia el código fuente de la aplicación
COPY . .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación

#RUN  npm run typeorm:run
CMD ["sh", "start.sh"]