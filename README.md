<<<<<<< HEAD
# gruu

*Generated with [ng-poly](https://github.com/dustinspecker/generator-ng-poly/tree/v0.12.4) version 0.12.4*

## Setup
1. Install [Node.js](http://nodejs.org/)
 - This will also install npm.
1. Run `npm install -g bower gulp yo generator-ng-poly@0.12.4`
 - This enables Bower, Gulp, and Yeoman generators to be used from command line.
1. Run `npm install` to install this project's dependencies
1. Run `bower install` to install client-side dependencies
1. Use [generator-ng-poly](https://github.com/dustinspecker/generator-ng-poly) to create additional components

## Gulp tasks
- Run `gulp build` to compile assets
- Run `gulp dev` to run the build task and setup the development environment
- Run `gulp unitTest` to run unit tests via Karma and to create code coverage reports
- Run `gulp webdriverUpdate` to download Selenium server standalone and Chrome driver for e2e testing
- Run `gulp e2eTest` to run e2e tests via Protractor
 - **A localhost must be running** - `gulp dev`
=======
# angular-typescript-webpack

Angular + Typescript + Webpack build with Karma and wallaby tests support.
And this all with sourcemaps in production support!!

### Install

```sh
npm i webpack typings typescript -g
git clone git@github.com/brechtbilliet/angular-typescript-webpack.git
cd angular-typescript-webpack
npm install
npm start
```

Then it will automatically open the app in your browser

To run tests

```sh
npm test
```

Coverage

```sh
open reports/coverage/index.html
```

Build
```sh
npm install
npm run build
```


### Features

- [x] Build basic Angular app with webpack
- [x] Simple twitter application
- [x] fully tested with Jasmine
- [x] sass support
- [x] Coverage report
- [x] Typescript support
- [x] ES6 modules support
- [x] Running tests in PhantomJS
- [x] Wallaby.js support
- [x] Karma support
- [x] Optimized build package
- [x] Minimal and straightforward setup
- [x] Watches code and refreshes browser with latest changes automatically
- [x] Sourcemap support in develop AND PRODUCTION!!! (don't deploy the js.map file with your application, but use it to debug your production app)
>>>>>>> origin/master
