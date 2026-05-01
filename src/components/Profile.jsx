import { useProfile } from "../hooks/useProfile";

function Profile({ userId }) {
  const { data, isLoading, isError } = useProfile(userId);

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error</p>;

  const profile = data?.data?.result;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">Seller Profile</h3>

      <p>
        <b>Name:</b> {profile?.name}
      </p>
      <p>
        <b>Email:</b> {profile?.email}
      </p>

      <h4 className="mt-4 font-medium">Products</h4>

      <div className="grid grid-cols-2 gap-4 mt-2">
        {profile?.products?.map((p) => (
          <div key={p.id} className="border p-2 rounded">
            {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
