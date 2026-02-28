import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMapPin, FiChevronDown } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// ── Category icons (inline SVG placeholders) ──────────────────────────────
const categories = [
  { emoji: "🎨", label: "Design",         count: "235 jobs available" },
  { emoji: "📊", label: "Sales",          count: "756 jobs available" },
  { emoji: "📣", label: "Marketing",      count: "140 jobs available" },
  { emoji: "💰", label: "Finance",        count: "325 jobs available" },
  { emoji: "💻", label: "Technology",     count: "436 jobs available" },
  { emoji: "⚙️", label: "Engineering",    count: "542 jobs available" },
  { emoji: "📋", label: "Business",       count: "211 jobs available" },
  { emoji: "👥", label: "Human Resource", count: "346 jobs available" },
];

const companies = ["Vodafone", "Intel Corp", "Tesla", "AMD", "Talkit"];

const ArrowRight = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const Home = () => {
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTitle) params.set("search", searchTitle);
    if (searchLocation) params.set("location", searchLocation);
    navigate(`/jobs?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#F8F8FD] px-8 lg:px-[124px] pt-[82px] pb-0 overflow-hidden">
        <div className="flex items-start justify-between gap-8">
          {/* Left */}
          <div className="max-w-[629px] pb-16 relative z-10">
            <h1 className="font-clash-display font-bold text-[72px] leading-[1.1] text-[#25324B]">
              Discover
            </h1>
            <h1 className="font-clash-display font-bold text-[72px] leading-[1.1] text-[#25324B]">
              more than
            </h1>
            <h1 className="font-clash-display font-bold text-[72px] leading-[1.1] text-[#26A4FF]">
              5000+ Jobs
            </h1>

            {/* Avatar row */}
            <div className="flex items-center gap-3 mt-6">
              {["👩‍💼","👨‍💻","👩‍🔬","👨‍🎨"].map((a, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-[#D6DDEB] flex items-center justify-center text-lg -ml-2 first:ml-0 border-2 border-white">
                  {a}
                </div>
              ))}
              <p className="text-sm text-[#515B6F] font-epilogue ml-2">
                <span className="font-bold text-[#25324B]">30k+</span> people got their dream jobs
              </p>
            </div>

            <p className="mt-6 font-epilogue text-[16px] text-[#515B6F] leading-relaxed max-w-[521px] opacity-70">
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>

            {/* Search bar */}
            <div className="mt-8 flex items-center bg-white shadow-md w-full max-w-[852px]">
              <div className="flex flex-1 items-center gap-3 px-5 py-4">
                <FiSearch className="w-5 h-5 text-[#25324B] flex-shrink-0" />
                <div className="flex flex-col w-full">
                  <input
                    className="font-epilogue text-[15px] text-[#25324B] placeholder-[#7C8493] outline-none w-full"
                    placeholder="Job title or keyword"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="h-[1px] bg-[#D6DDEB] w-full mt-2" />
                </div>
              </div>

              <div className="flex flex-1 items-center gap-3 px-5 py-4">
                <FiMapPin className="w-5 h-5 text-[#25324B] flex-shrink-0" />
                <div className="flex items-center w-full">
                  <div className="flex flex-col w-full">
                    <input
                      className="font-epilogue text-[15px] text-[#25324B] placeholder-[#7C8493] outline-none w-full"
                      placeholder="Florence, Italy"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <div className="h-[1px] bg-[#D6DDEB] w-full mt-2" />
                  </div>
                  <FiChevronDown className="text-[#7C8493] ml-2 flex-shrink-0" />
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="py-4 px-6 bg-[#4640DE] text-white font-epilogue font-bold text-[16px] hover:bg-[#3730c4] transition-colors whitespace-nowrap flex-shrink-0"
              >
                Search My Job
              </button>
            </div>

            {/* Popular tags */}
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <span className="font-epilogue text-sm text-[#515B6F]">Popular:</span>
              {["UI Designer", "UX Researcher", "Android", "Admin"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setSearchTitle(tag); navigate(`/jobs?search=${tag}`); }}
                  className="font-epilogue text-sm border border-[#D6DDEB] px-3 py-1 text-[#25324B] hover:border-[#4640DE] hover:text-[#4640DE] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right - Hero image area */}
          <div className="hidden lg:block flex-shrink-0 relative">
            <div className="w-[440px] h-[500px] bg-gradient-to-br from-[#4640DE15] to-[#26A4FF10] flex items-end justify-center overflow-hidden">
              <div className="text-center pb-8">
                <div className="text-[120px] leading-none">👨‍💼</div>
                {/* Floating cards */}
                <div className="absolute top-10 -left-16 bg-white shadow-xl px-5 py-3 text-left">
                  <p className="text-xs text-[#7C8493] font-epilogue">Live Preview</p>
                  <p className="font-bold text-[#25324B] text-sm font-clash-display">🔴 1,00,000+ Users</p>
                </div>
                <div className="absolute bottom-20 -left-12 bg-white shadow-xl px-5 py-3 text-left">
                  <p className="text-xs text-[#7C8493] font-epilogue">Jobs Posted</p>
                  <p className="font-bold text-[#25324B] text-sm font-clash-display">5,000+ Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANIES ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 px-8 lg:px-[124px] border-b border-[#D6DDEB]">
        <p className="font-epilogue font-normal text-[18px] text-[#202430] opacity-50">
          Companies we helped grow
        </p>
        <div className="flex justify-between items-center mt-8 flex-wrap gap-6">
          {companies.map((c) => (
            <span key={c} className="font-clash-display font-bold text-[20px] text-[#25324B] opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
      <section className="bg-white py-[80px] px-8 lg:px-[124px]">
        <div className="flex justify-between items-center">
          <h2 className="font-clash-display font-semibold text-[48px] text-[#25324B] leading-tight">
            Explore By{" "}
            <span className="text-[#26A4FF]">Category</span>
          </h2>
          <button
            onClick={() => navigate("/jobs")}
            className="flex items-center gap-2 font-epilogue font-semibold text-[16px] text-[#4640DE] hover:gap-3 transition-all"
          >
            Show all jobs <ArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => navigate(`/jobs?category=${cat.label}`)}
              className="border border-[#D6DDEB] p-8 text-left hover:bg-[#4640DE] hover:border-[#4640DE] group transition-all duration-200"
            >
              <div className="text-3xl">{cat.emoji}</div>
              <p className="mt-6 font-clash-display font-semibold text-[24px] text-[#25324B] group-hover:text-white">
                {cat.label}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="font-epilogue font-semibold text-[16px] text-[#7C8493] group-hover:text-[#ffffff99]">
                  {cat.count}
                </span>
                <span className="text-[#7C8493] group-hover:text-white"><ArrowRight /></span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="px-8 lg:px-[124px] py-[40px]">
        <div className="relative bg-[#4640DE] overflow-hidden px-16 py-14 flex items-center justify-between">
          {/* Corner triangles */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[100px] border-t-white border-r-[100px] border-r-transparent" />
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[100px] border-b-white border-l-[100px] border-l-transparent" />

          <div className="relative z-10">
            <h2 className="font-clash-display font-semibold text-[48px] text-white leading-tight max-w-[380px]">
              Start posting jobs today
            </h2>
            <p className="font-epilogue text-white text-[18px] mt-4 opacity-80">
              Start posting jobs for only $10.
            </p>
            <button
              onClick={() => navigate("/admin")}
              className="mt-6 py-4 px-6 bg-white text-[#4640DE] font-epilogue font-bold text-[16px] hover:bg-[#f0f0ff] transition-colors"
            >
              Sign Up For Free
            </button>
          </div>

          <div className="relative z-10 hidden lg:block text-[140px] leading-none opacity-20">
            💼
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;