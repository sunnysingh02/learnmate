const express = require('express');
const app = express();

app.use(express.json()); //middleware

let courses = []; //in-memory

//home router
app.get("/courses", function(req, res){
    res.json(courses);
});

app.post("/courses/:id", function(req,res){
    const {title, totalVideos}=req.body;

    //validation
    if(!title || !totalVideos){
        return res.status(404).json({message: 'Title and totalVideeos are required.'})
    }
    const newCourse={
        id: Date.now(), //id
        title,
        totalVideos,
        completedVideos:0
    };
    courses.push(newCourse);
    res.status(201).json({
        message: 'Course added successfully!',
        course: newCourse
    });
});

//update
app.put("/courses/:id", function(req, res){
    //id
    const id = parseInt(req.params.id);
    const completedVideos = req.body.completedVideos;

    //find course by id
    const course = courses.find(c=>c.id === id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    //validate complereVideos
    if(typeof completedVideos !== 'number' || completedVideos <0 || completedVideos > course.totalVideos){
         return res.status(400).json({ message: 'Invalid completedVideos count' });
    }
    // Update the course
    course.completedVideos = completedVideos;
      res.json({
        message: 'Course progress updated!',
        course
    });
});

//delete
app.delete("/courses/:id", function(req, res){
    //find id from url
    const id = parseInt(req.params.id);
    //find index
    const courseIndex = courses.findIndex(c=>c.id === id);

    //if course not found
    if(courseIndex === -1){
        return res.status(404).json({message: "Course not found "})
    }
    //remove the course from array
    const deletedCourse = courses.splice(courseIndex, 1)[0];
    res.json({
        message: "Course deleted successfully!",
        course: deletedCourse
    });
});
//get a single course by id
app.get("/courses/:id", function(req, res){
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
});

app.listen(3000, function(req, res){
    console.log("reunning....");
})