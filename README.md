[![logo](https://i.imgur.com/3OtP3p8.png)](https://softwareengineeringdaily.com/)

# SEDaily Website

> Web front end for the [Software Engineering Daily](https://www.softwaredaily.com) application, a Vue.js project

## Getting Started
See the companion project [API](https://github.com/SoftwareEngineeringDaily/software-engineering-daily-api) required to run the web front end locally.

By far the easiest way to get started is to use the Docker containers including the backend and seeded Mongo database. This does require an OS-specific install of [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/#prerequisites). If you run into any challenges do not hesitate to ask for help in the Slack channel!

``` bash
# cloning the project
git clone https://github.com/SoftwareEngineeringDaily/sedaily-front-end.git
cd sedaily-front-end/

# install dependencies
npm install

# run backend (pulls images and runs containers with docker-compose)
npm run backend:start

# serve with hot reload at localhost:8080, using API and event service API running locally
npm run dev

# build for production with minification
npm run build

# build for staging with minification
npm run staging-build

# run the built server from dist/server.js
npm run start

# build for production and view the bundle analyzer report
npm run build --report
```

## Testing
Currently we have end-to-end testing using [Cypress](). These tests should mimic the user's flow when interacting with the web app. For guidance on how to achieve this review existing tests in `cypress/integration`, the [Cypress guide](https://docs.cypress.io/guides), the [Cypress "kitchen sink" example](https://github.com/cypress-io/cypress-example-kitchensink), and the [Cypress example recipes repo](https://github.com/cypress-io/cypress-example-recipes). Generally you want to add tests for anything you would have concerns around regressions being introduced as new features and bug-fixes are introduced. For further guidance on the what and how of Cypress testing please visit the project Slack channel and ask.

End-to-end tests take a long time to run (currently 1.3 minutes) in comparison to to unit tests. While developing your feature you can use the Cypress interactive test-runner to only run a single spec. To do so use `npm run backend:start && npm run dev` then in another terminal run `npm run cy:open`. Implementation of a comprehensive set of faster unit-style tests should be considered later using [cypress-vue-unit-test](https://github.com/bahmutov/cypress-vue-unit-test). If done, fewer end-to-end tests would be necessary.

You can run all e2e tests in one command with `npm run test:e2e`. This should only be done prior to committing. It will also be done automatically when merging in Travis CI as a final check.

## Available API environments
In order to speed up configuration for exploration or cosmetic changes, you can use the API and event stream API's in other environments. Any major development should be done against the local API so testing can be run/updated.
```
# serve with hot reload at localhost:8080, using API running on staging
npm run dev:api-staging

# serve with hot reload at localhost:8080, using API running on production
npm run dev:api-prod
```

## Contributing
`master` branch is deployed to production
`develop` branch gets pushed to staging

We have an active Slack community that you can reach out to for more information or just to chat with anyone. Check out the [<img src="https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png" alt="Slack Channel" width="20px"/> SED app development](https://softwaredaily.slack.com/app_redirect?channel=sed_app_development) slack channel. Also see the [Open Source Guide](https://softwareengineeringdaily.github.io/).

## Pushing to Production
Remember to `npm run build` and then **commit all new files** and then `npm run deploy2`
Works if done from master branch.
To delete commit:

git fetch origin
git reset --hard origin/master

