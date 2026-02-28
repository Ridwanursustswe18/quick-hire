import { FiEye, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const JobsTable = ({ jobs, setDeleteConfirm,loading }) => {
    const navigate = useNavigate();
    return(
        <div className="bg-white border border-[#D6DDEB]">
              <div className="p-6 border-b border-[#D6DDEB]">
                <h2 className="font-clash-display font-semibold text-[20px] text-[#25324B]">
                  All Job Listings
                </h2>
              </div>
    
              {loading ? (
                <div className="p-12 text-center">
                  <div className="w-10 h-10 border-4 border-[#4640DE] border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              ) : jobs.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-5xl mb-4">📋</div>
                  <h3 className="font-clash-display font-semibold text-[20px] text-[#25324B] mb-2">No jobs posted yet</h3>
                  <p className="font-epilogue text-[#7C8493] mb-6">Get started by posting your first job.</p>
                  <button onClick={() => setShowForm(true)} className="py-3 px-6 bg-[#4640DE] text-white font-epilogue font-bold hover:bg-[#3730c4] transition-colors">
                    Post First Job
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#D6DDEB]">
                        {["Job Title", "Company", "Location", "Category", "Type", "Posted", "Actions"].map(h => (
                          <th key={h} className="px-6 py-4 text-left font-epilogue font-semibold text-[14px] text-[#7C8493]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job, idx) => (
                        <tr key={job.id} className={`border-b border-[#D6DDEB] hover:bg-[#F8F8FD] transition-colors ${idx === jobs.length - 1 ? "border-0" : ""}`}>
                          <td className="px-6 py-4">
                            <span className="font-epilogue font-semibold text-[15px] text-[#25324B]">{job.title}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-epilogue text-[15px] text-[#515B6F]">{job.company}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-epilogue text-[14px] text-[#7C8493]">{job.location || "—"}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-epilogue text-[13px] font-semibold px-3 py-1 bg-[#4640DE15] text-[#4640DE]">
                              {job.category || "—"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-epilogue text-[13px] text-[#515B6F]">
                              {job.employmentType?.replace("_", " ") || "Full Time"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-epilogue text-[13px] text-[#7C8493]">
                              {new Date(job.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => navigate(`/jobs/${job.id}`)}
                                className="p-2 text-[#7C8493] hover:text-[#4640DE] hover:bg-[#4640DE10] transition-colors"
                                title="View"
                              >
                                <FiEye size={16} />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(job)}
                                className="p-2 text-[#7C8493] hover:text-red-500 hover:bg-red-50 transition-colors"
                                title="Delete"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
        );
}
export default JobsTable;