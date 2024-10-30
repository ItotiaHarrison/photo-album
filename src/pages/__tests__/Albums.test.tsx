import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Albums from '../Albums';
import { getUserAlbums } from '../../services/api';
import { AxiosResponse } from 'axios';

jest.mock('../../services/api');  
const mockedGetUserAlbums = getUserAlbums as jest.MockedFunction<typeof getUserAlbums>;

const mockAlbums = [
  { id: 1, title: 'Album 1' },
  { id: 2, title: 'Album 2' },
  { id: 3, title: 'Album 3' },
  { id: 4, title: 'Album 4' },
  { id: 5, title: 'Album 5' },
  { id: 6, title: 'Album 6' },
  { id: 7, title: 'Album 7' },
  { id: 8, title: 'Album 8' },
  { id: 9, title: 'Album 9' },
];


const createAxiosResponse = <T,>(data: T): AxiosResponse<T> => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any
  });

describe('Albums Component', () => {
  const renderAlbums = (userId: string = '1') => {
    render(
      <MemoryRouter initialEntries={[`/users/${userId}/albums`]}>
        <Routes>
          <Route path="/users/:id/albums" element={<Albums />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading state initially', () => {
    renderAlbums();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays albums when data is loaded successfully', async () => {
    mockedGetUserAlbums.mockResolvedValueOnce(createAxiosResponse(mockAlbums));
    
    renderAlbums();

    await waitFor(() => {
      expect(screen.getByText("User 1's Albums")).toBeInTheDocument();
    });


    expect(screen.getByText('Album 1')).toBeInTheDocument();
    expect(screen.getByText('Album 8')).toBeInTheDocument();
  });

  test('displays error message when no albums are found', async () => {
    mockedGetUserAlbums.mockResolvedValueOnce(createAxiosResponse([]));
    
    renderAlbums();

    await waitFor(() => {
      expect(screen.getByText('No Albums found for this user')).toBeInTheDocument();
    });
  });

  test('handles pagination correctly', async () => {
    mockedGetUserAlbums.mockResolvedValueOnce(createAxiosResponse(mockAlbums));
    
    renderAlbums();

    await waitFor(() => {
      expect(screen.getByText("User 1's Albums")).toBeInTheDocument();
    });

    // Check first page
    expect(screen.getByText('Album 1')).toBeInTheDocument();
    expect(screen.getByText('Album 8')).toBeInTheDocument();
    
    // Click second page
    fireEvent.click(screen.getByText('2'));

    // Check second page
    expect(screen.getByText('Album 9')).toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockedGetUserAlbums.mockRejectedValueOnce(new Error('API Error'));
    
    renderAlbums();

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching albums:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });

  test('makes API call with correct user ID', async () => {
    mockedGetUserAlbums.mockResolvedValueOnce(createAxiosResponse(mockAlbums));
    
    renderAlbums('5');

    await waitFor(() => {
      expect(mockedGetUserAlbums).toHaveBeenCalledWith(5);
    });
  });
});
