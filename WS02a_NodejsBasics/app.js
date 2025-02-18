const maths=require('./math');
const stringUtils = require('./stringUtils');
const dateUtils = require('./dateUtils');

console.log("Hello World!");
console.log("\nInside maths variable : ");
console.log(maths);
console.log("\nSum is " +maths.add(7,7));
console.log("Subtraction is " +maths.subtract(7,7));

console.log("\nUpper case: " +stringUtils.toUpperCase("hello world"));
console.log("Reverse string: " +stringUtils.reverseString("hello world"));

const today = new Date();
console.log("\nCurrent date: " +dateUtils.getCurrentDate(today));
console.log("Formatted date: " +dateUtils.formatDate(today));