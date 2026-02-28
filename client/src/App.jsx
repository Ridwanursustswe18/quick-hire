import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobsPage from "./pages/JobsPage";
// import JobDetail from "./pages/JobDetail";
// import AdminPanel from "./pages/AdminPanel";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobsPage />} />
        {/* <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/admin" element={<AdminPanel />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;