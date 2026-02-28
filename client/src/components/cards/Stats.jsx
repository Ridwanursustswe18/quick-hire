import { FiBriefcase, FiTrendingUp, FiUsers } from "react-icons/fi";

const Stats = ({jobs}) => {
    const stats = [
    { icon: <FiBriefcase />, label: "Total Jobs", value: jobs.length, color: "#4640DE" },
    { icon: <FiUsers />, label: "Applications", value: "24", color: "#26A4FF" },
    { icon: <FiTrendingUp />, label: "This Week", value: jobs.filter(j => new Date(j.createdAt) > new Date(Date.now() - 7 * 86400000)).length, color: "#56CDAD" },
  ];
  return (
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
  );
};

export default Stats;