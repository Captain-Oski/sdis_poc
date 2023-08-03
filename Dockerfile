# Utilisez une image de base Node.js
FROM node:18

# Créez le répertoire de travail de l'application
WORKDIR /usr/src/app

# Copiez les fichiers de l'application
COPY api/package*.json ./
COPY api/index.js ./

# Installez les dépendances de l'application
RUN npm install

# Exposez le port de l'API
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["sh", "-c", "node index.js $DB_HOST"]