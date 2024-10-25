import { Link} from "react-router-dom";

interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
  url:string
}

interface PhotosProps {
  photo: Photo;
}

const PhotoCard: React.FC<PhotosProps> = ({ photo }) => {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
      <Link to={`/edit-photo/${photo.id}`} className="block">
        <img 
          src={photo.thumbnailUrl} 
          alt={photo.title} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-800 mb-2 truncate">
            {photo.title}
          </h3>
        </div>
      </Link>
    </div>
  );
}

export default PhotoCard