import ExerciseRow from './ExerciseRow';

export default function ExerciseTable({ exercises, onDelete, onEdit }) {
    return (
        <table>
            <caption>Exercise Log</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Delete/Edit</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((row, i) => (
                    <ExerciseRow 
                        row={row} 
                        key={i} 
                        onDelete={onDelete} 
                        onEdit={onEdit} 
                    />
                ))}
            </tbody>
        </table>
    );
}