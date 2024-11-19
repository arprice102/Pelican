/*
** Takes input string and returns sentence case whilst trimming whitespace
**
** @string <string> - a string 
*/
export default function toSentenceCase(string: string) {
    if (!string) return '';
    string = string.trim(); // Removes leading and trailing whitespace
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}