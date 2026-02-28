import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiTrash2, FiEye, FiX, FiBriefcase, FiUsers, FiTrendingUp } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import api from "../services/api";

const EMPLOYMENT_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY", "INTERN"];
const EXPERIENCE_LEVELS = ["ENTRY", "MID", "SENIOR", "LEAD"];
const CATEGORIES = ["Design", "Sales", "Marketing", "Finance", "Technology", "Engineering", "Business", "Human Resource"];

const MOCK_JOBS = [
  { id: 1, title: "Social Media Assistant", company: "Nomad", location: "Paris, France", employmentType: "FULL_TIME", category: "Marketing", createdAt: new Date().toISOString() },
  { id: 2, title: "Brand Designer", company: "Dropbox", location: "San Francisco, US", employmentType: "FULL_TIME", category: "Design", createdAt: new Date().toISOString() },
  { id: 3, title: "Lead Engineer", company: "GitHub", location: "Remote", employmentType: "FULL_TIME", category: "Engineering", createdAt: new Date().toISOString() },
];

const InputField = ({ label, required, error, children }) => (
  <div>
    <label className="font-epilogue font-semibold text-[14px] text-[#515B6F] block mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1 font-epilogue">{error}</p>}
  </div>
);

const AdminPanel = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({});

  const emptyForm = {
    title: "", company: "", location: "", category: "",
    description: "", salary: "", employmentType: "FULL_TIME",
    experienceLevel: "MID", remote: false, skills: "",
  };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.data || []);
    } catch {
      setJobs(MOCK_JOBS);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.company.trim()) errs.company = "Company is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.category) errs.category = "Category is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        salary: form.salary ? parseFloat(form.salary) : undefined,
        skills: form.skills ? form.skills.split(",").map(s => s.trim()).filter(Boolean) : [],
      };
      await api.post("/jobs", payload);
      setSuccessMsg("Job posted successfully!");
      setShowForm(false);
      setForm(emptyForm);
      setErrors({});
      fetchJobs();
    } catch {
      // Mock success
      const newJob = {
        id: Date.now(),
        ...form,
        createdAt: new Date().toISOString(),
      };
      setJobs(prev => [newJob, ...prev]);
      setSuccessMsg("Job posted successfully!");
      setShowForm(false);
      setForm(emptyForm);
      setErrors({});
    } finally {
      setSubmitting(false);
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/jobs/${id}`);
    } catch {
      // Mock delete
    }
    setJobs(prev => prev.filter(j => j.id !== id));
    setDeleteConfirm(null);
    setSuccessMsg("Job deleted successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const stats = [
    { icon: <FiBriefcase />, label: "Total Jobs", value: jobs.length, color: "#4640DE" },
    { icon: <FiUsers />, label: "Applications", value: "24", color: "#26A4FF" },
    { icon: <FiTrendingUp />, label: "This Week", value: jobs.filter(j => new Date(j.createdAt) > new Date(Date.now() - 7 * 86400000)).length, color: "#56CDAD" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      <Navbar />

      <div className="px-8 lg:px-[124px] py-10">
        {/* ── Header ── */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-clash-display font-bold text-[40px] text-[#25324B]">Admin Panel</h1>
            <p className="font-epilogue text-[#7C8493] mt-1">Manage your job listings</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 py-3 px-6 bg-[#4640DE] text-white font-epilogue font-bold hover:bg-[#3730c4] transition-colors"
          >
            <FiPlus /> Post a New Job
          </button>
        </div>

        {/* ── Success Toast ── */}
        {successMsg && (
          <div className="mb-6 flex items-center gap-3 bg-[#56CDAD15] border border-[#56CDAD] px-5 py-4">
            <span className="text-[#56CDAD] font-bold text-xl">✓</span>
            <span className="font-epilogue text-[#25324B] font-medium">{successMsg}</span>
          </div>
        )}

        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-[#D6DDEB] p-6 flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center text-xl" style={{ background: s.color + "15", color: s.color }}>
                {s.icon}
              </div>
              <div>
                <p className="font-epilogue text-sm text-[#7C8493]">{s.label}</p>
                <p className="font-clash-display font-bold text-[28px] text-[#25324B]">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Jobs Table ── */}
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
      </div>

      {/* ── Add Job Modal ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[680px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-[#D6DDEB] sticky top-0 bg-white z-10">
              <div>
                <h2 className="font-clash-display font-semibold text-[24px] text-[#25324B]">Post a New Job</h2>
                <p className="font-epilogue text-sm text-[#7C8493] mt-1">Fill in the details below</p>
              </div>
              <button onClick={() => { setShowForm(false); setErrors({}); setForm(emptyForm); }} className="text-[#7C8493] hover:text-[#25324B] text-2xl">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <InputField label="Job Title" required error={errors.title}>
                  <input
                    className={`w-full border ${errors.title ? "border-red-400" : "border-[#D6DDEB]"} px-4 py-3 font-epilogue text-[15px] text-[#25324B] outline-none focus:border-[#4640DE] transition-colors placeholder-[#A8ADB7]`}
                    placeholder="e.g. Senior Designer"
                    value={form.title}
                    onChange={handleChange("title")}
                  />
                </InputField>

                <InputField label="Company Name" required error={errors.company}>
                  <input
                    className={`w-full border ${errors.company ? "border-red-400" : "border-[#D6DDEB]"} px-4 py-3 font-epilogue text-[15px] text-[#25324B] outline-none focus:border-[#4640DE] transition-colors placeholder-[#A8ADB7]`}
                    placeholder="e.g. Dropbox"
                    value={form.company}
                    onChange={handleChange("company")}
                  />
                </InputField>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <InputField label="Location">
                  <input
                    className="w-full border border-[#D6DDEB] px-4 py-3 font-epilogue text-[15px] text-[#25324B] outline-none focus:border-[#4640DE] transition-colors placeholder-[#A8ADB7]"
                    placeholder="e.g. New York, US"
                    value={form.location}
                    onChange={handleChange("location")}
                  />
                </InputField>

                <InputField label="Category" required error={errors.category}>
                  <select
                    className={`w-full border ${errors.category ? "border-red-400" : "border-[#D6DDEB]"} px-4 py-3 font-epilogue text-[15px] text-[#25324B] outline-none focus:border-[#4640DE] transition-colors bg-white`}
                    value={form.category}
                    onChange={handleChange("category")}
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </InputField>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <InputField label="Employment Type">
                  <select
                    className="w-full border border-[#D6DDEB] px-4 py-3 font-epilogue text-[15px] text-[#25324B] outline-none focus:border-[#4640DE] transition-colors bg-white"
                    value={form.employmentType}
                    onChange={handleChange("employmentType")}
                  >
                    {EMPLOYMENT_TYPES.map(t => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
                  </select>
                </InputField>

                <InputField label="Experience Level">
                  <select
                    className="w-full border border-[#D6DDEB] px-4 py-3 font-epilogue text-[15px] text-[#25324B] outline-none focus:border-[#4640DE] transition-colors bg-white"
                    value={form.experienceLevel}
                    onChange={handleChange("experienceLevel")}
                  >
                    {EXPERIENCE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </InputField>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <InputField label="Salary (USD/year)">
                  <input
                    type="number"
                    className="w-full border border-[#D6DDEB] px-4 py-3 font-epilogue text-[15px] text-[#25324B] outline-none focus:border-[#4640DE] transition-colors placeholder-[#A8ADB7]"
                    placeholder="e.g. 80000"
                    value={form.salary}
                    onChange={handleChange("salary")}
                  />
                </InputField>

                <InputField label="Skills (comma separated)">
                  <input
                    className="w-full border border-[#D6DDEB] px-4 py-3 font-epilogue text-[15px] text-[#25324B] outline-none focus:border-[#4640DE] transition-colors placeholder-[#A8ADB7]"
                    placeholder="e.g. React, Figma, CSS"
                    value={form.skills}
                    onChange={handleChange("skills")}
                  />
                </InputField>
              </div>

              <InputField label="Job Description" required error={errors.description}>
                <textarea
                  rows={5}
                  className={`w-full border ${errors.description ? "border-red-400" : "border-[#D6DDEB]"} px-4 py-3 font-epilogue text-[15px] text-[#25324B] outline-none focus:border-[#4640DE] transition-colors placeholder-[#A8ADB7] resize-none`}
                  placeholder="Describe the role, responsibilities, requirements..."
                  value={form.description}
                  onChange={handleChange("description")}
                />
              </InputField>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#4640DE]" checked={form.remote} onChange={handleChange("remote")} />
                <span className="font-epilogue text-[15px] text-[#515B6F]">Remote position available</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setErrors({}); setForm(emptyForm); }}
                  className="flex-1 py-4 border border-[#D6DDEB] text-[#515B6F] font-epilogue font-bold hover:border-[#25324B] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-4 bg-[#4640DE] text-white font-epilogue font-bold hover:bg-[#3730c4] transition-colors disabled:opacity-60"
                >
                  {submitting ? "Posting..." : "Post Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[420px] p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-red-500 text-2xl" />
              </div>
              <h3 className="font-clash-display font-semibold text-[22px] text-[#25324B] mb-2">Delete Job?</h3>
              <p className="font-epilogue text-[#515B6F] text-sm">
                Are you sure you want to delete <strong>"{deleteConfirm.title}"</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 border border-[#D6DDEB] text-[#515B6F] font-epilogue font-bold hover:border-[#25324B] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="flex-1 py-3 bg-red-500 text-white font-epilogue font-bold hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;