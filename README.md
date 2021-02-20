scripts: 
    <br>start: nodemon server.js
    <br>db:create: node node_modules/.bin/sequelize db:create
    <br>db:migrate: node node_modules/.bin/sequelize db:migrate
    <br>db:seed: node node_modules/.bin/sequelize db:seed:all
    <br>test: mocha ./tests/*.test.js
