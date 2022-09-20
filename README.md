# Setup

## Server

Install the Adonis CLI globally, if you don't have so already:

```bash
npm i -g @adonisjs/cli
```

Run `cd server && npm install` to setup your server dependencies.

Create a new local MySQL database. Note the database name and your username/password for configuring the API environment.

Now, create a .env file in the root of /server with the following vars, plugging in user/password/database from above.

```
HOST=127.0.0.1
PORT=3333
NODE_ENV=development
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=8Wr3m0vMw7XHhXQYCf20dDkyt5I97YAB
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_DATABASE=
SESSION_DRIVER=cookie
HASH_DRIVER=bcrypt
```

Run the following in order to spin up your tables, create sample data, and start your API server!

`adonis migration:run && adonis seed && adonis serve --dev`

## Client

Open a separate terminal tab, and run `cd ../client && npm install` to install your client dependencies.

Run `npm start`.

You're all set! Browse pre-seeded data, and create an account so you can post some discussions and comments of your own.
