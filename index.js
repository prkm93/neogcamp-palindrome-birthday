const btnSubmit = document.querySelector("#btn-submit");
const birthday = document.querySelector('#birthday');

function reverseString(str) {
    return str.split("").reverse().join("");
}

function isPalindrome(str) {
    return str === str.split("").reverse().join("")
}

var input = { day: 10, month: 9, year: 2020 };

function dateToStringConverter(date) {

    let day = date.day.toString();
    let month = date.month.toString();
    let year = date.year.toString();

    return {
        day: day < 10 ? day.padStart(2, '0'): day,
        month: month < 10 ? month.padStart(2, '0'): day,
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

function checkPalindromeForAllDateFormats(date) {

}

console.log(dateFormats(input));

btnSubmit.addEventListener('click', checkPalindrome);