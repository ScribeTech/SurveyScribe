# SurveyScribe

Ask questions. Get answers.

## Team

  - __Product Owner__: Elijah Schow
  - __Scrum Master__: Megan Rabuse
  - __Development Team Members__: Jin Chung, Clark Baumgartner

## Usage

SurveyScribe is a simple, beautiful survey application. Build a survey, send the link, and analyze responses.
  
## Technologies
  1. [Express](https://expressjs.com/) / [Node](https://nodejs.org/en/n)
  1. [React](https://facebook.github.io/react/) / [Redux](http://redux.js.org/)
  1. [Mocha](https://mochajs.org/) / [Chai](http://chaijs.com/api/bdd/)
  1. [Material-UI](http://www.material-ui.com/#/)
  1. [Webpack](https://webpack.github.io/) / [Babel](https://babeljs.io/) / [ESLint](http://eslint.org/)
  1. [Highcharts](https://www.highcharts.com/), [Bluebird](http://bluebirdjs.com/docs/why-promises.html), etc. (see [package.json](package.json))

## Requirements

  1. [Node 7.8](https://github.com/creationix/nvm#installation)
  1. [NPM 4.5](https://docs.npmjs.com/getting-started/installing-node)
  1. [MongoDB](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-os-x/)
  1. [Node Sodium](https://github.com/paixaop/node-sodium#install)

## Installing Dependencies

1. Install [Node Sodium](https://github.com/paixaop/node-sodium#install) and its dependancies.

    **OSX**
    ``` sh
    brew install libtool autoconf automake
    npm install node-gyp -g
    npm install sodium --unsafe-perm -g
    ```
    
    **Linux**
    ```
    sudo apt-get install libtool autoconf automake build-essential
    npm install node-gyp -g
    npm install sodium --unsafe-perm -g
    ```

1. Install node packages.
    ``` sh
    npm install
    ```


## Contributing

**Github Workflow:** [CONTRIBUTING.md](docs/CONTRIBUTING.md)

**Style Guide:** [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript) (see [.eslintrc](.eslintrc) for exceptions)
