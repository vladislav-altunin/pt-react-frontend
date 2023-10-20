// It's good to have a dummy test file
//Helps pass deployment on github and find out early, if there are any issues

//Convention: the name is repective to the comoinent => App.test.jsx tests App.jsx
import App from './App';
import { render } from '@testing-library/react';

//terminal: npm run test
test('renders App component', () => {
  //Renders App
  render(<App />);
});
