const db = require('../config/dbConfig');

const employeeModel = {
  getAllEmployees: async() => {
    const [result] = await db.query('SELECT * FROM employee');
    return result;
  },

  getEmployeeById: async (employeeId) => {
    const query = 'SELECT * FROM employee WHERE employee_id = ?';
    
    try {
        // Log the exact SQL query with the trimmed employeeId
        console.log(`Executing query: ${query.replace('?', `'${employeeId.trim()}'`)}`);
        
        const [rows] = await db.execute(query, [employeeId.trim()]);
        console.log(`Rows returned: ${JSON.stringify(rows)}`);
        
        return rows[0]; // Return the first matching row
    } catch (err) {
        console.error('Database query error:', err); // Log any SQL errors
        throw err; // Re-throw the error to handle it in the controller
    }
  },

  createEmployee: (data, callback) => {
    const query = 'INSERT INTO employees (name, email, phone, department, branch, ...) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [data.name, data.email, data.phone, data.department, data.branch], callback);
  },

  updateEmployee: (id, data, callback) => {
    const query = 'UPDATE employees SET name = ?, email = ?, phone = ?, department = ?, branch = ? WHERE id = ?';
    db.query(query, [data.name, data.email, data.phone, data.department, data.branch, id], callback);
  },

  deleteEmployee: (id, callback) => {
    db.query('DELETE FROM employees WHERE id = ?', [id], callback);
  }
};

module.exports = employeeModel;