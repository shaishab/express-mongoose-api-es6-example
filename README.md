# express-mongoose-api-es6-example
This is a simple starter project example for building REST APIs in Node.js using express, mongoose with es6 code without any **transpiler**.

## Why not transpile javaScript for Node.js ?
For the client side is pretty much required transpiling the javaScript (ES6 to ES5) for wide range support of browsers, but when the project running on the server side with Node.js the transpiling is entirely optional because currently all ES6 features supported by Node.js.

### Consider Import, Exports modules of ES6

There is no JavaScript engine yet that support natively ES6 modules not even v8 engine for crome and node.js. So currently we are unable to use the *import, export* module directly in node.js without using any transpiler (like: babel). instead of *import, export* we can use **require() and module.exports **. Most of other features of ES6 can use without transpiler in Node.js.

## Technologies

This project using together the following technologies:

* [Node.js](https://nodejs.org/en/)
* [Express](http://expressjs.com)
* [Mongoose](https://github.com/Automattic/mongoose)
* [Lodash](https://github.com/lodash/lodash)
* [helmet](https://github.com/helmetjs/helmet) To helps secure Express apps by setting various HTTP headers.
* [cors](https://github.com/expressjs/cors) For CORS support 
* [joi](https://github.com/hapijs/joi) joi allows you to create blueprints or schemas for JavaScript objects (an object that stores information) to ensure validation of key information.
* [express-validation](https://github.com/andrewkeig/express-validation) Validate body, params, query, headers and cookies of a request (via middleware) and return a response with errors.
* [gulp](https://github.com/gulpjs/gulp) gulp is a toolkit for automating painful or time-consuming tasks in your development workflow
* [gulp-nodemon](https://github.com/JacksonGariety/gulp-nodemon) Restart the server for real time edit using nodemon.
* [winston](https://github.com/winstonjs/winston) For logging
* [eslint](https://github.com/eslint/eslint)

## Installation

Clone the repository and run `npm install`

    git clone https://github.com/shaishab/express-mongoose-api-es6-example.git
    npm install

## Starting the server

    # Start server
    npm start
    # or
    gulp dev

    # Selectively set DEBUG env var to get logs
    npm run-script debug
    #or
    cross-env DEBUG=express-mongoose-es6-api-starter:* gulp debug

## Logging

The universal logging library winston is used for logging.

## License

This project is licensed under the [MIT License](https://github.com/shaishab/express-mongoose-api-es6-example/blob/master/LICENSE)

### ToDo

* Add test using mocha