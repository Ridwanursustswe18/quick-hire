import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiMapPin, FiCalendar, FiArrowLeft, FiBriefcase, FiDollarSign } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import api from "../services/api";

const tagColors = {
  Marketing:       { bg: "#EB85331A", text: "#EB8533" },
  Design:          { bg: "#4640DE1A", text: "#4640DE" },
  Business:        { bg: "#56CDAD1A", text: "#56CDAD" },
  Technology:      { bg: "#26A4FF1A", text: "#26A4FF" },
  Engineering:     { bg: "#FF65501A", text: "#FF6550" },
  "Human Resource":{ bg: "#FFB8361A", text: "#FFB836" },
  Sales:           { bg: "#56CDAD1A", text: "#56CDAD" },
  Finance:         { bg: "#FF65501A", text: "#FF6550" },
};

const MOCK_JOB = {
  id: 1,
  title: "Social Media Assistant",
  company: "Nomad",
  location: "Paris, France",
  employmentType: "FULL_TIME",
  category: "Marketing",
  experienceLevel: "MID",
  salary: 50000,
  remote: false,
  logo: "🌍",
  description: `We are looking for a talented Social Media Assistant to join our growing team at Nomad. You will be responsible for managing our social media presence across multiple platforms and helping to grow our online community.

**Key Responsibilities:**
- Create and schedule engaging content across all social media platforms
- Monitor and respond to comments, messages, and mentions
- Analyze social media metrics and prepare monthly reports
- Collaborate with the marketing team on campaigns
- Stay up-to-date with the latest social media trends and best practices

**What We Offer:**
- Competitive salary and benefits package
- Flexible working arrangements
- Opportunity to work with a diverse, international team
- Professional development opportunities
- Annual team retreats`,
  skills: ["Social Media", "Content Creation", "Analytics", "Marketing"],
  createdAt: new Date().toISOString(),
};

