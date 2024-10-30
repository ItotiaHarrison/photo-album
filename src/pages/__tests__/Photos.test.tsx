import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Photos from '../Photos';
import { getAlbumPhotos } from '../../services/api';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}


jest.mock('../../services/api');
const mockedGetAlbumPhotos = getAlbumPhotos as jest.MockedFunction<typeof getAlbumPhotos>;

describe('Photos Component', () => {
  const renderPhotos = async (albumId: string = '1') => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/albums/${albumId}/photos`]}>
          <Routes>
            <Route path="/albums/:id/photos" element={<Photos />} />
          </Routes>
        </MemoryRouter>
      );
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading state initially', async () => {
    
    mockedGetAlbumPhotos.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    await act(async () => {
      renderPhotos();
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays photos when data is loaded successfully', async () => {
    const mockPhotos = [
      {
        id: 1,
        title: 'Photo 1',
        url: 'https://example.com/photo1.jpg',
        thumbnailUrl: 'https://example.com/thumb1.jpg'
      }
    ];

    mockedGetAlbumPhotos.mockResolvedValueOnce({
      data: mockPhotos,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as AxiosRequestConfig
    } as AxiosResponse<Photo[]>);

    await act(async () => {
      await renderPhotos();
    });

    await waitFor(() => {
      expect(screen.getByText('Photos in Album 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Photo 1')).toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockedGetAlbumPhotos.mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      await renderPhotos();
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching album photos:',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  test('makes API call with correct album ID', async () => {
    mockedGetAlbumPhotos.mockResolvedValueOnce({
      data: [],
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as AxiosRequestConfig
    } as AxiosResponse<Photo[]>);

    await act(async () => {
      await renderPhotos('5');
    });

    await waitFor(() => {
      expect(mockedGetAlbumPhotos).toHaveBeenCalledWith(5);
    });
  });

  test('renders correct number of photos per page', async () => {
    const mockPhotos = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      title: `Photo ${i + 1}`,
      url: `https://example.com/photo${i + 1}.jpg`,
      thumbnailUrl: `https://example.com/thumb${i + 1}.jpg`
    }));

    mockedGetAlbumPhotos.mockResolvedValueOnce({
      data: mockPhotos,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as AxiosRequestConfig
    } as AxiosResponse<Photo[]>);

    await act(async () => {
      await renderPhotos();
    });

    await waitFor(() => {
      const photoElements = screen.getAllByRole('img');
      expect(photoElements.length).toBe(8);
    });
  });
});
