import ExerciseButtons from './ExerciseButtons';

export default function ExerciseRow({ row, onDelete, onEdit }) {
    return (
        <tr>
            <td>{row.name}</td>
            <td>{row.reps}</td>
            <td>{row.weight}</td>
            <td>{row.unit}</td>
            <td>{row.date?.split('T')[0]}</td>
            <td><ExerciseButtons onDelete={() => onDelete(row._id)} onEdit={() => onEdit(row)} /></td>
        </tr>
    );
}