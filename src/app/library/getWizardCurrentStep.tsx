/*
** Compares a given link to an array of links in a multiple page wizard and
** returns its current position in the array which the wizard uses to track
** the current step of the user.
**
** @link <string> - a link to be matched in an array of links
** @linkArray <string[]> - an array of links that make up a multipage wizard stored as 
** strings
*/
export default function getWizardCurrentStep(link: string, linkArray: string[]) {
    // Default to array position 0 if no matches found
    let arrayPosition = 0;

    for (let i = 0; i < linkArray.length; i++) {
        if(link === linkArray[i]) {
            arrayPosition = i;
        }
    }

    return arrayPosition;
}