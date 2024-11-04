import { useEffect, useState } from "react";
import { getUserAlbums } from "../services/api";
import { useParams } from "react-router-dom";
import AlbumCard from "../components/AlbumCard";

//album's data structure
interface Album {
  id: number;
  title: string;
}

const Albums = () => {
  const { id } = useParams<{ id: string }>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 8; 

  //fetch albums for current user
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        if (!id) return;
        const albumsResponse = await getUserAlbums(parseInt(id));
        if (albumsResponse && albumsResponse.data) {
          setAlbums(albumsResponse.data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching albums:", error);
        setLoading(false);
        setAlbums([]);
      }
    };

    fetchAlbums();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl text-gray-600">Loading...</p>
    </div>
  );

  if (!albums.length) return (
    <div className="text-center py-10">
      <p className="text-xl text-gray-600">No Albums found for this user</p>
    </div>
  );

  //calculate pagination
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        User {id}'s Albums
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {currentAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          {Array.from({ length: Math.ceil(albums.length / albumsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                currentPage === index + 1
                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Albums;
