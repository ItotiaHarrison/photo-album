import { Link } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
  }

  interface UserProps{
    user: User;
    albumCount: number;
  }

const UsersCard: React.FC<UserProps> =({user, albumCount}) => {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
      <Link to={`/albums/${user.id}`} className="block p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
        <p className="text-gray-600 mb-1">@{user.username}</p>
        <p className="text-gray-600 mb-4">{user.email}</p>
        <p className="text-blue-600 font-medium">
          {albumCount} {albumCount === 1 ? 'album' : 'albums'}
        </p>
      </Link>
    </div>
  )
}

export default UsersCard