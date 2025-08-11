import axiosInstance from '../axiosConfig';

const ParkReservationList = ({ reservations, setReservations, selectedPark }) => {
  const filteredReservations = reservations.filter((r) => r.park === selectedPark);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/park-reservations/${id}`);
      setReservations(reservations.filter((r) => r._id !== id));
    } catch {
      alert('Failed to delete reservation.');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Reservations for {selectedPark}</h2>
      {filteredReservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        filteredReservations.map((r) => (
          <div
            key={r._id}
            className="p-4 mb-4 bg-gray-100 rounded shadow border border-gray-300"
          >
            <p><strong>Date:</strong> {r.date}</p>
            <p><strong>Reason(s):</strong> {r.reasons.join(', ')}</p>
            <button
              onClick={() => handleDelete(r._id)}
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ParkReservationList;
