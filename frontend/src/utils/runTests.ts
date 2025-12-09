import { runTests } from "./validationTests";
import * as fs from 'fs';
import * as path from 'path';

console.log("Starting validation tests...");
const results = runTests();
results.forEach(log => console.log(log));

const logPath = path.join(process.cwd(), 'validation_results.txt');
fs.writeFileSync(logPath, results.join('\n'), 'utf-8');
console.log(`\nResults saved to ${logPath}`);
