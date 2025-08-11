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
  });

  useEffect(() => {
    if (editingReport) {
      setFormData({
        title: editingReport.title,
        description: editingReport.description,
        deadline: editingReport.deadline
          ? new Date(editingReport.deadline).toISOString().split('T')[0]
          : '',
        status: editingReport.status || 'Pending',
      });
    } else {
      setFormData({ title: '', description: '', deadline: '', status: 'Pending' });
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
      setFormData({ title: '', description: '', deadline: '', status: 'Pending' });
    } catch (error) {
      alert('Failed to save report.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 shadow-lg rounded-lg max-w-lg mx-auto mb-6"
    >
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
        {editingReport ? 'Edit Report' : 'Add Report'}
      </h1>

      <div className="mb-5">
        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="deadline" className="block text-gray-700 font-semibold mb-2">
          Deadline
        </label>
        <input
          id="deadline"
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">
          Status
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 hover:from-yellow-500 hover:via-green-500 hover:to-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300"
      >
        {editingReport ? 'Update Report' : 'Add Report'}
      </button>
    </form>
  );
};

export default ReportForm;
