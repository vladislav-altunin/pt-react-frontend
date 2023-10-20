// terminal: create vite@latest

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  //the name of the folder on github, needed for deployment
  base: '/pt-react-frontend/',
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
