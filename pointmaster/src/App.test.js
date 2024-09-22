import { render, screen } from '@testing-library/react';
import App from './App';

test('renders PointMaster title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Revolutionize Your Sales Experience with PointMaster/i);
  expect(titleElement).toBeInTheDocument();
});

