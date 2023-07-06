FROM node as builder

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run migrate && (npx prisma studio &) && npm run start"]