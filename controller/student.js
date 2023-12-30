const router = require("express").Router();
const studentModel = require("../model/student");

//get all students
router.get("/", async (req, res) => {
    try {
        const data = await studentModel.find().lean();
        if (data) res.status(200).json(data);
        else res.status(404).json({ message: "no data available" });
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
});

//get a student
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const student = await studentModel.findOne({ studentId: id });

        if (!student) res.status(404).json({ message: "this student doesnot exist" });
        else res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
});

//add a new student
router.post("/add", async (req, res) => {
    console.log("haiii");
    try {
        const id = req.body.studentId;

        const existingStudent = await studentModel.findOne({ studentId: id });

        if (!existingStudent) {
            const data = new studentModel({
                name: req.body.name,
                studentId: req.body.studentId,
                Class: req.body.Class,
            });
            const response = await data.save();

            res.status(200).json(response);
        } else {
            res.status(403).json({ message: "studentId already exists" });
        }
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
});

//update a student's details
router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const { name, Class } = req.body;
    try {
        const student = await studentModel.updateOne(
            { studentId: id },
            {
                $set: {
                    name,
                    Class,
                },
            }
        );
        if (student.nModified === 0) {
            return res.status(404).json({ error: "Student not found or no modifications were made" });
        }
        res.json({ message: "Student updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
});

//delete a student
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deleteStudent = await studentModel.deleteOne({ studentId: id });
        if (deleteStudent.deletedCount === 0) {
            return res.status(404).json({ error: "Student not found or no deletions were made" });
        }

        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
});

module.exports = router;
