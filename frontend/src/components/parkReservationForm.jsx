import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

const ParkReservationForm = ({ reservations, setReservations, selectedPark }) => {
  const [formData, setFormData] = useState({
    park: selectedPark,
    date: '',
    reasons: [],
  });
  const [loading, setLoading] = useState(false);

  // When selectedPark changes from parent, update formData.park // test
  useEffect(() => {
    setFormData((prev) => ({ ...prev, park: selectedPark }));
  }, [selectedPark]);

  const toggleReason = (reason) => {
    setFormData((prev) => {
      const reasons = prev.reasons.includes(reason)
        ? prev.reasons.filter((r) => r !== reason)
        : [...prev.reasons, reason];
      return { ...prev, reasons };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date) {
      alert('Please select a date.');
      return;
    }
    if (formData.reasons.length === 0) {
      alert('Please select at least one reason.');
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post('/api/park-reservations', formData);
      setReservations([...reservations, res.data]);
      setFormData((prev) => ({ ...prev, date: '', reasons: [] }));
    } catch (error) {
      alert('Failed to add reservation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-xl mx-auto mb-8">
      <h2 className="text-2xl font-bold mb-4">Make a Reservation for {selectedPark}</h2>

      {/* Park is fixed, no select */}
      <p className="mb-4 font-semibold">Park: {selectedPark}</p>

      <label className="block mb-4">
        Date:
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded mt-1"
          disabled={loading}
        />
      </label>

      <fieldset className="mb-4">
        <legend className="font-semibold mb-2">Reason(s):</legend>
        <label className="inline-flex items-center mr-6">
          <input
            type="checkbox"
            checked={formData.reasons.includes('Private event')}
            onChange={() => toggleReason('Private event')}
            disabled={loading}
            className="mr-2"
          />
          Private event
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={formData.reasons.includes('Public event')}
            onChange={() => toggleReason('Public event')}
            disabled={loading}
            className="mr-2"
          />
          Public event
        </label>
      </fieldset>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-700 text-yellow-300 px-5 py-2 rounded hover:bg-green-800 transition"
      >
        {loading ? 'Submitting...' : 'Reserve'}
      </button>
    </form>
  );
};

export default ParkReservationForm;
