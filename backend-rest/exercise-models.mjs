// Get the mongoose object
import mongoose from 'mongoose';
import 'dotenv/config';

let connection = undefined;

/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

const dataSchema = mongoose.Schema({ 
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, default: Date.now },
}, {collection: 'exercises'});

const Exercise = mongoose.model('Exercise', dataSchema);

const createData = async (name, reps, weight, unit, date) => {
    const data = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date }); 
    return await data.save();
}

async function getData() {
    return await Exercise.find({});
}

async function getExerciseByID(id) {
    return await Exercise.findById(id);
}

async function updateExercise(name, reps, weight, unit, date, id) {
    const found = await Exercise.findById(id);
    if (found === null) {
        return null;
    }
    found.name = name;
    found.reps = reps;
    found.weight = weight;
    found.unit = unit;
    found.date = date
    return await found.save();
}

async function deleteExerciseByID(id) {
    await Exercise.findByIdAndDelete(id);
}

export { connect, createData, getData, getExerciseByID, updateExercise, deleteExerciseByID };
