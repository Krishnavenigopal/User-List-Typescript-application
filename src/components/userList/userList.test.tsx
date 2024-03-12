/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {UserList} from './userList';
import '@testing-library/jest-dom'
import fireEvent from '@testing-library/user-event'
import { BASE_URL } from '../../api/service'


beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => [
            {
                id: 1,
                name: 'Gita prabha',
                address: {
                    street: 'Suite 270',
                    suite: 'House 27',
                    city: 'Willington DC',
                    zipcode: '123987',
                },
            },
            {
                id: 2,
                name: 'Raji deepa',
                address: {
                    street: 'Suite 145',
                    suite: 'House 56',
                    city: 'Old morocco',
                    zipcode: '565656',
                },
            },
        ],
    });
});

test('renders users list with address', async () => {
    render(<UserList/>);
    const user1 = await screen.findByText('Gita prabha');
    const user2 = await screen.findByText('Raji deepa');

    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
});

describe('calls the user api on load', () => {
    beforeEach(() => {
        global.fetch = jest.fn()
    });

    it('calls the API on load', () => {
        render(<UserList/>);

        expect(fetch).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users`)
    })
})

describe('Calls the album and phots api on clicking more user details', () => {
    beforeEach(() => {
        global.fetch = jest.fn()
    });

    it('calls the Album and Photo API on clicking the header of user name', () => {
        render(<UserList/>);

        const element = screen.queryByTestId("user-list")!;
        if(element){
            fireEvent.click(element)
            expect(fetch).toHaveBeenCalled();
            expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/albums`)
            expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/photos`)
        }
        
    })

    it('Displays the Album and Photo headings', () => {
        render(<UserList/>);

        const element = screen.queryByTestId("user-list")!;
        if(element){
            fireEvent.click(element)
            expect(`'s Albums`).toBeInTheDocument()
            expect('Photos').toBeInTheDocument()
        }
        
    })
})