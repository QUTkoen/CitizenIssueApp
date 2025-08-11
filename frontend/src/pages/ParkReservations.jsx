import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import ParkReservationForm from '../components/ParkReservationForm';
import ParkReservationList from '../components/ParkReservationList';

const ParkReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedPark, setSelectedPark] = useState('Central Park');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axiosInstance.get('/api/park-reservations');
        setReservations(res.data);
      } catch {
        alert('Failed to load reservations.');
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Park selector to filter reservations */}
      <div className="mb-6">
        <label className="font-semibold mr-4">Filter by Park:</label>
        <select
          value={selectedPark}
          onChange={(e) => setSelectedPark(e.target.value)}
          className="p-2 border rounded"
        >
          {[
            'Central Park',
            'Lakeside Park',
            'Sunnyvale Park',
            'Riverside Park',
            'Maple Grove',
            'Willow Woods',
            'Pine Hill',
            'Meadow View',
            'Cedar Grove',
            'Oak Ridge',
          ].map((park) => (
            <option key={park} value={park}>
              {park}
            </option>
          ))}
        </select>
      </div>

      {/* Only one form, with selectedPark prop */}
      <ParkReservationForm
        reservations={reservations}
        setReservations={setReservations}
        selectedPark={selectedPark}
      />

      {/* Your list component (make sure it filters based on selectedPark) */}
      <ParkReservationList
        reservations={reservations}
        setReservations={setReservations}
        selectedPark={selectedPark}
      />
    </div>
  );
};

export default ParkReservations;
