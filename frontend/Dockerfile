FROM node:20-bullseye

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN PLAYWRIGHT_BROWSERS_PATH=0 npx playwright install --with-deps chromium

RUN npm run build


EXPOSE 3000

CMD ["sh", "-c", "npm run migrate && (npx prisma studio &) && npm run start"]