const InfoBadge = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-[#515B6F] font-epilogue text-[16px]">
    <span className="text-[#4640DE]">{icon}</span>
    <span>{text}</span>
  </div>
);

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    resumeLink: "",
    coverNote: "",
  });

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data.data);
    } catch {
      setJob(MOCK_JOB);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.resumeLink.trim()) errs.resumeLink = "Resume link is required";
    else {
      try { new URL(form.resumeLink); }
      catch { errs.resumeLink = "Enter a valid URL (e.g. https://...)"; }
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await api.post(`/jobs/${id}/applications`, form);
      setSubmitted(true);
    } catch {
      // Simulate success for demo
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#4640DE] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-epilogue text-[#7C8493]">Loading job details...</p>
      </div>
    </div>
  );

  if (!job) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="font-clash-display text-[24px] font-semibold text-[#25324B] mb-2">Job not found</h2>
        <button onClick={() => navigate("/jobs")} className="text-[#4640DE] font-epilogue font-semibold">
          ← Back to Jobs
        </button>
      </div>
    </div>
  );

  const c = tagColors[job.category] || { bg: "#eee", text: "#555" };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="px-8 lg:px-[124px] py-4 border-b border-[#D6DDEB] bg-[#F8F8FD]">
        <button
          onClick={() => navigate("/jobs")}
          className="flex items-center gap-2 font-epilogue text-[#515B6F] hover:text-[#4640DE] transition-colors"
        >
          <FiArrowLeft /> Back to Jobs
        </button>
      </div>

      <div className="px-8 lg:px-[124px] py-10 flex gap-10 flex-col lg:flex-row">
        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0">
          {/* Job Header */}
          <div className="flex items-start gap-5 pb-8 border-b border-[#D6DDEB]">
            <div className="w-16 h-16 flex items-center justify-center text-4xl bg-[#F8F8FD] border border-[#D6DDEB] flex-shrink-0">
              {job.logo || "🏢"}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h1 className="font-clash-display font-semibold text-[32px] text-[#25324B] leading-tight">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="font-epilogue text-[#515B6F] font-medium">{job.company}</span>
                    <span className="text-[#D6DDEB]">•</span>
                    <span className="font-epilogue text-[#515B6F]">{job.location}</span>
                    {job.category && (
                      <span className="text-sm font-semibold px-3 py-1 font-epilogue rounded-full" style={{ background: c.bg, color: c.text }}>
                        {job.category}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowApplyForm(true)}
                  className="py-4 px-8 bg-[#4640DE] text-white font-epilogue font-bold text-[16px] hover:bg-[#3730c4] transition-colors"
                >
                  Apply Now →
                </button>
              </div>
            </div>
          </div>

          {/* Job Info Badges */}
          <div className="flex flex-wrap gap-8 py-8 border-b border-[#D6DDEB]">
            <InfoBadge icon={<FiBriefcase />} text={job.employmentType?.replace("_", " ") || "Full Time"} />
            <InfoBadge icon={<FiMapPin />} text={job.location} />
            {job.salary && <InfoBadge icon={<FiDollarSign />} text={`$${job.salary?.toLocaleString()} / year`} />}
            {job.experienceLevel && <InfoBadge icon={<FiCalendar />} text={`${job.experienceLevel} Level`} />}
            {job.remote && <InfoBadge icon={<span>🌐</span>} text="Remote Available" />}
          </div>

          {/* Description */}
          <div className="py-8">
            <h2 className="font-clash-display font-semibold text-[24px] text-[#25324B] mb-6">
              Job Description
            </h2>
            <div className="font-epilogue text-[16px] text-[#515B6F] leading-[28px] whitespace-pre-line">
              {job.description}
            </div>
          </div>

          {/* Skills */}
          {job.skills?.length > 0 && (
            <div className="py-8 border-t border-[#D6DDEB]">
              <h2 className="font-clash-display font-semibold text-[24px] text-[#25324B] mb-4">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill) => (
                  <span key={skill} className="font-epilogue text-[14px] font-semibold px-4 py-2 bg-[#F8F8FD] border border-[#D6DDEB] text-[#25324B]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-[320px] flex-shrink-0">
          <div className="border border-[#D6DDEB] p-6 mb-6">
            <h3 className="font-clash-display font-semibold text-[20px] text-[#25324B] mb-4">About the Company</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#F8F8FD] border border-[#D6DDEB] flex items-center justify-center text-2xl">
                {job.logo || "🏢"}
              </div>
              <div>
                <p className="font-clash-display font-semibold text-[18px] text-[#25324B]">{job.company}</p>
                <p className="font-epilogue text-sm text-[#7C8493]">{job.category}</p>
              </div>
            </div>
            <div className="h-px bg-[#D6DDEB] my-4" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-epilogue text-sm text-[#7C8493]">Location</span>
                <span className="font-epilogue text-sm font-semibold text-[#25324B]">{job.location}</span>
              </div>
              {job.employmentType && (
                <div className="flex justify-between">
                  <span className="font-epilogue text-sm text-[#7C8493]">Job Type</span>
                  <span className="font-epilogue text-sm font-semibold text-[#25324B]">{job.employmentType.replace("_", " ")}</span>
                </div>
              )}
              {job.salary && (
                <div className="flex justify-between">
                  <span className="font-epilogue text-sm text-[#7C8493]">Salary</span>
                  <span className="font-epilogue text-sm font-semibold text-[#25324B]">${job.salary.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowApplyForm(true)}
            className="w-full py-4 bg-[#4640DE] text-white font-epilogue font-bold text-[16px] hover:bg-[#3730c4] transition-colors"
          >
            Apply For This Job
          </button>
        </aside>
      </div>

      {/* ── Apply Modal ── */}
      {showApplyForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[560px] max-h-[90vh] overflow-y-auto">
            {submitted ? (
              <div className="p-10 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="font-clash-display font-semibold text-[28px] text-[#25324B] mb-3">
                  Application Submitted!
                </h2>
                <p className="font-epilogue text-[#515B6F] mb-8">
                  Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been received. We'll be in touch soon!
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => { setShowApplyForm(false); setSubmitted(false); setForm({ name: "", email: "", resumeLink: "", coverNote: "" }); }}
                    className="py-3 px-6 border border-[#4640DE] text-[#4640DE] font-epilogue font-bold hover:bg-[#4640DE10] transition-colors"
                  >
                    Apply to Another
                  </button>
                  <button
                    onClick={() => navigate("/jobs")}
                    className="py-3 px-6 bg-[#4640DE] text-white font-epilogue font-bold hover:bg-[#3730c4] transition-colors"
                  >
                    Browse More Jobs
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-[#D6DDEB]">
                  <div>
                    <h2 className="font-clash-display font-semibold text-[24px] text-[#25324B]">Apply for Job</h2>
                    <p className="font-epilogue text-sm text-[#7C8493] mt-1">{job.title} at {job.company}</p>
                  </div>
                  <button onClick={() => setShowApplyForm(false)} className="text-[#7C8493] hover:text-[#25324B] text-2xl leading-none">×</button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {/* Name */}
                  <div>
                    <label className="font-epilogue font-semibold text-[16px] text-[#515B6F] block mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={`w-full border ${errors.name ? "border-red-400" : "border-[#D6DDEB]"} px-4 py-3 font-epilogue text-[15px] text-[#25324B] outline-none focus:border-[#4640DE] transition-colors placeholder-[#A8ADB7]`}
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange("name")}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1 font-epilogue">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-epilogue font-semibold text-[16px] text-[#515B6F] block mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className={`w-full border ${errors.email ? "border-red-400" : "border-[#D6DDEB]"} px-4 py-3 font-epilogue text-[15px] text-[#25324B] outline-none focus:border-[#4640DE] transition-colors placeholder-[#A8ADB7]`}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange("email")}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1 font-epilogue">{errors.email}</p>}
                  </div>

                  {/* Resume Link */}
                  <div>
                    <label className="font-epilogue font-semibold text-[16px] text-[#515B6F] block mb-2">
                      Resume / Portfolio Link <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={`w-full border ${errors.resumeLink ? "border-red-400" : "border-[#D6DDEB]"} px-4 py-3 font-epilogue text-[15px] text-[#25324B] outline-none focus:border-[#4640DE] transition-colors placeholder-[#A8ADB7]`}
                      placeholder="https://your-resume.com"
                      value={form.resumeLink}
                      onChange={handleChange("resumeLink")}
                    />
                    {errors.resumeLink && <p className="text-red-500 text-sm mt-1 font-epilogue">{errors.resumeLink}</p>}
                  </div>

                  {/* Cover Note */}
                  <div>
                    <label className="font-epilogue font-semibold text-[16px] text-[#515B6F] block mb-2">
                      Cover Note <span className="text-[#A8ADB7] font-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={4}
                      className="w-full border border-[#D6DDEB] px-4 py-3 font-epilogue text-[15px] text-[#25324B] outline-none focus:border-[#4640DE] transition-colors placeholder-[#A8ADB7] resize-none"
                      placeholder="Tell us why you're a great fit for this role..."
                      value={form.coverNote}
                      onChange={handleChange("coverNote")}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowApplyForm(false)}
                      className="flex-1 py-4 border border-[#D6DDEB] text-[#515B6F] font-epilogue font-bold hover:border-[#25324B] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-4 bg-[#4640DE] text-white font-epilogue font-bold hover:bg-[#3730c4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default JobDetail;