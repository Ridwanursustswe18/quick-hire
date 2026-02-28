import { Link } from "react-router-dom";

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

const Tag = ({ label }) => {
  const c = tagColors[label] || { bg: "#eee", text: "#555" };
  return (
    <span className="text-xs font-semibold px-3 py-1 rounded-full font-epilogue" style={{ background: c.bg, color: c.text }}>
      {label}
    </span>
  );
};

const BookmarkIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#A8ADB7" strokeWidth={2}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const JobCard = ({ job, variant = "grid" }) => {
  if (variant === "list") {
    return (
      <Link to={`/jobs/${job.id}`} className="flex items-start gap-4 p-5 border border-[#D6DDEB] bg-white hover:shadow-md hover:border-[#4640DE] transition-all cursor-pointer group">
        <div className="w-12 h-12 rounded flex items-center justify-center text-2xl flex-shrink-0 bg-[#F8F8FD] border border-[#D6DDEB]">
          {job.logo || "🏢"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-[#25324B] font-clash-display text-[18px]">{job.title}</h3>
              <p className="text-sm text-[#515B6F] mt-0.5 font-epilogue">{job.company} • {job.location}</p>
            </div>
            <BookmarkIcon />
          </div>
          <p className="text-sm text-[#7C8493] mt-1 line-clamp-1 font-epilogue">{job.description?.slice(0, 80)}...</p>
          <div className="flex gap-2 mt-3 flex-wrap items-center">
            <span className="text-xs border border-[#4640DE] text-[#4640DE] px-3 py-1 font-semibold font-epilogue">
              {job.employmentType?.replace("_", "-") || "Full-Time"}
            </span>
            {job.category && <Tag label={job.category} />}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/jobs/${job.id}`} className="border border-[#D6DDEB] bg-white p-6 flex flex-col gap-4 hover:shadow-md hover:border-[#4640DE] transition-all cursor-pointer group">
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded flex items-center justify-center text-2xl bg-[#F8F8FD] border border-[#D6DDEB]">
          {job.logo || "🏢"}
        </div>
        <BookmarkIcon />
      </div>
      <div>
        <h3 className="font-semibold text-[#25324B] font-clash-display text-[18px]">{job.title}</h3>
        <p className="text-sm text-[#515B6F] mt-1 font-epilogue">{job.company} • {job.location}</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        <span className="text-xs border border-[#4640DE] text-[#4640DE] px-3 py-1 font-semibold font-epilogue">
          {job.employmentType?.replace("_", "-") || "Full-Time"}
        </span>
        {job.category && <Tag label={job.category} />}
      </div>
    </Link>
  );
};

export default JobCard;