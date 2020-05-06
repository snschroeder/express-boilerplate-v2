# Boilerplate to get a Node.js/Express app running quickly

## What is this?

This is a RESTful Node.js/Express boilerplate design to jumpstart API development. It includes enpoints for authorization and users, as well as the bits and bobbles needed to hook up a PostgreSQL database. 

## Quick start

## Set up

1. `git clone https://github.com/snschroeder/express-boilerplate-v2.git NEW-PROJECTS-NAME` --- Clones this repo
2. `rm -rf .git && git init` --- Creates a fresh git file
3. `npm install` --- Installs dependencies
4. `mv example.env .env` --- creates .env file

## Misc Set up

- Edit the contents of package.json to reflect the name of the new project
- Change this README to reflect the new project

## Scripts

- `npm start` --- starts the application
- `npm run dev` --- starts the application using nodemon to enable live reloads
- `npm test` --- runs tests
- `npm deploy` --- deploys the app once Heroku has been configured
- `npm run migrate` --- creates tables once postgreSQL db has been configured
- `npm run migrate:test` --- creates tables once postgreSQL test db has been configured
- `npm run seed` --- seeds db with starter data. Run after a successful `npm run migrate`
- `npm run seed:test` --- seeds test db with starter data. Run after a successful `npm run migrate:test`


## Deploying

`heroku create` can be used to create a new Heroku application

## In-depth deployment on Heroku

Heroku is a cloud hosting platform that works well for hosting servers. It includes integration for databases, logging, monitoring, email alerts and more. They offer a free tier to get started.

1. Create a Heroku account --- https://signup.heroku.com/identity
2. Download the Heroku CLI --- https://devcenter.heroku.com/articles/heroku-cli#download-and-install
3. `heroku --version` --- verifies install was successful
4. `heroku login` --- logs you in (Note: Windows is dumb so you might need to run this command from cmd.exe)

## Necessary housekeeping before we deploy

1. Hide yo kids, hide yo wife, hide yo secrets --- ensure all passwords, keys, tokens, etc. are in your .env file and not in your code.
2. Remove console.logs --- please and thank you. Leaving them in is ugly at best and a security risk at worst.  
3. Use a different API_TOKEN for deployment --- this will be set up once we have deployed.
4. Audit your packages --- this will automatically happen when you run `npm deploy`. I'm including it here because out-of-date packages can be a security risk. Take this seriously and ensure everything is up-to-date.

## Housekeeping that has already been done
### Come back to this section if you did something dumb and want to know where to look to fix it

1. Respect the PORT --- only worry about this if you messed with the config.js file.
2. Minimize logging --- only worry about this if you messed with the morgan settings in app.js
3. Hide sensitive error info --- clean up error output from endpoints to ensure no sensitive info is being shared
4. Make and configure a Procfile --- Heroku uses this to determine how to start your server. Only revisit this if you removed/renamed/changed the server.js file or deleted the Procfile
5. Specify the version of Node being used in package.json

## Actually finally deploying

1. `git push origin master` --- ensure your master branch on github has the latest code
2. `heroku create` --- this initializes a Heroku app
3. `git push heroku master` --- this uploads your code to Heroku and deploys it
4. `heroku logs` --- we can run this to ensure everything worked

## Setting environment variables in Heroku

`heroku config:set API_TOKEN={paste in new token}` --- this command allows us to set environment variables (in this case the API_TOKEN) for your Heroku app.

Other environment variables can be set by changing `API_TOKEN` for whatever environment variable you need to set

## Important Heroku commands

- `heroku logs --tail` --- the tail flag provides live updates as new logs are added
- `heroku ps:scale web=1` --- this tells Heroku to use our one free dyno for this app. If you upgrade to a paid tier, you can change 1 for more to utilize more dynos for this app.
- `heroku open` --- opens the app in your browser.
- `heroku config` --- lists all environment variables currently set

## Further Best Practices

Humans are good at making mistakes. Deployment has already been partially automated through the `npm deploy` script. This will audit your packages and push the current master branch to Heroku.

Running `npm deploy` is still a manual task, though.

Consider using a Continuous Integration service, such as:

- Circle CI
- Travis CI
- Jenkins
- Gitlab
- AWS pipeline
- Or a bunch others (Google around and find one you like)

These services will monitor the main branch and deploy it for you, though they also offer features such as running tests, sending email notifications when changes are pushed to master, and allowing for an approval process before the changes go live.

Another note: devDependencies are NOT installed when you deploy to Heroku. For this reason(and others), it's important to stage your changes and test them in a "live" environment before deploying to end-users.


## Design decisions made with this boilerplate

This boilerplate includes dependencies specifically for deploying, managing, and interfacing with a PostgreSQL database. If you want to use a different RDBMS, you should run `npm uninstall pg`. 

If you want to use a noSQL db, run `npm unistall pg postgrator-cli knex`. You can also delete the postgrator-config.js file, as well as the the migration and seed files.

If you choose to deploy on a service other than Heroku, the Procfile can be deleted.
