import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './Table';

it('renders', () => {
  render(<Table />);
  expect(screen.getByTestId('table')).toBeInTheDocument();
});