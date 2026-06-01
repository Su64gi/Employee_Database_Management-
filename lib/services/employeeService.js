const ExcelJS =require("exceljs");
const employeeAction = async (db, action, data) => {

    // ======================
    // ADD EMPLOYEE
    // ======================
    if (action === "a") {

        const {
            user_id,
            name,
            email,
            department,
            salary
        } = data;

        await db.query(
            `INSERT INTO employees
            (user_id, name, email, department, salary)
            VALUES (?, ?, ?, ?, ?)`,
            [
                user_id,
                name,
                email,
                department,
                salary
            ]
        );

        return {
            message: "Employee Added"
        };
    }

    // ======================
    // READ EMPLOYEES
    // ======================
    else if (action === "r") {

        const { user_id } = data;

        const [rows] = await db.query(
            `SELECT * FROM employees
             WHERE user_id=?`,
            [user_id]
        );

        return rows;
    }

    // ======================
    // UPDATE EMPLOYEE
    // ======================
    else if (action === "u") {

        const {
            id,
            user_id,
            name,
            email,
            department,
            salary
        } = data;

        await db.query(
            `UPDATE employees
             SET name=?, email=?, department=?, salary=?
             WHERE id=? AND user_id=?`,
            [
                name,
                email,
                department,
                salary,
                id,
                user_id
            ]
        );

        return {
            message: "Employee Updated"
        };
    }

    // ======================
    // DELETE EMPLOYEE
    // ======================
    else if (action === "d") {

        const { id } = data;

        await db.query(
            `DELETE FROM employees
             WHERE id=?`,
            [id]
        );

        return {
            message: "Employee Deleted"
        };
    }

    else {
        throw new Error("Invalid Action");
    }
};

const exportEmployees =
async (db, userId) => {

  const [rows] =
  await db.query(

    `SELECT *
     FROM employees
     WHERE user_id=?`,

    [userId]
  );

  if (rows.length === 0) {

    return {
      message:
      "No Employee Records Found"
    };
  }

  const workbook =
  new ExcelJS.Workbook();

  const worksheet =
  workbook.addWorksheet(
    "Employees"
  );

  worksheet.columns = [

    {
      header: "ID",
      key: "id"
    },

    {
      header: "Name",
      key: "name"
    },

    {
      header: "Email",
      key: "email"
    },

    {
      header: "Department",
      key: "department"
    },

    {
      header: "Salary",
      key: "salary"
    }
  ];

  rows.forEach(
    row => worksheet.addRow(row)
  );

  const filePath =
  `exports/user_${userId}.xlsx`;

  await workbook.xlsx.writeFile(
    filePath
  );

  await db.query(

    `DELETE FROM employees
     WHERE user_id=?`,

    [userId]
  );

  return {

    message:
    "Excel Generated Successfully",

    file:
    filePath
  };
};
module.exports = {
    employeeAction,
    exportEmployees
};
