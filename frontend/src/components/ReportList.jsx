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
    <div className="max-w-xl mx-auto">
      {reports.map((report) => (
        <div
          key={report._id}
          className="bg-gray-100 p-6 mb-6 rounded shadow-md border border-gray-300"
        >
          <h2 className="font-bold text-xl mb-2">{report.title}</h2>
          <p className="mb-3 whitespace-pre-wrap">{report.description}</p>
          <p className="text-sm text-gray-500 mb-1">
            Deadline:{' '}
            {report.deadline
              ? new Date(report.deadline).toLocaleDateString()
              : 'No deadline set'}
          </p>
          <p className="text-sm text-gray-700 font-semibold mb-3">
            Address: {report.address || 'No address provided'}
          </p>

          <div className="mb-4">
            <label className="mr-2 font-semibold">Status:</label>
            <select
              value={report.status || 'Pending'}
              onChange={(e) => handleStatusChange(report._id, e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <button
              onClick={() => setEditingReport(report)}
              className="mr-3 bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(report._id)}
              className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
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
