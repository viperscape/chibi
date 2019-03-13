# Chibi

## Minimal blogging

### Environment

- React front end to be hosted on S3 or Nginx
- Separate Flask backend handling REST routes and SQL
- Use SQLite3 for quick and easy setup

### Initial Setup

1. Git clone repo and cd into it
2. In one shell run `env-setup` script in server folder to setup virtual-env
3. In another shell run `npm update` in client folder to install dependencies for front end

### Development Setup

Both backend and front end development servers automatically refresh on file changes.

- Client
    1. In client folder, run `npm start` to begin client side React server
- Server
    1. In server folder, make sure `env-setup` script was executed
    2. Run `run-server` script to start flask server

### Production Setup

- Client
    1. Change `config.json` in client folder to reflect the production backend server URI
    2. In client folder run `npm run build` to build out front end of site for static web server

- Server
    1. In server folder run `run-server` script, except change environment to `production`