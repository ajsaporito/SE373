const db = require('./models/db');
const api = require('./api');
const app = require('./middleware');
const PORT = 3000;

app.get('/', (req, res) => {
  res.render('index', {
    title: "Add an Employee"
  })
});

app.get('/view', async (req, res) => {
  const response = await fetch('http://localhost:3000/api/employees'); 
  const employees = await response.json();

  res.render('view', {
    title: "View Employees",
    employees
  })
});

app.get('/update/:id', async (req, res) => {
  const { id }  = req.params;
  const response = await fetch(`http://localhost:3000/api/employees/${id}`);
  const employee = await response.json();

  if (!response.ok) {
    return res.status(404).send('Page not found.');
  }

  const departments = [
    { name: 'Manager', selected: employee.department === 'Manager' },
    { name: 'Senior Dev', selected: employee.department === 'Senior Dev' },
    { name: 'Junior Dev', selected: employee.department === 'Junior Dev' },
  ];

  res.render('update', {
    title: "Update an Employee",
    employee,
    departments
  })
});

app.get('/delete', (req, res) => {
  const { firstName, lastName } = req.query;
  
  if (!firstName || !lastName) {
    return res.status(400).send("Bad request.");
  }
  
  res.render('delete', {
    title: "Deleted Employee",
    employee: { firstName, lastName }
  })
});

app.use('/api', api);

app.use((req, res) => {
  res.status(404).send("Page not found.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
