const btnSubmit = document.querySelector("#btn-submit");
const birthday = document.querySelector('#birthday');
const output = document.querySelector('#output');
var input = { day: 1, month: 1, year: 2020 };

function checkPalindromeForAllDateFormats(date) {

    //getting list of date formats for checking palindrome
    const dates = getDateInAllFormats(date);
    console.log(dates); 

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

function DateStringToNumberConverter(date) {
    return {
        day: Number(date.day),
        month: Number(date.month),
        year: Number(date.year)
    }
}

function isPalindrome(str) {
    return str === str.split("").reverse().join("")
}

function getNextDate(date) {


    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //0-11

    // check for February
    if (month === 2) { 
        // check for leap year
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

    // increment the year if month is greater than 12
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
    console.log("date", date);
    let convertedDate = DateStringToNumberConverter(date);
    let nextDate = getNextDate(convertedDate);
    console.log("nextDate", nextDate);
    
    while(1){
        counter++;
        let result = checkPalindromeForAllDateFormats(nextDate);
        console.log(result);
        if (result) {
            break;
        }
        nextDate = getNextDate(DateStringToNumberConverter(nextDate));
        console.log("loop", nextDate);
    }
    console.log(counter, nextDate);
}


// 24-05-2021
// console.log(getNextPalindromeDate(getNextDate(input)));
// checkPalindromeForAllDateFormats();

function getPreviousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3  && day < 1) {
        if (isLeapYear(year)){
            month = month - 1;
            day = daysInMonths[month -1] + 1;
        } else {
            month = month - 1;
            day = daysInMonths[month -1];
        }
    } else if (day < 1 && month === 1) {
        month = 12;
        day = daysInMonths[month - 1];
        year--;
    } else if (day < 1 && month > 1) {
        month = month - 1;
        day = daysInMonths[month -1];
    } 
    return {
        day,
        month,
        year
    }
}

/**
 * if(day < 1 && month === 1), 
 *  month = 12;
 *  day = daysInMonth[month-1]
 *  year--;
 * 
 *  if(day < 1 && month > 1)  
 *  month = month - 1,
 *  day = daysInMonth[month - 1]
 *  
 */
getPreviousDate(input);

function getPrevPalindromeDate(date) {
    let counter = 0;
    let convertedDate = DateStringToNumberConverter(date);
    console.log("convertedDate", convertedDate);
    let prevDate = getPreviousDate(convertedDate);
    console.log("prevDate", prevDate);
    while(1){
        counter++;
        let result = checkPalindromeForAllDateFormats(prevDate);
        if (result) {
            break;
        }
        let convertedDate = DateStringToNumberConverter(prevDate);
        prevDate = getPreviousDate(convertedDate);
    }
    console.log(counter, prevDate);
}

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

        getPrevPalindromeDate(date)
    }
}   

btnSubmit.addEventListener('click', clickHandler)