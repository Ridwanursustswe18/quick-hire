import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-[#202430] px-8 lg:px-[124px] pt-[80px] pb-10">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#ffffff15]">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4640DE] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="font-bold text-[20px] text-white font-clash-display">QuickHire</span>
        </div>
        <p className="text-[#ffffff60] mt-4 text-sm leading-relaxed max-w-[260px] font-epilogue">
          Great platform for the job seeker that searching for new career heights and passionate about startups.
        </p>
        <div className="flex gap-3 mt-6">
          {["𝕏", "in", "f"].map((s) => (
            <button key={s} className="w-9 h-9 border border-[#ffffff20] rounded-full text-white text-xs flex items-center justify-center hover:border-[#4640DE] hover:text-[#4640DE] transition-colors">
              {s}
            </button>
          ))}
        </div>
      </div>

      {[
        { title: "About", links: ["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"] },
        { title: "Resources", links: ["Job Posting", "Home", "Help Center", "Contact"] },
      ].map((col) => (
        <div key={col.title}>
          <h4 className="font-semibold text-white mb-4 font-clash-display">{col.title}</h4>
          <ul className="space-y-3">
            {col.links.map((l) => (
              <li key={l}>
                <a href="#" className="text-[#ffffff60] text-sm hover:text-white transition-colors font-epilogue">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <h4 className="font-semibold text-white mb-4 font-clash-display">Get job notifications</h4>
        <p className="text-[#ffffff60] text-sm mb-4 font-epilogue">The latest job news, articles, sent to your inbox weekly.</p>
        <div className="flex gap-2">
          <input className="flex-1 bg-white px-3 py-2 text-sm text-[#25324B] outline-none font-epilogue" placeholder="Email Address" />
          <button className="bg-[#4640DE] text-white px-4 py-2 text-sm font-bold hover:bg-[#3730c4] transition-colors font-epilogue whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
      <p className="text-[#ffffff40] text-sm font-epilogue">2025 @ QuickHire. All rights reserved.</p>
      <p className="text-[#ffffff40] text-sm font-epilogue">Designed by <span className="text-[#4640DE]">Ridwan</span></p>
    </div>
  </footer>
);

export default Footer;