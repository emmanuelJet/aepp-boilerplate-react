import { render, screen } from '@testing-library/react';
import App from './App';

test('renders awesome æternity link', () => {
  render(<App />);
  const linkElement = screen.getByText(/awesome æternity/i);
  expect(linkElement).toBeInTheDocument();
});
