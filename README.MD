# Transformations Quest

A game by MindFuel to help teach the concepts of geometric transformations in a fun and engaging way to students!

## Projects

**web**: the web client
**server**: the back end server for catching play data / serving level data

## CI

GitHub Actions (`.github/workflows/main.yml`): every push builds the web client and publishes it to
[Vault](https://vaultlearninggames.org) as the University of Calgary studio, at
`https://builds.vaultlearninggames.org/ucalgary/transformation-quest/<branch or tag>/` (on
`builds.vaultlearninggames-staging.org` while the `VAULT_PUBLISHER_URL` repository variable points at the staging
portal). Deleting a branch removes its preview. To release, push a version tag, test it, then *Request release* in the
[Vault Studio Portal](https://portal.vaultlearninggames.org).

Only `web` is published: Vault's CDN hosts static files. The build (`npm run build-vault` in `web`) uses relative
asset paths and hash routes (`…/#/level/3`), so the same files play from any folder, and it leaves
`REACT_APP_DATA_COLLECTION_BASE_URL` unset, so the client makes no `/api` calls: the data collection `server` is not
deployed, and *Enter a code* on the title screen (which loads a session from that server) finds nothing. Play data
still goes to OpenGameData.

No secrets are needed: the workflow's GitHub OIDC token authenticates it, and Vault's portal assigns this repository
to the University of Calgary studio.

## Lifecycle Scripts

`npm install` - runs install the sub projects
`npm build` - builds the sub projects
`npm test` - tests the sub projects
`npm start:web` - boots the webapp in development mode
`npm start:server` - boots the data collection server locally on port 4000

## Data collection notes

There are two required components to doing data collection:
1. running the server.  In order to run the server an environment variable called "DATA_DIRECTORY" needs to be set to a folder that exists on the server drive.  This folder will accumlate "session" files that are JSON text files that describe level start and run events for data summarization.
2. setting the baseUrl for the react application.  You do this by setting the environment variable "REACT_APP_DATA_COLLECTION_BASE_URL" to be something like "http://localhost:3000" BEFORE you build the react application.

Running in development mode - you will find that the server's default port is 4000. This is intentional.  The react app is set to proxy localhost:3000 to localhost:4000 in development mode (seen in package.json of the web package).  This is done so that the react app can call back to localhost:3000 and avoid having to configure CORS.  It is important that you set the REACT_APP_DATA_COLLECTION_BASE_URL to be "http://localhost:3000" in development mode.

In production builds require these environments to be set up ahead of time.  A cloudfront needs to be setup to redirect the /api/ urls to the server, but keep the domain to be the same as the served app.
