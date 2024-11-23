// build a jest test for auth and unauth users
import {render, screen, waitFor} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import LandingPage from './LandingPage';

// moch the jwtDecode function
// jest.mock('jwt-decode', () => jest.fn(
//     () => ({ id: 2, role: 1 })
// ));

// test('renders LandingPage for unauthenticated user', async () => {
//     render(
//         <Router>
//             <LandingPage />
//         </Router>
//     );
//     await waitFor(() => {
//         expect(screen.getByText('Login')).toBeInTheDocument();
//     });
// });

// test('renders LandingPage for authenticated user with role 1', async () => {
//     localStorage.setItem('token', 'mockToken');
//     render(
//         <Router>
//             <LandingPage />
//         </Router>
//     );
//     await waitFor(() => {
//         expect(screen.getByText('Watchlist')).toBeInTheDocument();
//     });
//     localStorage.removeItem('token');
// });
