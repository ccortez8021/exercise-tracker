import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const UpdatePage = ({exerciseToUpdate}) => {

    const[name, setName] = useState(exerciseToUpdate.name);
    const[reps, setReps] = useState(exerciseToUpdate.reps);
    const[weight, setWeight] = useState(exerciseToUpdate.weight);
    const[unit, setUnit] = useState(exerciseToUpdate.unit);
    const[date, setDate] = useState(exerciseToUpdate.date);

    const navigate = useNavigate()
    const { token } = useAuth();

    const updateExercise = async(formData)=>{
        formData.preventDefault();
        const updatedExercise = {name, reps, weight, unit, date}

        try{
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/exercises/${exerciseToUpdate._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(updatedExercise)
                }
            );
            if(response.status == 200){
                alert("Succesfully updated the exercise");
                navigate('/');
            } else{
                alert("Failed to update the exercise" + response.status);
            }
        } catch (error) {
            console.error('Error updating exercise:', error);
            alert("Failed to update the exercise");
        }
    };
    return (
        <form onSubmit={updateExercise}>
            <p>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    placeholder='exercise'
                    required
                    value={name}
                    onChange={e =>{setName(e.target.value)}}>
                </input>
            </p>
            <p>
                <label htmlFor='reps'>Reps</label>
                <input 
                    type='number' 
                    id='reps'
                    placeholder='repetitions'
                    required
                    value={reps}
                    onChange={e => setReps(e.target.valueAsNumber)}>
                </input>
            </p>
            <p>
                <label htmlFor='weight'>Weight</label>
                <input 
                    type="number"
                    id="weight"
                    placeholder='Weight'
                    required
                    value={weight}
                    onChange={e => setWeight(e.target.valueAsNumber)}>
                </input>
            </p>
            <p>
                <label htmlFor='unit-select'>Units</label>
                <select
                    id='unit-select'
                    required
                    value={unit}
                    onChange={e => setUnit(e.target.value)}>
                    <option value='kgs'>kgs</option>
                    <option value='lbs'>lbs</option>
                    <option value='miles'>miles</option>
                </select>
            </p>
            <p>
                <label htmlFor='Timestamp'>Date</label>
                <input 
                    type='date'
                    id='timestamp'
                    value={date.split('T')[0]}
                    onChange={e => setDate(e.target.value)}>
                </input>
            </p>
            <button
                type='submit'
                id='log'
            >Update Exercise</button>
        </form>
    );
}

export default UpdatePage;