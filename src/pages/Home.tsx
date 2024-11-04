import { useEffect, useState } from "react";
import { getAlbums, getUsers } from "../services/api";
import UsersCard from "../components/UsersCard";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Album {
  id: number;
  userId: number;
  title: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    const fetchUsersAndAlbums = async () => {
      try {
        setLoading(true);
        
        const [usersResponse, albumsResponse] = await Promise.all([
          getUsers(),
          getAlbums()
        ]);
        
        if (!usersResponse.data) {
          throw new Error('No user data received');
        }
        
        if (!albumsResponse.data) {
          throw new Error('No album data received');
        }
        
        setUsers(usersResponse.data);
        setAlbums(albumsResponse.data);
        setError(null);

      } catch (error) {
        console.log('error is ', error)
        setError("There are no users");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndAlbums();
  }, []);

  const getAlbumCountForUser = (userId: number): number => {
    return albums.filter((album) => album.userId === userId).length;
  };

  if (loading)
    return (
      <p className="text-center text-xl text-gray-600 mt-12">Loading...</p>
    );
  if (error) {
    return <p className="text-center text-xl text-gray-600 mt-12">{error}</p>;
  }
  if (!users.length)
    return (
      <p className="text-center text-xl text-gray-600 mt-12">
        There are no users
      </p>
    );


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 sm:text-4xl">
        Users
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentUsers.map((user) => (
          <UsersCard
            key={user.id}
            user={user}
            albumCount={getAlbumCountForUser(user.id)}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
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

export default Home;
