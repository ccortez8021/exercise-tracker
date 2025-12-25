import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_CLASS = 'exercises';

let connection = undefined;
let ExerciseModel = undefined;


async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        ExerciseModel = createModel();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
        throw Error(`Could not connect to MongoDB: ${err.message}`);
    }
}
function createModel(){
    const exerciseSchema = new mongoose.Schema({
        name: {type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit: {type: String, required: true},
        date: {type: Date, required: true},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    });
    return mongoose.model(EXERCISE_CLASS, exerciseSchema);
}
async function createExercise(exerciseData){
    const exercise = new ExerciseModel(exerciseData);
    return await exercise.save();
}
async function findExercises(filter){
    const query = ExerciseModel.find(filter);
    return await query.exec();
}
async function findExerciseById(exerciseId){
    const query = ExerciseModel.findById(exerciseId);
    return await query.exec();
}
async function updateExerciseById(exerciseId, updateData){
    const query = ExerciseModel.findByIdAndUpdate(exerciseId, updateData, {new: true});
    return await query.exec();
}
async function deleteExerciseById(exerciseId){
    const result = ExerciseModel.deleteOne({_id: exerciseId});
    return await result.exec();
}

export{connect, createExercise, findExercises, findExerciseById, updateExerciseById, deleteExerciseById};