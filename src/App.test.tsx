/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BASE_URL } from './api/service'

beforeEach(() => {
  global.fetch = jest.fn();
});

test('renders App with user list', () => {
  render(<App />);
  expect(fetch).toHaveBeenCalled();
  expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users`)
});
