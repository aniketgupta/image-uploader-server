# Image Uploader - API #

API Server for Image Uploader

### Prerequisites

| Prerequisite                                | Version |
| ------------------------------------------- | ------- |
| [MongoDB Community Server](https://docs.mongodb.com/manual/administration/install-community/) | `~ ^3`  |
| [Node.js](http://nodejs.org)                | `~ ^8.9.3`  |
| npm (comes with Node)                       | `~ ^5`  |

### How do I get set up? ###

* Clone the repo to your local machine.
* Open terminal, run 'npm install'

### Linting ###

You should have [ESLint running in your editor](http://eslint.org/docs/user-guide/integrations.html), and it will highlight anything doesn't conform to this project's style guide. This project uses the base Airbnb JS style guide.

> Please do not ignore any linting errors, as they are meant to **help** you and to ensure a clean and simple code base.

To use linting, please ensure that you have all the dev-dependencies installed for this project.
* VS Code - Install the ESLint plugin by Dirk Baeumer.
* Sublime Text 3 - https://github.com/roadhump/SublimeLinter-eslint
* Manually - run the command "node node_modules/eslint/bin/eslint --ext .js server.js config models routes".

### Contribution guidelines ###

* General guidelines
  1. Never push to master branch.
  2. Run tests and ensure your code passes all the tests before pushing.
  3. Please use ESLint to ensure your code conforms to the standards.
  4. Indent code with 2 spaces.

* Code review
* Other guidelines