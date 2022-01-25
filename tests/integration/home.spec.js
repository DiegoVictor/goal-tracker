import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import faker from 'faker';
import { SHA3 } from 'crypto-js';
import { useNavigate } from 'react-router-dom';

import Home from '../../src/screens/home';

jest.mock('react-router-dom');

describe('Home', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should be able to log in', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { getByTestId } = render(<Home />);

    const emailField = getByTestId('email');

    const email = faker.internet.email().toLowerCase();
    fireEvent.change(emailField, {
      target: { value: email },
    });

    const submitButton = getByTestId('submit');
    await act(async () => {
      fireEvent.click(submitButton);
    });

    const key = SHA3(email).toString();

    expect(localStorage).toHaveProperty('current_session', key);
    expect(navigate).toHaveBeenCalledWith('/dashboard', {
      state: {
        key,
      },
    });
  });

  it('should not be able to log in with invalid email', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { getByTestId, getByText } = render(<Home />);

    const emailField = getByTestId('email');

    const email = 'invalid-email';
    fireEvent.change(emailField, {
      target: { value: email },
    });

    const submitButton = getByTestId('submit');
    await act(async () => {
      fireEvent.click(submitButton);
    });

    const error = getByText('Must be a valid email');

    expect(localStorage).not.toHaveProperty('current_session');
    expect(error).toBeInTheDocument();
  });

  it('should be redirected to dashboard when already logged in', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const email = faker.internet.email().toLowerCase();
    const key = SHA3(email).toString();

    localStorage.setItem('current_session', key);

    render(<Home />);

    expect(navigate).toHaveBeenCalledWith('/dashboard', {
      state: {
        key,
      },
    });
  });
});
