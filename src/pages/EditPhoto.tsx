import { useParams } from "react-router-dom";
import { getPhoto, updatePhotoTitle } from "../services/api";
import { useEffect, useState } from "react";

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const EditPhoto = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true);

 
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        if (!id) return;
        const photoResponse = await getPhoto(parseInt(id));
        setPhoto(photoResponse.data);
        setNewTitle(photoResponse.data.title);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photo:", error);
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  
  const handleTitleUpdate = async () => {
    if (!photo || !id) return;

    try {
      const updatedPhoto = await updatePhotoTitle(parseInt(id), newTitle);
      setPhoto(updatedPhoto.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl text-gray-600">Loading...</p>
    </div>
  );

  if (!photo) return (
    <div className="text-center py-10">
      <p className="text-xl text-gray-600">Photo not found</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Photo {id}
      </h2>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={photo.url}
          alt={photo.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          {editing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Edit photo title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleTitleUpdate}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">{photo.title}</h3>
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Edit Title
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPhoto;
