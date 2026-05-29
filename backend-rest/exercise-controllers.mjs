import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as model from './exercise-models.mjs';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await model.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});

app.post('/exercises', asyncHandler(async (req, res) => {
    const validUnits = ['kgs', 'lbs', 'miles'];

    if (typeof req.body.name === 'string' && req.body.name.trim() !== '' &&
        Number.isInteger(req.body.reps) && req.body.reps > 0 &&
        Number.isInteger(req.body.weight) && req.body.weight >= 0 &&
        validUnits.includes(req.body.unit) &&
        (req.body.date === undefined || !isNaN(Date.parse(req.body.date)))) {
        const data = await model.createData(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date);
        res.status(201).send(data);
    }
    else {
        res.status(400).send({"Error": "Invalid request"});
    }
}));

app.get('/exercises', asyncHandler(async (req, res) => {
    const data = await model.getData();
    res.status(200).send(data);
}));

app.get('/exercises/:id', asyncHandler(async (req, res) => {
    const exercise = await model.getExerciseByID(req.params.id);
    if (exercise !== null) {
        res.status(200).send(exercise);
    } else {
        res.status(404).send({"Error": "Not found"});
    }
}));

app.put('/exercises/:id', asyncHandler(async (req, res) => {
    const validUnits = ['kgs', 'lbs', 'miles'];

    if (typeof req.body.name === 'string' && req.body.name.trim() !== '' &&
        Number.isInteger(req.body.reps) && req.body.reps > 0 &&
        Number.isInteger(req.body.weight) && req.body.weight >= 0 &&
        validUnits.includes(req.body.unit) &&
        (req.body.date === undefined || !isNaN(Date.parse(req.body.date)))) {
        const exercise = await model.getExerciseByID(req.params.id);
        if (exercise !== null) {
            res.status(200).send(await model.updateExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date, req.params.id));
        } else {
            res.status(404).send({"Error": "Not found"});
        }
    }
    else {
        res.status(400).send({"Error": "Invalid request"});
    }
}));

app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    const exercise = await model.getExerciseByID(req.params.id);
    if (exercise !== null) {
        await model.deleteExerciseByID(req.params.id);
        res.status(204).send();
    } else {
        res.status(404).send({"Error": "Not found"});
    }
}));
