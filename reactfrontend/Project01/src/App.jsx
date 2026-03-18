import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./component/Main";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import FetchData from "./component/FetchData";
import Registration from "./component/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fetch" element={<FetchData />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;