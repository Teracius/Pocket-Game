FROM node:16
# /app

#cd app
WORKDIR /app

#Dest /app
COPY package*.json ./

#Install dependencias
RUN npm install

#Dest /app
# COPY app.js ./
COPY . .

#Exposition
EXPOSE 3000

# Comand run image
CMD ["npm", "start"]