import { Link } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RetrievePage({setExerciseToUpdate}) {
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const loadExercises = async ()=>{
        setIsLoading(true);
        try{
             const response = await fetch(`${import.meta.env.VITE_API_URL}/exercises`);
            const exerciseData = await response.json();
            setExercises(exerciseData);
        }
        catch(error){
            console.error('Error loading exercise:', error0);
        }
        finally{
            setIsLoading(false);
        }
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
        if (!confirmed) {
        return;
    }
    
    setIsLoading(true); // Show loading during delete
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/exercises/${_id}`,
            {method: 'DELETE'}
        );
        if(response.status === 204){
            setExercises(exercises.filter(m => m._id !== _id));
        } else {
            alert("Failed to delete exercise");
        }
    } catch (error) {
        console.error('Error deleting exercise:', error);
        alert("Failed to delete exercise");
    } finally {
        setIsLoading(false); // Stop loading
    }
}

    return (
        <>
            {isLoading ? (
                <p style={{ textAlign: 'center', padding: '2rem', fontSize: '1.2rem' }}>
                    Loading exercises...
                </p>
            ) : (
                <ExerciseTable exercises={exercises} onEdit={onEdit} onDelete={onDelete} />
            )}
        </>
    );
}

export default RetrievePage;