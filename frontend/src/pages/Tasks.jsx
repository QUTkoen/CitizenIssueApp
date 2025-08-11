import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import ReportForm from '../components/ReportForm';
import ReportList from '../components/ReportList';
import { useAuth } from '../context/AuthContext';

const Reports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [editingReport, setEditingReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/tasks', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setReports(response.data);
      } catch {
        alert('Failed to fetch reports.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReports();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center mt-20">Loading reports...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <ReportForm
        reports={reports}
        setReports={setReports}
        editingReport={editingReport}
        setEditingReport={setEditingReport}
      />
      <ReportList
        reports={reports}
        setReports={setReports}
        setEditingReport={setEditingReport}
      />
    </div>
  );
};

export default Reports;
