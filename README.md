#Welcome

I've built a simple message board with an Adonis.js server, React.js client and a MySQL database. It consists of `discussions`, i.e. high level conversation topics, and `comments`, providing a means of discourse on said topics.

You can either browse as a visitor, or create an account to participate. Follow the instructions below to get this up and running on your local machine!

## Setup

### Server

Install the Adonis CLI globally, if you don't have it installed:

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

### Client

Open a separate terminal tab, and run `cd ../client && npm install` to install your client dependencies.

Run `npm start`.

You're all set!

## What do I do?

The first thing you'll see is a list of discussions populated with pre-seeded data. Thanks to the faker() it's not very compelling literature.

Anyone can search discussions. This checks for matching text within the comments of a discussion, and returns a list of discussions accordingly. In order to reset this, just press `search` with an empty text field.

Create an account once you're chomping at the bit to clap back at the non-sensical seeded comments. The minimal navigation options should lead you right back to the discussions list when you're signed up.

Redux isn't yet setup to persist through reloads. So if you'd like to test from the top, just give the app a refresh.
