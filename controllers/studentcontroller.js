// Fake in-memory data (for teaching)
let students = [
  { id: 1, name: 'Amit' },
  { id: 2, name: 'Riya' }
];

// GET /students
exports.getAllStudents = (req, res) => {
  res.json(students);
};

// GET /students/:id
exports.getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json(student);
};

// POST /students
exports.createStudent = (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
};

// PUT /students/:id
exports.updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  student.name = req.body.name;
  res.json(student);
};

// DELETE /students/:id
exports.deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: 'Student deleted' });
};
