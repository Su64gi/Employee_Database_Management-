const mysql = require("mysql2/promise");
const ExcelJS = require("exceljs");
const readline = require("readline");
require("dotenv").config({ path: "./server/.env" });

// create terminal input interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askFileName() {
  return new Promise((resolve) => {
    rl.question("Enter Excel file name (inside exports folder): ", (answer) => {
      resolve(answer);
    });
  });
}

async function deleteFromExcel(fileName) {

  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  const workbook = new ExcelJS.Workbook();

  const filePath = `./exports/${fileName}`;

  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1);

  const ids = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      ids.push(row.getCell(1).value);
    }
  });

  console.log("IDs found:", ids);

  await db.query(
    `DELETE FROM employees WHERE id IN (?)`,
    [ids]
  );

  console.log("Deleted successfully");

  await db.end();
  rl.close();
}

// run program
(async () => {
  const fileName = await askFileName();
  await deleteFromExcel(fileName);
})();