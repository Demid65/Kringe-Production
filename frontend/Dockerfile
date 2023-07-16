FROM node:20-bullseye

WORKDIR /usr/src/app
COPY . .

RUN rm -rf node-modules
RUN rm package-lock.json

RUN npm install

RUN PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm i playwright
RUN npx playwright install --with-deps chromium

RUN npm run build


EXPOSE 3000

CMD ["sh", "-c", "npm run migrate && (npx prisma studio &) && npm run start"]