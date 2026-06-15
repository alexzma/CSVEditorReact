import { act, fireEvent, render, screen } from '@testing-library/react';
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

it('emits changes for adding columns', () => {
  const list: string[][] = [];
  const setList = jest.fn();

  render(<Table list={list} setList={setList} />);
  act(() => {
    fireEvent.click(screen.getByTestId('addColumnButton'));
  });

  expect(setList).toHaveBeenCalledWith([['']]);
});

it('emits changes for deleting columns', () => {
  const list: string[][] = [['']];
  const setList = jest.fn();

  render(<Table list={list} setList={setList} />);
  act(() => {
    fireEvent.click(screen.getByTestId('deleteColumnButton-0'));
  });

  expect(setList).toHaveBeenCalledWith([[]]);
});

it('emits changes for adding rows', () => {
  const list: string[][] = [['']];
  const setList = jest.fn();

  render(<Table list={list} setList={setList} />);
  act(() => {
    fireEvent.click(screen.getByTestId('addRowButton'));
  });

  expect(setList).toHaveBeenCalledWith([[''], ['']]);
});

it('emits changes for deleting rows', () => {
  const list: string[][] = [[''], ['']];
  const setList = jest.fn();

  render(<Table list={list} setList={setList} />);
  act(() => {
    fireEvent.click(screen.getByTestId('deleteRowButton-1'));
  });

  expect(setList).toHaveBeenCalledWith([['']]);
});

it('emits changes for changing cell values', () => {
  const list: string[][] = [['']];
  const setList = jest.fn();

  render(<Table list={list} setList={setList} />);
  act(() => {
    fireEvent.change(screen.getByTestId('cellInput-0-0'), { target: { value: 'new value' } });
  });

  expect(setList).toHaveBeenCalledWith([['new value']]);
});