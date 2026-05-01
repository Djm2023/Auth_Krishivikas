import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔹 Navbar */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* 🔹 Content */}
      <div className="p-6">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome, {user?.name}
          </h2>
          <p className="text-gray-600">Here is your profile overview</p>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">User Info</h3>

            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Email:</span> {user?.email}
            </p>

            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Mobile:</span> {user?.mobile}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Company:</span> {user?.company}
            </p>
          </div>

          {/* Placeholder Card (for future features) */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center">
            <p className="text-gray-400 text-sm">More features coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
