import { Routes, Route } from 'react-router-dom';

import DoctorList from "./pages/DoctorList";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DoctorList />} />
    </Routes>
  );
}
