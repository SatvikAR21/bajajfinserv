export default function DoctorCard({ doctor }) {
    return (
      <div className="border p-4 rounded shadow" data-testid="doctor-card">
        <h2 data-testid="doctor-name" className="text-lg font-bold">{doctor.name}</h2>
        <p data-testid="doctor-specialty">{doctor.specialties.join(', ')}</p>
        <p data-testid="doctor-experience">Experience: {doctor.experience} years</p>
        <p data-testid="doctor-fee">Fees: ₹{doctor.fees}</p>
      </div>
    );
  }
  