const { Pool } = require('pg');
const args = process.argv.slice(2);

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${args[0] || 'JUL02'}%'
ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`)
  })
});