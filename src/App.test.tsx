import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders learn react link', async () => {
  render(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );
  const linkElement = await screen.findByText('Add Todo');
  const inputField = screen.getByPlaceholderText(/enter new todo/i);

  fireEvent.change(inputField, { target: {value: 'my task'}});
  fireEvent.blur(inputField);

  await waitFor(() => {
    fireEvent.click(linkElement);
    const newTodo =  screen.getByText(/my task/i);
    expect(linkElement).toBeInTheDocument();
    expect(newTodo).toBeInTheDocument();
  })

});
