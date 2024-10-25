import { Link } from "react-router-dom";

interface Album {
  id: number;
  title: string;
}

interface AlbumsProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumsProps> = ({ album }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
      <Link to={`/photos/${album.id}`} className="block">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
            {album.title}
          </h3>
          <div className="bg-gray-200 h-32 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Album Cover</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AlbumCard;
