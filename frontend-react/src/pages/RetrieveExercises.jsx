import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';

export default function RetrieveExercises({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    };

    useEffect(() => {
        loadExercises();
    }, []);

    const deleteExercise = async (id) => {
        const response = await fetch(`/exercises/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            loadExercises();
        } else {
            alert('Failed to delete exercise.');
        }
    };

    const editExercise = (exercise) => {
        setExerciseToEdit(exercise);
        navigate('/edit');
    };

    return (
        <>
            <h2>Exercise Log</h2>
            <ExerciseTable 
                exercises={exercises} 
                onDelete={deleteExercise} 
                onEdit={editExercise} 
            />
        </>
    );
}