import React from 'react';
import { render } from '@testing-library/react';
import Card from '../components/Card';

// create mock of parameters (dramaID, userID)
const drama = { id: 1 };
const user = 1;

// test if the watchlist icon changed from FAHeart to FaRegHeart and vice versa
test('Card component should render watchlist icon correctly', () => {
  const { container, rerender } = render(<Card drama={drama} user={user} />);
  const heartIcon = container.querySelector('svg');
  expect(heartIcon).toBeInTheDocument();
  expect(heartIcon).toHaveClass('fa-heart');

  rerender(<Card drama={drama} user={null} />);
  expect(heartIcon).toHaveClass('fa-heart-o');
});