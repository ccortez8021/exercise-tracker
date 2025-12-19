import { Link } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RetrievePage({setExerciseToUpdate}) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async ()=>{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/exercises`);
        const exerciseData = await response.json();
        setExercises(exerciseData);
    }
    useEffect(()=>{
        loadExercises();
    }, []);

    const onEdit = (exercise) =>{
        setExerciseToUpdate(exercise);
        navigate('/update');
    }
    const onDelete = async (_id)=>{
        const confirmed = window.confirm("Are you sure you want to delete this exercise?");
        if(!confirmed){
            return; // User clicked "Cancel", so exit
        }
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/exercises/${_id}`,
            {method: 'DELETE'}
        );
        if(response.status === 204){
            setExercises(exercises.filter(m => m._id !== _id));
        }else{
            alert("Failed to delete exercise");
        }
    }

    return (
        <>
            <ExerciseTable exercises={exercises} onEdit={onEdit} onDelete={onDelete}></ExerciseTable>
        </>
    );
}

export default RetrievePage;