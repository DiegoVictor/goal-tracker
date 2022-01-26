# Goal Tracker
[![Netlify Status](https://api.netlify.com/api/v1/badges/fc275060-c266-4258-83b5-2865e6f335af/deploy-status)](https://app.netlify.com/sites/goal-tracker-app/deploys)
[![Build Status](https://app.travis-ci.com/DiegoVictor/goal-tracker.svg?branch=main)](https://app.travis-ci.com/DiegoVictor/goal-tracker)
[![react](https://img.shields.io/badge/reactjs-17.0.2-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![styled-components](https://img.shields.io/badge/styled_components-5.3.3-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-8.6.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-27.4.7-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/goal-tracker?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/goal-tracker)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://raw.githubusercontent.com/DiegoVictor/goal-tracker/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Log in with one email and start manage your goals, you can create, update or delete goals, set deadlines, descriptions, search between them, create tasks to each goal and set the goals and tasks as done.

Live Demo: https://goal-tracker-app.netlify.app/

## Table of Contents
* [Screenshots](#screenshots)
* [Installing](#installing)
* [Usage](#usage)
  * [Login](#login)
  * [localStorage](#localstorage)
* [Running the tests](#running-the-tests)
  * [Coverage Report](#coverage-report)

# Screenshots
Click to expand.<br>
<img src="https://raw.githubusercontent.com/DiegoVictor/goal-tracker/master/screenshots/home.png" width="49%"/>
<img src="https://raw.githubusercontent.com/DiegoVictor/goal-tracker/master/screenshots/dashboard.png" width="49%"/>

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

# Usage
To start the app run:
```
$ yarn start
```
Or:
```
npm run start
```

## Login
Your email is used just to store your data and keep separated from other users in your browser, any kind of ads or newsletter will not be sent to you.

## localStorage
The project saves your goals into a [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) key: a [SHA3](https://cryptojs.gitbook.io/docs/#hashing) hash of your email. Before use this data you need parse the data to a JavaScript object with [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) function. Below you can see fictitious data:
```json
{
  "goals": [
    {
      "id": 1642907083631,
      "title": "Create goal tracker web application",
      "description": "Develop the application to manage goals",
      "deadline": "2022-01-31",
      "tasks": [
        {
          "id": 1642907169966,
          "done": true,
          "title": "Create home page"
        },
        {
          "id": 1642907177520,
          "done": true,
          "title": "Create dashboard page"
        }
      ],
      "done": true,
      "completedAt": "2022-01-23T03:06:18.392Z",
    },
    {
      "id": 1642907124252,
      "title": "To document API routes",
      "description": "Write the API's documentation",
      "deadline": "2022-01-28",
      "tasks": [],
      "done": false,
    }
  ]
}
```

# Running the tests
[Jest](https://jestjs.io) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage report
You can see the coverage report inside `tests/coverage`. They are automatically created after the tests run.

