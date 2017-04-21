# Developer's Guide

## Getting Started

1. **Fork** the repo and clone it locally (see [CONTRIBUTING.md](CONTRIBUTING.md)).

2. [**Install** dependancies.](#installing-dependancies)

3. [**Run** the client and server locally.](#running-the-client-and-server-locally)

4. [**Test** code before committing it.](#testing)

## Installing Dependencies

#### Summary

1. [Node 7.8 and NPM 4.5](#node-7-8-and-npm-4-5)
2. [Sodium](#node-sodium)
3. [MongoDB](#mongodb)
4. [Packages](#node-packages)

#### Node 7.8 and NPM 4.5

1. Install **[NVM](https://github.com/creationix/nvm#installation)**
  ``` sh
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
  ```

2. Load NVM (or restart your terminal if you want to skip this step).
  ``` sh
  export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
  ```

3. Install the latest version of node
  ``` sh
  nvm install node
  ```

4. Install the latest version of NPM
  ``` sh
  npm install npm
  ```

#### Node Sodium

  **OSX**

  ``` sh
  brew install libtool autoconf automake
  npm install node-gyp -g
  npm install sodium --unsafe-perm -g
  ```

  **Linux (Debian/Ubuntu)**

  ```
  sudo apt-get install libtool autoconf automake build-essential
  npm install node-gyp -g
  npm install sodium --unsafe-perm -g
  ```

#### MongoDB

**OSX**

1. Install **[MongoDB (OSX)](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-os-x/)**

  ```sh
  brew update
  brew install mongodb
  ```

1. Create the default directories

  ``` sh
  mkdir /data
  mkdir /data/db
  ```

1. Take ownership of the directory so mongoDB can use it.

  ``` sh
  sudo chown $USER /data
  ```

1. Run the database service before running the server.

  ``` sh
  mongod
  ```

**Linux (Debian/Ubuntu)**

1. Install **[MongoDB (Debian)](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-debian/)**

  ``` sh
  sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
  echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
  sudo apt-get update
  sudo apt-get install -y mongodb-org
  sudo apt-get install -y mongodb-org=3.0.13 mongodb-org-server=3.0.13 mongodb-org-shell=3.0.13 mongodb-org-mongos=3.0.13 mongodb-org-tools=3.0.13
  ```

1. Start mongoDB
  ``` sh
  sudo service mongod start
  ```

#### Node Packages

  ``` sh
  npm install
  ```

## Running the Client and Server Locally

#### Server

1. Start MongoDB

  ``` sh
  mongod
  ```

  If mongod fails to start:

  - **Already Running:** make sure it isn't already running by using the activity monitor (OSX) or the `top` command (Linux).

  - **Directory Permissions:** Make sure that `/data/db` exists and that you have permission to read and write from it. See

  - **Last Resort:** If all else fails, use `--db-path` to use mongod with a directory that you already have access to, e.g. `mongod --db-path ./SurveyScribe/data/db` (see [installing dependancies](#mongodb) for details).

2. In a new tab (`CMD + T`), start the server

  ``` sh
  npm run dev:server
  ```

#### Client

1. Build the client, start `webpack-dev-server`, and watch for changes
  ``` sh
  npm run dev:client
  ```
2. Open your browser at address that webpack provides (usually `localhost:8080/`)

When you make changes `webpack-dev-server` will live-reload the page. Unfortunately, our configuration doesn't detect CSS changes, so you'll have to manually refresh the page if you update the CSS. You'll be a hero if you can fix this problem.

#### Both

If you're working with the API, you can safely run both `npm run dev:server` and `npm run dev:client` at the same time in different tabs. Webpack proxies requests from `/api` at port `8080` to `/api` port `8000`, so any API requests you send to webpack dev server will be forwarded to the node server.

## Testing

#### All tests
``` sh
npm test
```

#### Server tests
``` sh
npm run test:server
```

#### Client tests
``` sh
npm run test:client
```

## Other Commands

See the `scripts` section of `package.json` for additional commands.
