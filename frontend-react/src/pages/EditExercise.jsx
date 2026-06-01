import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditExercise({ exerciseToEdit }) {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date?.split('T')[0]);
    const navigate = useNavigate();

    const editExercise = async (e) => {
        e.preventDefault();
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, reps: Number(reps), weight: Number(weight), unit, date })
        });
        if (response.status === 200) {
            alert('Exercise updated successfully!');
        } else {
            alert('Failed to update exercise.');
        }
        navigate('/');
    };

    return (
        <>
            <h2>Edit Exercise</h2>
            <form onSubmit={editExercise}>
                <p>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="reps">Reps</label>
                    <input id="reps" type="number" value={reps} onChange={e => setReps(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="weight">Weight</label>
                    <input id="weight" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="unit">Unit</label>
                    <select id="unit" value={unit} onChange={e => setUnit(e.target.value)}>
                        <option value="kgs">kgs</option>
                        <option value="lbs">lbs</option>
                        <option value="miles">miles</option>
                    </select>
                </p>
                <p>
                    <label htmlFor="date">Date</label>
                    <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
                </p>
                <button type="submit">Save Changes</button>
            </form>
        </>
    );
}