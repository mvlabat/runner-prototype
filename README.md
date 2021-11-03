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
