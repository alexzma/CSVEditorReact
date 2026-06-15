import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

const testFile = new File(['column0,column1\nvalue0,value1'], 'test.csv', { type: 'text/csv' });

it('renders', () => {
  render(<App />);
  expect(screen.getByTestId('app')).toBeInTheDocument();
  expect(screen.getByTestId('fileInput')).toBeInTheDocument();
  expect(screen.getByTestId('downloadButton')).toBeInTheDocument();
  expect(screen.getByTestId('table')).toBeInTheDocument();
});

it('uploads a file', async () => {
  render(<App />);
  await act(async () => {
    fireEvent.change(screen.getByTestId('fileInput'), {
      target: {
        files: [testFile],
      }
    })
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  expect(screen.getByTestId('cellInput-0-0')).toHaveValue('column0');
  expect(screen.getByTestId('cellInput-0-1')).toHaveValue('column1');
  expect(screen.getByTestId('cellInput-1-0')).toHaveValue('value0');
  expect(screen.getByTestId('cellInput-1-1')).toHaveValue('value1');
});

it('changes the number of rows and columns', async () => {
  render(<App />);

  await act(async () => {
    fireEvent.click(screen.getByTestId('addColumnButton'));
  });
  expect(screen.getByTestId('cellInput-0-0')).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(screen.getByTestId('addRowButton'));
  });
  expect(screen.getByTestId('cellInput-1-0')).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(screen.getByTestId('deleteRowButton-1'));
  })
  expect(screen.queryByTestId('cellInput-1-0')).toBeFalsy();

  await act(async () => {
    fireEvent.click(screen.getByTestId('deleteColumnButton-0'));
  });
  expect(screen.queryByTestId('cellInput-0-0')).toBeFalsy();
});

it('changes cell values', async () => {
  render(<App />);

  await act(async () => {
    fireEvent.click(screen.getByTestId('addColumnButton'));
  });

  expect(screen.getByTestId('cellInput-0-0')).toHaveValue('');

  await act(async () => {
    fireEvent.click(screen.getByTestId('addRowButton'));
  });

  expect(screen.getByTestId('cellInput-1-0')).toHaveValue('');

  await act(async () => {
    fireEvent.change(screen.getByTestId('cellInput-0-0'), { target: { value: 'Header' } });
    fireEvent.change(screen.getByTestId('cellInput-1-0'), { target: { value: 'Value' } });
  });

  expect(screen.getByTestId('cellInput-0-0')).toHaveValue('Header');
  expect(screen.getByTestId('cellInput-1-0')).toHaveValue('Value');
});

// TODO: Fix the mocking on the URL.createObjectURL so this test passes
xit('downloads a file', async () => {
  window.URL.createObjectURL = jest.fn();
  const createObjectURLSpy = jest.spyOn(URL, 'createObjectURL');

  render(<App />);
  await act(async () => {
    fireEvent.change(screen.getByTestId('fileInput'), {
      target: {
        files: [testFile],
      }
    })
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  fireEvent.change(screen.getByTestId('fileInput'), {
    target: {
      files: [testFile],
    }
  });
  fireEvent.click(screen.getByTestId('downloadButton'));

  expect(createObjectURLSpy).toHaveBeenCalledWith(expect.any(Blob));

  jest.restoreAllMocks();
});