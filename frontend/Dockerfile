
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN chmod +x node_modules/.bin/*
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
