# muddle.run

[![Join the chat at https://gitter.im/Gitlings/muddle-run](https://badges.gitter.im/Gitlings/muddle-run.svg)](https://gitter.im/Gitlings/muddle-run?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Waffle.io - Columns and their card count](https://badge.waffle.io/Gitlings/muddle-run.svg?columns=all)](https://waffle.io/Gitlings/muddle-run)
[![Build Status](https://travis-ci.org/Gitlings/muddle-run.svg?branch=master)](https://travis-ci.org/Gitlings/muddle-run)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=Gitlings/muddle-run)](https://dependabot.com)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

## Local development
### Prerequisites
- Node.js environment
- Yarn
```bash
yarn install # for eslint
cd common
yarn install # just to make sure everything's OK
yarn link
```

### Backend
```bash
cd backend
yarn link "muddle-common"
yarn install
yarn serve
```

### Frontend
```bash
cd frontend
yarn link "muddle-common"
yarn install
yarn serve
```