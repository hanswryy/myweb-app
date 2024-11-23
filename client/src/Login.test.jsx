// jest for handleSubmit in Login.jsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from './Login';

test('handleSubmit', async () => {
    render(
        <Router>
            <Login />
        </Router>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    userEvent.type(usernameInput, 'user');
    userEvent.type(passwordInput, 'userpass');
    userEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('Watchlist')).toBeInTheDocument();
    });
});