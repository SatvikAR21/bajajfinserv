import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AutocompleteSearch from './components/AutocompleteSearch';
import Filters from './components/Filters.jsx';
import DoctorCard from './components/DoctorCard.jsx';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
      });
  }, []);

  useEffect(() => {
    let temp = [...doctors];
    const q = searchParams.get('q')?.toLowerCase();
    const mode = searchParams.get('mode');
    const sort = searchParams.get('sort');
    const specialties = searchParams.getAll('specialties');

    if (q) {
      temp = temp.filter(d => d.name.toLowerCase().includes(q));
    }
    if (mode) {
      temp = temp.filter(d => d.mode === mode);
    }
    if (specialties.length) {
      temp = temp.filter(d =>
        specialties.every(s => d.specialties.includes(s))
      );
    }
    if (sort === 'fees') {
      temp.sort((a, b) => a.fees - b.fees);
    } else if (sort === 'experience') {
      temp.sort((a, b) => b.experience - a.experience);
    }

    setFiltered(temp);
  }, [searchParams, doctors]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <AutocompleteSearch setSearchParams={setSearchParams} />
      <div className="flex gap-4 mt-6">
        <Filters searchParams={searchParams} setSearchParams={setSearchParams} />
        <div className="flex-1 space-y-4">
          {filtered.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
}
