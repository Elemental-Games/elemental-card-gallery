import { exec } from 'child_process';

console.log('Starting card conversion process...');

exec('node src/utils/excelToJson.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
  console.log('Card conversion process completed successfully.');
});