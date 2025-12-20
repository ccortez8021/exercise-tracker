import {VscEdit, VscTrash} from "react-icons/vsc";


function ExerciseRow({exercise,onEdit, onDelete}) {
    return (
        <tr>
            <td><VscEdit className="icon-button edit-icon" onClick={e =>{e.preventDefault(); onEdit(exercise)}}/></td>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.split('T')[0]}</td>
            <td><VscTrash className="icon-button delete-icon" onClick={e=>{e.preventDefault(); onDelete(exercise._id)}}/></td>
        </tr>
    );
}

export default ExerciseRow;