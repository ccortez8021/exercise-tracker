import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const CreatePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();
    const { token } = useAuth();

    const addExercise = async (formData) => {
        formData.preventDefault();

        const newExercise = {
            name,
            reps: Number(reps),
            weight: Number(weight),
            unit,
            date
        };

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/exercises`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(newExercise)
                }
            );

            if (response.status === 201) {
                alert("Great Job! Your exercise has been added");
                navigate('/');
            } else {
                alert("Failed to add exercise, try again");
            }
        } catch (error) {
            console.error('Error adding exercise:', error);
            alert("Failed to add exercise, try again");
        }
    };

    return (
        <form onSubmit={addExercise} className='create-form'>
            <p>
                <label htmlFor='exercise'>Name</label>
                <input
                    type='text'
                    placeholder='exercise'
                    id='exercise'
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </p>

            <p>
                <label htmlFor='reps'>Reps</label>
                <input
                    type='number'
                    id='reps'
                    placeholder='repetitions'
                    required
                    value={reps}
                    onChange={e => setReps(e.target.value)}
                />
            </p>

            <p>
                <label htmlFor='weight'>Weight</label>
                <input
                    type='number'
                    id='weight'
                    placeholder='weight'
                    required
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                />
            </p>

            <p>
                <label htmlFor='unit-select'>Units</label>
                <select
                    id='unit-select'
                    required
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                >
                    <option value='kgs'>kgs</option>
                    <option value='lbs'>lbs</option>
                    <option value='miles'>miles</option>
                </select>
            </p>

            <p>
                <label htmlFor='timestamp'>Time</label>
                <input
                    type='date'
                    id='timestamp'
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </p>

            <button type='submit' id='log'>
                Log Exercise
            </button>
        </form>
    );
};

export default CreatePage;
