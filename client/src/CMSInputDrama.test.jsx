import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import CMSInputDrama from './CMSInputDrama';

// Mock the `fetch` API
global.fetch = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('CMSInputDrama Component', () => {
  const mockedNavigate = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    require('react-router-dom').useNavigate.mockReturnValue(mockedNavigate);
  });

  test('submits the form and calls fetch with correct data', async () => {
    render(
      <Router>
        <CMSInputDrama />
      </Router>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Test Drama' },
    });
    fireEvent.change(screen.getByLabelText(/Synopsis/i), {
      target: { value: 'This is a test description.' },
    });
    fireEvent.click(screen.getByLabelText(/Action/i));
    // simulate dropdown for year and country
    fireEvent.change(screen.getByLabelText(/Year/i), {
      target: { value: '2022' },
    });
    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: '2' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Assert that fetch was called with the correct parameters
    await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/new_drama', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                title: 'Test Drama',
                alt_title: '',
                year: '2022',
                synopsis: 'This is a test description.',
                url_photo: '',
                country_id: '2',
                availability: '',
                genres: ['Action'],
                actors: [],
                actorsInput: '',
                trailer_link: '',
            }),
        });
    });

    // Assert that navigate was called to redirect to the CMS page
    expect(mockedNavigate).toHaveBeenCalledWith('/cms');
  });
});