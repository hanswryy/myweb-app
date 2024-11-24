// build a jest test for auth and unauth users
import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import LandingPage from './LandingPage';

// Mock jwtDecode
jest.mock('jwt-decode', () => ({
    jwtDecode: jest.fn(),
}));

global.fetch = jest.fn();

// const mockedNavigate = jest.fn();

// beforeEach(() => {
//   jest.clearAllMocks();
//   localStorage.clear();
//   require('react-router-dom').useNavigate.mockReturnValue(mockedNavigate);
// });

describe('LandingPage Auth tests', () => {
    afterEach(() => {
      localStorage.clear();
      jest.clearAllMocks();
    });

    test('renders LandingPage for unauthenticated user', async () => {
        render(
            <Router>
                <LandingPage />
            </Router>
        );
        await waitFor(() => {
            expect(screen.getByText('Login')).toBeInTheDocument();
            expect(screen.getByText('Register')).toBeInTheDocument();
        });
    });

    test('renders LandingPage for authenticated user with role 1 (user)', async () => {
        // Mock localStorage and jwtDecode
        const mockToken = 'mockToken';
        localStorage.setItem('token', mockToken);
        jwtDecode.mockReturnValue({ role: 1 });
    
        render(
          <Router>
            <LandingPage />
          </Router>
        );
    
        // Ensure jwtDecode was called with the correct token
        expect(jwtDecode).toHaveBeenCalledWith(mockToken);
    
        // Check that authenticated UI is displayed
        await waitFor(() => {
            expect(screen.getByText('Watchlist')).toBeInTheDocument();
        });
    });

    test('renders LandingPage for authenticated user with role 0 (admin)', async () => {
        // Mock localStorage and jwtDecode
        const mockToken = 'mockToken';
        localStorage.setItem('token', mockToken);
        jwtDecode.mockReturnValue({ role: 0 });
    
        render(
          <Router>
            <LandingPage />
          </Router>
        );
    
        // Ensure jwtDecode was called with the correct token
        expect(jwtDecode).toHaveBeenCalledWith(mockToken);
    
        // Check that authenticated UI is displayed
        await waitFor(() => {
            expect(screen.getByText('CMS')).toBeInTheDocument();
        });
    });
});

describe('LandingPage func test', () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) => {
        if (url.includes('/dramas')) {
          const params = new URLSearchParams(url.split('?')[1]);
          const title = params.get('title');
          const year = params.get('year');
          const genre = params.get('genre');
          const searchTerm = params.get('searchTerm');
  
          let dramas = [
            { id: 1, title: 'Drama 1', year: '2021', genre: 'BS' },
            { id: 2, title: 'Drama 2', year: '2020', genre: 'Comedy' },
          ];

          if (title) {
            dramas = dramas.filter(drama => drama.title.includes(title));
          }
  
          if (year) {
            dramas = dramas.filter(drama => drama.year === year);
          }
  
          if (genre) {
            dramas = dramas.filter(drama => drama.genre === genre);
          }
  
          if (searchTerm) {
            dramas = dramas.filter(drama => drama.title.includes(searchTerm));
          }
  
          return Promise.resolve({
            ok: true,
            json: async () => ({
              dramas,
              total: dramas.length,
            }),
          });
        } else if (url.includes('/years')) {
            console.log('years');
          return Promise.resolve({
            ok: true,
            // return a list of years without key years
            json: async () => ['2021', '2020'],
          });
        } else if (url.includes('/genres')) {
          return Promise.resolve({
            ok: true,
            json: async () => ['Action', 'Comedy'],
          });
        }
        return Promise.resolve({
          ok: false,
          json: async () => ({ error: 'Not Found' }),
        });
      });
    });
  
    test('dramas fetched', async () => {
        render(
            <Router>
            <LandingPage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('Drama 1')).toBeInTheDocument();
            expect(screen.getByText('Drama 2')).toBeInTheDocument();
        });

    });

    test('search drama', async () => {
        render(
            <Router>
                <LandingPage />
            </Router>
        );

        const searchInput = screen.getByPlaceholderText('Search Drama');
        fireEvent.change(searchInput, { target: { value: 'Drama 1' } });

        await waitFor(() => {
            expect(screen.getByText('Drama 1')).toBeInTheDocument();
            expect(screen.queryByText('Drama 2')).not.toBeInTheDocument();
        });
    });
});