import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercise-models.mjs';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT;

app.post('/exercises', asyncHandler(async (req, res) => {
    const {name, reps, weight, unit, date} = req.body;

    if(!name || !reps || !weight || !unit || !date){
        return res.status(400).json({"Error": "Invalid request"});
    }else if(typeof name !== 'string' || typeof reps !== 'number' || typeof weight !== 'number' || typeof unit !== 'string'){
        return res.status(400).json({"Error": "Invalid request"});
    }else if(reps < 0 || weight < 0){
        return res.status(400).json({"Error": "Invalid request"});
    }else if(unit !== 'lbs' && unit !== 'kgs' && unit !== 'miles'){
        return res.status(400).json({"Error": "Invalid request"});
    }else if(isNaN(Date.parse(date))){
        return res.status(400).json({"Error": "Invalid request"});
    }
    const exerciseData = req.body;
    const newExercise = await exercises.createExercise(exerciseData);
    return res.status(201).json(newExercise);
}));
app.get('/exercises', asyncHandler(async(req, res)=>{
    const query = await exercises.findExercises({});
    return res.status(200).json(query);       
}));
app.get('/exercises/:Id', asyncHandler(async (req, res)=>{
    const exerciseId = req.params.Id;
    const exercise = await exercises.findExerciseById(exerciseId);
    if(!exercise){
        return res.status(404).json({"Error": "Not found"});
    }else{
        return res.status(200).json(exercise);
    }
}));
app.put('/exercises/:Id', asyncHandler(async(req, res)=>{
    const exerciseId = req.params.Id;
    const {name, reps, weight, unit, date} = req.body;

    if(!name || !reps || !weight || !unit || !date){
        return res.status(400).json({"Error": "Invalid request"});
    }else if(typeof name !== 'string' || typeof reps !== 'number' || typeof weight !== 'number' || typeof unit !== 'string'){
        return res.status(400).json({"Error": "Invalid request"});
    }else if(reps < 0 || weight < 0){
        return res.status(400).json({"Error": "Invalid request"});
    }else if(unit !== 'lbs' && unit !== 'kgs' && unit !== 'miles'){
        return res.status(400).json({"Error": "Invalid request"});
    }else if(isNaN(Date.parse(date))){
        return res.status(400).json({"Error": "Invalid request"});
    }
    const updateData = req.body;
    const exercise = await exercises.updateExerciseById(exerciseId, updateData);
    if(!exercise){
        return res.status(404).json({"7 Error": "Not found"});
    }else{
        return res.status(200).json(exercise);
    }

}));
app.delete('/exercises/:Id', asyncHandler(async (req, res)=>{
    const exerciseId = req.params.Id;
    const exercise = await exercises.findExerciseById(exerciseId);
    if(!exercise){
        return res.status(404).json({"Error": "Not found"});
    } else{
        await exercises.deleteExerciseById(exerciseId);
        return res.status(204).send();
    }
}))
app.listen(PORT, async () => {
    await exercises.connect(false)
    console.log(`Server is running on port ${PORT}`);
});