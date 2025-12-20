import { useState } from 'react';
import ExerciseRow from './ExerciseRow';


function ExerciseTable({exercises, onEdit, onDelete}) {
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedExercises = [...exercises].sort((a, b) => {
        if (!sortField) return 0;

        let aValue = a[sortField];
        let bValue = b[sortField];

        if (sortField === 'date') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }
        if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
    const getSortIndicator = (field) => {
        if (sortField !== field) return ' ';
        return sortDirection === 'asc' ? ' ↾' : ' ⇂';
    };
    return (
        <table className="exercise-table">
            <thead>
                <tr>
                    <th>Edit</th>
                    <th onClick={()=> handleSort('name')} className='sortable'>
                        Exercise {getSortIndicator('name')}</th>
                    <th onClick={()=> handleSort('reps')} className='sortable'>
                        Reps {getSortIndicator('reps')}</th>
                    <th onClick={()=> handleSort('weight')} className='sortable'>
                        Weight {getSortIndicator('weight')}</th>
                    <th onClick={()=> handleSort('unit')} className='sortable'>
                        Unit {getSortIndicator('unit')}</th>
                    <th onClick={()=> handleSort('date')} className='sortable'>
                        Date {getSortIndicator('date')}</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {sortedExercises.map((exercise, i) => <ExerciseRow exercise={exercise} onEdit={onEdit} onDelete={onDelete} key={exercise.id || i} />)}
            </tbody>
        </table>
    );
}

export default ExerciseTable;