const specialtiesList = [
    "General Physician", "Dentist", "Dermatologist", "Paediatrician", "Gynaecologist", "ENT",
    "Diabetologist", "Cardiologist", "Physiotherapist", "Endocrinologist", "Orthopaedic", "Ophthalmologist",
    "Gastroenterologist", "Pulmonologist", "Psychiatrist", "Urologist", "Dietitian/Nutritionist", "Psychologist",
    "Sexologist", "Nephrologist", "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
  ];
  
  export default function Filters({ searchParams, setSearchParams }) {
    const handleRadio = (mode) => {
      setSearchParams(params => {
        params.set('mode', mode);
        return params;
      });
    };
  
    const handleCheckbox = (specialty) => {
      setSearchParams(params => {
        const current = new Set(params.getAll('specialties'));
        current.has(specialty) ? current.delete(specialty) : current.add(specialty);
        params.delete('specialties');
        current.forEach(s => params.append('specialties', s));
        return params;
      });
    };
  
    const handleSort = (key) => {
      setSearchParams(params => {
        params.set('sort', key);
        return params;
      });
    };
  
    return (
      <div className="w-64 space-y-4">
        <div>
          <h4 data-testid="filter-header-moc" className="font-semibold">Consultation Mode</h4>
          <label>
            <input type="radio" name="mode" data-testid="filter-video-consult" onChange={() => handleRadio('Video Consult')} />
            Video Consult
          </label>
          <label className="block">
            <input type="radio" name="mode" data-testid="filter-in-clinic" onChange={() => handleRadio('In Clinic')} />
            In Clinic
          </label>
        </div>
  
        <div>
          <h4 data-testid="filter-header-speciality" className="font-semibold">Specialties</h4>
          {specialtiesList.map(s => (
            <label key={s} className="block">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${s.replace(/[/ ]/g, '-')}`}
                onChange={() => handleCheckbox(s)}
              />
              {s}
            </label>
          ))}
        </div>
  
        <div>
          <h4 data-testid="filter-header-sort" className="font-semibold">Sort By</h4>
          <label>
            <input type="radio" name="sort" data-testid="sort-fees" onChange={() => handleSort('fees')} />
            Fees (Low to High)
          </label>
          <label className="block">
            <input type="radio" name="sort" data-testid="sort-experience" onChange={() => handleSort('experience')} />
            Experience (High to Low)
          </label>
        </div>
      </div>
    );
  }
  