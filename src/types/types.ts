export interface User {
    id: number
    name: String;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
}

export interface Album {
    userId: number;
    id: number;
    title: string;
}

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
}

