import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateExercise() {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const addExercise = async (e) => {
        e.preventDefault();
        const response = await fetch('/exercises', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, reps: Number(reps), weight: Number(weight), unit, date })
        });
        if (response.status === 201) {
            alert('Exercise added successfully!');
        } else {
            alert('Failed to add exercise.');
        }
        navigate('/');
    };

    return (
        <div>
            <h2>Create Exercise</h2>
            <form onSubmit={addExercise}>
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
                <button type="submit">Add Exercise</button>
            </form>
        </div>
    );
}