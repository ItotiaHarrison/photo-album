import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = () => axios.get(`${BASE_URL}/users`);
export const getAlbums = () => axios.get(`${BASE_URL}/albums`);
export const getUserAlbums = (userId: number) => axios.get(`${BASE_URL}/albums?userId=${userId}`);
export const getAlbumPhotos = (albumId: number) => axios.get(`${BASE_URL}/photos?albumId=${albumId}`);
export const getPhoto = (photoId: number) => axios.get(`${BASE_URL}/photos/${photoId}`);
