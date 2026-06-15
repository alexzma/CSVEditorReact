import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

it('renders', () => {
  render(<App />);
  expect(screen.getByTestId('app')).toBeInTheDocument();
  expect(screen.getByTestId('fileInput')).toBeInTheDocument();
  expect(screen.getByTestId('downloadButton')).toBeInTheDocument();
  expect(screen.getByTestId('table')).toBeInTheDocument();
});