# Nomad Coffee

## Nomad Coders Instagram Clone Coding Challenge

- https://nomadcoders.co

- [x] Day 1 of 43
  - [x] npx init -y / git init
  - [x] Create ad Github Respository named `nomadcoffee-backend`
  - [x] Set up a Prisma project
    - `npm i -D prisma` / `npm i @prisma/client`
    - `npx prisma init`
    - postgress database setup: `CREATE DATABASE nomadcoffee;`
    - .env : `DATABASE_URL="postgresql://geony:randompassword@localhost:5432/nomadcoffee?schema=public"`
    - prisma.schema.prisma : `model User {}`
    - `npx prisma migrate dev --preview-feature`
    - Make Movie Model
  - [x] Set up Server
    - npm i apollo-server-express
    - `touch src/server.js`
    - `npm i express morgan`
    - setup express / apollo server
  - [x] Schema setup
    - schema.js
    - install loadFileSync / mergeTypeDefs & mergeResolvers
    - export merged types and resolvers
  - [x] The project should follow the architecture outlined on the video (.typeDefs.js , .resolvers.js).
    - Define Type / Query / Mutation
  - [x] Use babel, nodemon and dotenv
    - [x] Setup Babel / nodemon
      - `npm i -D @babel/core @babel/node @babel/preset-env nodemon`
      - scripts : `"dev" : "nodemon --exec babel-node src/server"`
    - [x] Setup dotenv
      - npm i dotenv
      - server.js
        - `require("dotenv").config();`
        - `.env` : Define PORT
  - git push :
