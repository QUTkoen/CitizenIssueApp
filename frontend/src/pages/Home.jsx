const Home = () => {
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Citizen Issue Reporter</h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
        Report potholes, broken street lights, and other civic issues quickly and easily.
        Add a description and help improve your community.
      </p>
      <img
        src="/brisbane pic.png"
        alt="City logo"
        className="mx-auto max-w-full h-auto rounded shadow-lg"
      />
    </div>
  );
};

export default Home;
