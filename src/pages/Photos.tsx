import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbumPhotos } from "../services/api";
import PhotoCard from "../components/PhotoCard";

//photo's data structure
interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Photos = () => {
  const { id } = useParams<{ id: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 8;

  //fetch photos for the current album
  useEffect(() => {
    const fetchAlbumPhotos = async () => {
      try {
        if (!id) return;
        const photoResponse = await getAlbumPhotos(parseInt(id));
        if (photoResponse && photoResponse.data) {
          setPhotos(photoResponse.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching album photos:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumPhotos();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );

  if (!photos.length)
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">No photos found in this album</p>
      </div>
    );
// calculate pagination
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Photos in Album {id}
      </h2>
      <div className="flex flex-wrap -mx-2">
        {currentPhotos.map((photo) => (
          <div
            key={photo.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
          >
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {Array.from({ length: Math.ceil(photos.length / photosPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === index + 1
                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </nav>
      </div>
    </div>
  );
};

export default Photos;
