scripts: 
    start: nodemon server.js
    db:create: node node_modules/.bin/sequelize db:create
    db:migrate: node node_modules/.bin/sequelize db:migrate
    db:seed: node node_modules/.bin/sequelize db:seed:all
    test: mocha ./tests/*.test.js
