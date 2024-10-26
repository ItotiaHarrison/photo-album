const LandingPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-gray-800 p-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-800">
          Welcome to Your Photo Album
        </h1>
        <p className="text-xl mb-8 leading-relaxed">
          Our photo album application allows you to easily upload, organize, and share your precious memories. 
          Create beautiful collections, add descriptions, and relive your favorite moments anytime, anywhere.
        </p>
        <a 
          href="/login" 
          role="button"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg 
                     transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Get Started
        </a>
      </div>
    </main>
  )
}

export default LandingPage