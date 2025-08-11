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
    <div>
      {reports.map((report) => (
        <div key={report._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold text-lg">{report.title}</h2>
          <p className="mb-2">{report.description}</p>
          <p className="text-sm text-gray-500">
            Deadline:{' '}
            {report.deadline
              ? new Date(report.deadline).toLocaleDateString()
              : 'No deadline set'}
          </p>

          <p className="text-sm text-gray-700 font-semibold mt-2">
            Address: {report.address || 'No address provided'}
          </p>

          {/* Status dropdown */}
          <div className="mt-2">
            <label className="mr-2 font-semibold">Status:</label>
            <select
              value={report.status || 'Pending'}
              onChange={(e) => handleStatusChange(report._id, e.target.value)}
              className="border p-1 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setEditingReport(report)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(report._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
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
