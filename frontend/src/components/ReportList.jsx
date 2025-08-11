import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ReportList = ({ reports, setReports, setEditingReport }) => {
  const { user } = useAuth();

  const handleDelete = async (reportId) => {
    try {
      await axiosInstance.delete(`/api/tasks/${reportId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setReports(reports.filter((report) => report._id !== reportId));
    } catch (error) {
      alert('Failed to delete report.');
    }
  };

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      const res = await axiosInstance.put(
        `/api/tasks/${reportId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setReports(reports.map((r) => (r._id === reportId ? res.data : r)));
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      {reports.map((report) => (
        <div
          key={report._id}
          className="bg-white p-6 mb-6 rounded-lg shadow-md border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-blue-700 mb-2">{report.title}</h2>
          <p className="text-gray-700 mb-3 whitespace-pre-line">{report.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-semibold">Deadline:</span>{' '}
            {report.deadline
              ? new Date(report.deadline).toLocaleDateString()
              : 'No deadline set'}
          </p>

          <div className="mb-4">
            <label htmlFor={`status-${report._id}`} className="block font-semibold mb-1">
              Status:
            </label>
            <select
              id={`status-${report._id}`}
              value={report.status || 'Pending'}
              onChange={(e) => handleStatusChange(report._id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setEditingReport(report)}
              className="bg-yellow-500 hover:bg-yellow-600 transition text-white font-semibold px-5 py-2 rounded-lg shadow"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(report._id)}
              className="bg-red-500 hover:bg-red-600 transition text-white font-semibold px-5 py-2 rounded-lg shadow"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportList;
