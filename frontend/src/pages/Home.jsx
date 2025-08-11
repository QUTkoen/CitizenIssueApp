const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-700 to-green-900 text-yellow-50 flex flex-col">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/brisbane pic.png')" }}
        aria-hidden="true"
      ></div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col justify-center items-center flex-grow p-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to Citizen Issue Reporter
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Quickly report potholes, broken street lights, graffiti, or other civic issues like reserving a place in the park.
          Help improve your community by adding detailed descriptions and locations.
        </p>
        <a
          href="/login"
          className="inline-block bg-yellow-400 text-green-900 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors duration-300"
        >
          Report an Issue Now
        </a>
      </div>

      {/* Footer */}
      <footer className="text-center p-4 bg-green-800 text-yellow-200 text-sm">
        &copy; {new Date().getFullYear()} Citizen Issue Reporter. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
