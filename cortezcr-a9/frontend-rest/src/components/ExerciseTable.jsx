import ExerciseRow from './ExerciseRow';

function ExerciseTable({exercises, onEdit, onDelete}) {
    return (
        <table className="exercise-table">
            <thead>
                <tr>
                    <th>Edit</th>
                    <th>Exercise</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <ExerciseRow exercise={exercise} onEdit={onEdit} onDelete={onDelete} key={i} />)}
            </tbody>
        </table>
    );
}

export default ExerciseTable;