import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ReportForm = ({ reports, setReports, editingReport, setEditingReport }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    status: 'Pending',
    address: '',
  });

  useEffect(() => {
    if (editingReport) {
      setFormData({
        title: editingReport.title || '',
        description: editingReport.description || '',
        deadline: editingReport.deadline
          ? new Date(editingReport.deadline).toISOString().split('T')[0]
          : '',
        status: editingReport.status || 'Pending',
        address: editingReport.address || '',
      });
    } else {
      setFormData({ title: '', description: '', deadline: '', status: 'Pending', address: '' });
    }
  }, [editingReport]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReport) {
        const response = await axiosInstance.put(
          `/api/tasks/${editingReport._id}`,
          formData,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setReports(reports.map((report) =>
          report._id === response.data._id ? response.data : report
        ));
      } else {
        const response = await axiosInstance.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setReports([...reports, response.data]);
      }
      setEditingReport(null);
      setFormData({ title: '', description: '', deadline: '', status: 'Pending', address: '' });
    } catch (error) {
      alert('Failed to save report.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{editingReport ? 'Edit Report' : 'Add Report'}</h1>

      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-3 border rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        className="w-full mb-6 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition-colors duration-300"
      >
        {editingReport ? 'Update Report' : 'Add Report'}
      </button>
    </form>
  );
};

export default ReportForm;
