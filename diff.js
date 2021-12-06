var firstDate= new Date('01-01-2020');
var secondDate= new Date('12-06-2021');


timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

console.log(differentDays);

