const btnSubmit = document.querySelector("#btn-submit");
const birthday = document.querySelector('#birthday');
const output = document.querySelector('#output');

function isPalindrome(str) {
    return str === str.split("").reverse().join("")
}

var input = { day: 29, month: 2, year: 2020 };

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

console.log(dateToStringConverter(input));

function dateFormats(date) {

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

function checkPalindromeForAllDateFormats() {

    const inputDate = birthday.value.split("-");
    console.log(inputDate);
    
    //getting list of date formats for checking palindrome
    const dates = dateFormats({
        day: inputDate[2],
        month: inputDate[1],
        year: inputDate[0]
    });
    // const dates = dateFormats(input);
    console.log(dates); 

    const flag = dates.some(date => isPalindrome(date))
    
    console.log(flag);
    if (flag) {
        output.innerHTML = `<h3>Yay! Your birthday is palindrome!</h3>`;
    } else {

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

function findNextPalindromeDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
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

// 24-05-2021
console.log(findNextPalindromeDate(input));
// checkPalindromeForAllDateFormats();

btnSubmit.addEventListener('click', checkPalindromeForAllDateFormats)