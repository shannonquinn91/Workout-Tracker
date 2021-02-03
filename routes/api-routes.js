const db = require("../models");

module.exports = function (app) {
    //API routes
    //last workout GET route
    app.get("/api/workouts", (req, res) => {
        db.workout.find({})
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.json(err);
        })
    });

    //add exercise PUT route
    app.put("/api/workouts/:id", ({body}, res) => {
        console.log(body);
        //db.workout.findOneAndUpdate()
    });

    //create workout POST route
    app.post("/api/workouts", ({body}, res) => {
        db.workout.create(body)
        .then(newWorkout => {
            res.json(newWorkout);
        })
        .catch(err => {
            res.json(err);
        })
    });
    
    //get workouts GET route
    app.get("/api/workouts/range", (req, res) => {});

}