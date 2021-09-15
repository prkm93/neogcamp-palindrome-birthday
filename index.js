const btnSubmit = document.querySelector("#btn-submit");
const birthday = document.querySelector('#birthday');
const output = document.querySelector('#output');


function checkPalindromeForAllDateFormats(date) {

    //getting list of date formats for checking palindrome
    const dates = getDateInAllFormats(date);
    // console.log(dates); 

    // checking for palindromes
    return dates.some(date => isPalindrome(date))
}

function getDateInAllFormats(date) {

    // DD-MM-YYYY
    // MM-DD-YYYY
    // YYYY-MM-DD
    // DD-MM-YY
    // MM-DD-YY
    // YY-MM-DD

    // converting date to string
    const convertedDate = dateToStringConverter(date);

    let day = convertedDate.day;
    let month = convertedDate.month;
    let year = convertedDate.year;

    let ddmmyyyy = day + month + year;
    let mmddyyyy = month + day + year;
    let yyyymmdd = year + month + day;
    let ddmmyy = day + month + year.slice(-2);
    let mmddyy = month + day + year.slice(-2);
    let yymmdd = year.slice(-2) + month + day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

}

function dateToStringConverter(date) {

    let day = date.day.toString();
    let month = date.month.toString();
    let year = date.year.toString();

    return {
        day: day < 10 ? day.padStart(2, '0'): day,
        month: month < 10 ? month.padStart(2, '0'): month,
        year: year
    }
}

function isPalindrome(str) {
    return str === str.split("").reverse().join("")
}

var input = { day: 11, month: 11, year: 2021 };

console.log(dateToStringConverter(input));

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) { // check for February
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        // check if days in month increases by max date
        if (day > daysInMonths[month-1]) { 
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day,
        month,
        year
    }
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }  
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextPalindromeDate(date) {
    let counter = 0;
    let nextDate = getNextDate(date);
    console.log("nextDate", nextDate);
    
    while(1){
        counter++;
        let result = checkPalindromeForAllDateFormats(nextDate);
        console.log(result);
        if (result) {
            // return [counter]
            break;
        }
        nextDate = getNextDate(nextDate);
        console.log("loop", nextDate);
    }
    console.log(counter, nextDate);
}


// 24-05-2021
// console.log(getNextPalindromeDate(getNextDate(input)));
// checkPalindromeForAllDateFormats();

function clickHandler() {

    const inputDate = birthday.value;

    const date = {
        day: inputDate.split("-")[2],
        month: inputDate.split("-")[1],
        year: inputDate.split("-")[0]
    } 
    console.log("intial date", date);
    const output = checkPalindromeForAllDateFormats(date);

    if (output) {
        console.log(output);
    } else {
        getNextPalindromeDate(date)
    }
}   

btnSubmit.addEventListener('click', clickHandler)