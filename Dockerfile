FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy source nhưng KHÔNG copy .env files
COPY src/ ./src/
COPY .sequelizerc ./

EXPOSE 3001

CMD ["npm", "run", "dev"]