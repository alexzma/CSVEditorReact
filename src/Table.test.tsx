import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './Table';

it('renders with an empty list', () => {
  const list: string[][] = [];
  const setList = jest.fn();
  render(<Table list={list} setList={setList} />);
  expect(screen.getByTestId('table')).toBeInTheDocument();
  expect(screen.getByTestId('addColumnButton')).toBeInTheDocument();
  expect(screen.queryByTestId('deleteColumnButton-0')).toBeFalsy();
  expect(screen.queryByTestId('addRowButton')).toBeFalsy();
  expect(screen.queryByTestId('deleteRowButton-0')).toBeFalsy();
});