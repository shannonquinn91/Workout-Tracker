const db = require("../models");

module.exports = function (app) {
    //API routes
    //last workout GET route
    app.get("/api/workouts", (req, res) => {
        db.workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    },
                },
            },
        ])
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.json(err);
        })
    });

    //add exercise PUT route
    app.put("/api/workouts/:id", (req, res) => {
        //console.log(req.body)
        db.workout.findOneAndUpdate({_id: req.params.id}, {$push: {exercises: [req.body]}})
        .then(newExercise => {
            res.json(newExercise);
        })
        .catch(err => {
            res.json(err);
        })
     
    });

    //create workout POST route
    app.post("/api/workouts", (req, res) => {
        console.log(req.params)
        db.workout.create(req.params)
        .then(newWorkout => {
            res.json(newWorkout);
        })
        .catch(err => {
            res.json(err);
        })
    });
    
    //get workouts GET route
    app.get("/api/workouts/range", (req, res) => {
        db.workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    },
                },
            },
        ])
        .sort({_id: -1})
        .limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
    });

}