import {VscEdit, VscTrash} from "react-icons/vsc";


function ExerciseRow({exercise,onEdit, onDelete}) {
    return (
        <tr>
            <td><VscEdit id="edit" onClick={e =>{e.preventDefault(); onEdit(exercise)}}/></td>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.split('T')[0]}</td>
            <td><VscTrash id="trash" onClick={e=>{e.preventDefault(); onDelete(exercise._id)}}/></td>
        </tr>
    );
}

export default ExerciseRow;