import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiMapPin, FiFilter } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import JobCard from "../components/jobs/JobCard";
import api from "../services/api";
const EMPLOYMENT_TYPES = ["Full-Time", "Part-Time", "Remote", "Internship", "Contract"];
const CATEGORIES = ["Design", "Sales", "Marketing", "Finance", "Technology", "Engineering", "Business", "Human Resource"];
const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior Level", "Director", "VP or Above"];

const CheckBox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div
      onClick={onChange}
      className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? "bg-[#4640DE] border-[#4640DE]" : "border-[#D6DDEB] group-hover:border-[#4640DE]"}`}
    >
      {checked && (
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
    <span className="font-epilogue text-[16px] text-[#515B6F] group-hover:text-[#25324B] transition-colors">{label}</span>
  </label>
);

// Mock data for when API is not available
const MOCK_JOBS = [
  { id: 1, title: "Social Media Assistant", company: "Nomad", location: "Paris, France", employmentType: "FULL_TIME", category: "Marketing", description: "We are looking for a Social Media Assistant to help manage our online presence.", logo: "🌍", salary: 50000 },
  { id: 2, title: "Brand Designer", company: "Dropbox", location: "San Francisco, US", employmentType: "FULL_TIME", category: "Design", description: "Join Dropbox as a Brand Designer to shape our visual identity.", logo: "📦", salary: 90000 },
  { id: 3, title: "Interactive Developer", company: "Terraform", location: "Hamburg, Germany", employmentType: "FULL_TIME", category: "Technology", description: "Build interactive experiences for Terraform's platform.", logo: "⚡", salary: 85000 },
  { id: 4, title: "HR Manager", company: "Packer", location: "Lucern, Switzerland", employmentType: "FULL_TIME", category: "Human Resource", description: "Lead HR operations at Packer.", logo: "📋", salary: 70000 },
  { id: 5, title: "Product Designer", company: "Figma", location: "San Francisco, US", employmentType: "FULL_TIME", category: "Design", description: "Design products used by millions at Figma.", logo: "🎨", salary: 120000 },
  { id: 6, title: "Lead Engineer", company: "GitHub", location: "Remote", employmentType: "FULL_TIME", category: "Engineering", description: "Lead engineering teams at GitHub.", logo: "🐙", salary: 150000 },
  { id: 7, title: "Marketing Specialist", company: "Revolut", location: "London, UK", employmentType: "FULL_TIME", category: "Marketing", description: "Drive marketing campaigns for Revolut.", logo: "💳", salary: 65000 },
  { id: 8, title: "Financial Analyst", company: "Stripe", location: "New York, US", employmentType: "FULL_TIME", category: "Finance", description: "Analyze financial data at Stripe.", logo: "💰", salary: 95000 },
];

const JobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilter, setShowFilter] = useState(false);

  const [searchTitle, setSearchTitle] = useState(searchParams.get("search") || "");
  const [searchLocation, setSearchLocation] = useState(searchParams.get("location") || "");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedLevels, setSelectedLevels] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchParams.get("search")) params.search = searchParams.get("search");
      if (searchParams.get("location")) params.location = searchParams.get("location");
      if (searchParams.get("category")) params.category = searchParams.get("category");
      const res = await api.get("/jobs", { params });
      setJobs(res.data.data || []);
    } catch {
      // Use mock data if API is unavailable
      let filtered = MOCK_JOBS;
      const s = searchParams.get("search");
      const l = searchParams.get("location");
      const c = searchParams.get("category");
      if (s) filtered = filtered.filter(j => j.title.toLowerCase().includes(s.toLowerCase()) || j.company.toLowerCase().includes(s.toLowerCase()));
      if (l) filtered = filtered.filter(j => j.location.toLowerCase().includes(l.toLowerCase()));
      if (c) filtered = filtered.filter(j => j.category.toLowerCase().includes(c.toLowerCase()));
      setJobs(filtered);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTitle) params.set("search", searchTitle);
    if (searchLocation) params.set("location", searchLocation);
    if (selectedCategory) params.set("category", selectedCategory);
    setSearchParams(params);
  };

  const toggleType = (t) => setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const toggleLevel = (l) => setSelectedLevels(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]);

  const filteredJobs = jobs.filter(job => {
    if (selectedTypes.length > 0) {
      const type = job.employmentType?.replace("_", "-").toLowerCase();
      if (!selectedTypes.some(t => type?.includes(t.toLowerCase()))) return false;
    }
    if (selectedCategory && job.category?.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Search bar ── */}
      <section className="bg-white border-b border-[#D6DDEB] px-8 lg:px-[124px] py-6">
        <div className="flex items-center bg-white border border-[#D6DDEB] shadow-sm max-w-4xl">
          <div className="flex flex-1 items-center gap-3 px-5 py-3">
            <FiSearch className="w-5 h-5 text-[#25324B] flex-shrink-0" />
            <input
              className="font-epilogue text-[15px] text-[#25324B] placeholder-[#7C8493] outline-none w-full"
              placeholder="Job title or keyword"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <div className="w-px h-10 bg-[#D6DDEB]" />
          <div className="flex flex-1 items-center gap-3 px-5 py-3">
            <FiMapPin className="w-5 h-5 text-[#25324B] flex-shrink-0" />
            <input
              className="font-epilogue text-[15px] text-[#25324B] placeholder-[#7C8493] outline-none w-full"
              placeholder="City, country or remote"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            className="py-3 px-6 bg-[#4640DE] text-white font-epilogue font-bold hover:bg-[#3730c4] transition-colors"
          >
            Search
          </button>
        </div>

        {/* Active filters */}
        {(searchParams.get("search") || searchParams.get("category") || searchParams.get("location")) && (
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <span className="text-sm text-[#7C8493] font-epilogue">Active filters:</span>
            {["search", "category", "location"].map(key => searchParams.get(key) && (
              <span key={key} className="flex items-center gap-2 bg-[#4640DE15] text-[#4640DE] text-sm font-semibold px-3 py-1 font-epilogue">
                {searchParams.get(key)}
                <button onClick={() => { const p = new URLSearchParams(searchParams); p.delete(key); setSearchParams(p); }} className="hover:text-red-500">×</button>
              </span>
            ))}
          </div>
        )}
      </section>

      <div className="px-8 lg:px-[124px] py-8 flex gap-8">
        {/* ── Sidebar Filters ── */}
        <aside className="w-[280px] flex-shrink-0 hidden lg:block">
          {/* Type of Employment */}
          <div className="mb-8">
            <h3 className="font-clash-display font-semibold text-[18px] text-[#25324B] mb-4">
              Type of Employment
            </h3>
            <div className="flex flex-col gap-4">
              {EMPLOYMENT_TYPES.map((t) => (
                <CheckBox key={t} label={t} checked={selectedTypes.includes(t)} onChange={() => toggleType(t)} />
              ))}
            </div>
          </div>

          <div className="h-px bg-[#D6DDEB] my-6" />

          {/* Category */}
          <div className="mb-8">
            <h3 className="font-clash-display font-semibold text-[18px] text-[#25324B] mb-4">
              Category
            </h3>
            <div className="flex flex-col gap-4">
              <CheckBox label="All Categories" checked={selectedCategory === ""} onChange={() => setSelectedCategory("")} />
              {CATEGORIES.map((c) => (
                <CheckBox key={c} label={c} checked={selectedCategory === c} onChange={() => setSelectedCategory(c === selectedCategory ? "" : c)} />
              ))}
            </div>
          </div>

          <div className="h-px bg-[#D6DDEB] my-6" />

          {/* Experience */}
          <div className="mb-8">
            <h3 className="font-clash-display font-semibold text-[18px] text-[#25324B] mb-4">
              Experience Level
            </h3>
            <div className="flex flex-col gap-4">
              {EXPERIENCE_LEVELS.map((l) => (
                <CheckBox key={l} label={l} checked={selectedLevels.includes(l)} onChange={() => toggleLevel(l)} />
              ))}
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full py-3 bg-[#4640DE] text-white font-epilogue font-bold hover:bg-[#3730c4] transition-colors"
          >
            Apply Filters
          </button>
        </aside>

        {/* ── Jobs List ── */}
        <main className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-clash-display font-semibold text-[24px] text-[#25324B]">
                All Jobs
              </h2>
              <p className="font-epilogue text-[14px] text-[#7C8493] mt-1">
                Showing {filteredJobs.length} results
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* View toggle */}
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 border ${viewMode === "grid" ? "border-[#4640DE] bg-[#4640DE10]" : "border-[#D6DDEB]"}`}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={viewMode === "grid" ? "#4640DE" : "#7C8493"} strokeWidth={2}>
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 border ${viewMode === "list" ? "border-[#4640DE] bg-[#4640DE10]" : "border-[#D6DDEB]"}`}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={viewMode === "list" ? "#4640DE" : "#7C8493"} strokeWidth={2}>
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-[#D6DDEB] p-6 animate-pulse">
                  <div className="w-12 h-12 bg-[#D6DDEB] rounded mb-4" />
                  <div className="h-5 bg-[#D6DDEB] rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[#D6DDEB] rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-clash-display font-semibold text-[24px] text-[#25324B] mb-2">No jobs found</h3>
              <p className="font-epilogue text-[#7C8493]">Try adjusting your search or filters</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredJobs.map((job) => <JobCard key={job.id} job={job} variant="grid" />)}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredJobs.map((job) => <JobCard key={job.id} job={job} variant="list" />)}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default JobsPage;