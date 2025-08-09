const Home = () => {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Citizen Issue Reporter</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
          Report potholes, broken street lights, and other civic issues quickly and easily.
          Tag the location on the map, add a description, and help improve your community.
        </p>
        <img
          src="./public/brisbane pic.jpg"
          alt="city logo"
          className="mx-auto max-w-full h-auto rounded shadow"
        />
      </div>
    );
  };
  export default Home;