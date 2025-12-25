import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercise-models.mjs';
import cors from 'cors';
import authRoutes from './auth-routes.mjs';
import { authenticateToken } from './auth-middleware.mjs';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// Auth routes (public - no authentication needed)
app.use('/auth', authRoutes);

// Protected exercise routes (require authentication)
app.post('/exercises', authenticateToken, asyncHandler(async (req, res) => {
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
    
    // Add userId from token to exercise data
    const exerciseData = {
        ...req.body,
        userId: req.userId
    };
    console.log('Creating exercise with data:', exerciseData); 
    const newExercise = await exercises.createExercise(exerciseData);
    return res.status(201).json(newExercise);
}));

app.get('/exercises', authenticateToken, asyncHandler(async(req, res)=>{
    // Only get exercises for the logged-in user
    const query = await exercises.findExercises({ userId: req.userId });
    return res.status(200).json(query);       
}));

app.get('/exercises/:Id', authenticateToken, asyncHandler(async (req, res)=>{
    const exerciseId = req.params.Id;
    const exercise = await exercises.findExerciseById(exerciseId);
    
    if(!exercise){
        return res.status(404).json({"Error": "Not found"});
    }
    
    // Make sure exercise belongs to the user
    if(exercise.userId.toString() !== req.userId){
        return res.status(403).json({"Error": "Access denied"});
    }
    
    return res.status(200).json(exercise);
}));

app.put('/exercises/:Id', authenticateToken, asyncHandler(async(req, res)=>{
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
    
    // Check if exercise exists and belongs to user
    const existingExercise = await exercises.findExerciseById(exerciseId);
    if(!existingExercise){
        return res.status(404).json({"Error": "Not found"});
    }
    if(existingExercise.userId.toString() !== req.userId){
        return res.status(403).json({"Error": "Access denied"});
    }
    
    const updateData = req.body;
    const exercise = await exercises.updateExerciseById(exerciseId, updateData);
    return res.status(200).json(exercise);
}));

app.delete('/exercises/:Id', authenticateToken, asyncHandler(async (req, res)=>{
    const exerciseId = req.params.Id;
    const exercise = await exercises.findExerciseById(exerciseId);
    
    if(!exercise){
        return res.status(404).json({"Error": "Not found"});
    }
    
    // Make sure exercise belongs to the user
    if(exercise.userId.toString() !== req.userId){
        return res.status(403).json({"Error": "Access denied"});
    }
    
    await exercises.deleteExerciseById(exerciseId);
    return res.status(204).send();
}));

app.listen(PORT, async () => {
    await exercises.connect(false)
    console.log(`Server is running on port ${PORT}`);
});