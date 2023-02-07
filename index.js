import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"this.max160",
  database:"studentdb2"
})

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
  res.json("Hello! This is Backend. GET REQUEST")
})
app.post("/",(req,res)=>{
  res.json("Hello! This is Backend.POST REQUEST")
})

app.get("/newstudents",(req,res)=>{
  const q = "SELECT * FROM newstudents"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.post("/newstudents",(req,res)=>{
  const q = "INSERT INTO newstudents (`id`,`name`,`age`,`course`,`year`) VALUES (?)"
  const values = [
    req.body.id,
    req.body.name,
    req.body.age,
    req.body.course,
    req.body.year
    // "id",
    // "name from backend",
    // "age from backend",
    // "course from backend",
    // "year from backend",
  ];
  db.query(q, [values], (err,data)=>{
    if(err) return res.json(err)
    return res.json("Student added successfully!!")
  })
})

app.delete("/newstudents/:id",(req,res)=>{
  const studentId = req.params.id;
  const q = "DELETE FROM newstudents WHERE id=?"

  db.query(q, [studentId], (err,data)=>{
    if(err) return res.json(err)
    return res.json("Student deleted successfully!!")
  })
})

app.put("/newstudents/:id",(req,res)=>{
  const studentId = req.params.id;
  const q = "UPDATE newstudents SET `id`= ?, `name`= ?, `age`= ?, `course`= ?, `year`= ? WHERE id = ?";
  const values = [
    req.body.id,
    req.body.name,
    req.body.age,
    req.body.course,
    req.body.year
  ];

  db.query(q, [...values,studentId], (err,data)=>{
    if(err) return res.json(err)
    return res.json("Student data updated successfully!!")
  })
})

app.listen(8800, ()=>{
  console.log("Connected to backend!..now yes nodemon is also working")
})