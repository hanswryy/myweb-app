import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailPage from './DetailPage';

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders detail page with drama data and comments', async () => {
  // Mock API response for the drama details
  fetch.mockImplementation((url) => {
    if (url.includes('/detailDrama/1')) {
      return Promise.resolve({
        ok: true,
        json: async () => ({
            id: 1,
            title: 'Mock Drama Title',
            synopsis: 'Mock Description of the drama.',
            year: '2021',
            genres: ['Genre 1', 'Genre 2'],
            country_id: 1,
        }),
      });
    } else if (url.includes('/comment')) {
      return Promise.resolve({
        ok: true,
        json: async () =>  [
            {'id': 1, 'content': 'Great drama!', 'username': 'bujank', 'drama_id': 1},
            {'id': 2, 'content': 'I loved it!', 'username': 'user', 'drama_id': 1},
        ],
      });
    } else if (url.includes('/dramas')) {
        return Promise.resolve({
            ok: true,
            json: async () => ({
                id: 1, title: 'Mock Drama Title', synopsis: 'Mock Description of the drama.', year: '2021', genres: ['Genre 1', 'Genre 2'], country_id: 1 
            })
        });
    }
    return Promise.resolve({
      ok: false,
      json: async () => ({ error: 'Not Found' }),
    });
  });

  // Render only the DetailPage with mocked route params
  render(
    <MemoryRouter initialEntries={['/detailDrama/1']}>
      <Routes>
        <Route path="/detailDrama/:id" element={<DetailPage />} />
      </Routes>
    </MemoryRouter>
  );

  // Wait for the drama data to load and verify UI
  await waitFor(() => {
    expect(screen.getByText('Mock Drama Title')).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes('Mock Description of the drama.'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes('2021'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes('Genre 1, Genre 2'))).toBeInTheDocument();
});
  // Wait for the comments to load and verify UI
  await waitFor(() => {
    const comment1 = screen.getByText((content, element) => content.includes('Great drama!'));
    const comment1Parent = comment1.closest('div'); // Adjust the selector based on your component structure
    expect(comment1Parent).toHaveTextContent('bujank');

    const comment2 = screen.getByText((content, element) => content.includes('I loved it!'));
    const comment2Parent = comment2.closest('div'); // Adjust the selector based on your component structure
    expect(comment2Parent).toHaveTextContent('user');
  });
});