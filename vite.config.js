// terminal: create vite@latest

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  //the name of the folder on github, needed for deployment
  base: '/pt-react-frontend/Customers',
  plugins: [react()],
  test: {
    //enables jest globals API
    globals: true,
    //defines the env that will be used for testing (default: Node.js)
    //In this case browser based jsdom will be used
    environment: 'jsdom',
  },
});

//OTHER COMMENTS

/* JSDOM provides browser API */
/* REACT TESTING LIBRARY helps to test React components */
/* JEST-DOM LIBRARY provides custom matchers to extend vitest */
// npm install -D jsdom @testing-library/react @testing-library/jest-dom

/* VITEST testing framework */
// npm install -D vitest

/* GITHUB PAGES*/
// npm install --save-dev gh-pages
/*
gh pages uses "homepage" property at the top of package.json
format: "homepage": https://<your-github-username>.github.io/<your-repository-name>/
example: "homepage": "https://github.io/vladislav-altunin/pt-react-frontend/"
*/

/* SCRIPTS in package.jsom */
/*
To automate the deployment process, in the exact order
"predeploy": "npm run build",
"deploy": "gh-pages -d dist",
Notice! Deploy folder is dist (not build)
*/

/*

permissions and other settings on github:

- settings => actions => general / workflow permissions: read and write
- settings => pages => build and deployment / source: deploy from branch / branch: gh-pages
----npm run deploy // to deploy changes with this settings
- settings => pages => build and deployment / source: github actions
----requires a workwlow i.e. deploy.yml, them deployed automatically after push

HERE IS AN EXAMPLE

Create .gihub/workflows folders in the root dir of the app
Create a file i.e. in this example node.js.yml but can be for example deploy.ym (if I'm not wrong)

# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Node.js CI

on:
  push:
    branches: ['main']
  pull_request:
    branches: ['main']

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm run build --if-present
      - run: npm test

      - name: Deploy with gh-pages
        run: |
          git remote set-url origin https://git:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git
          npm run deploy -- -u "github-actions-bot <support+actions@github.com>"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          
*/
