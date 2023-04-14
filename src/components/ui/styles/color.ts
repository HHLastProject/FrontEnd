/* Color 관련 변수 및 객체 */

const setColor = (code: string) => {
    return `#${code}`;
}


export const colorSet = {
    textStrong: setColor('191919'),
    textStrongMedium: setColor('2E3338'),
    textMedium: setColor('717176'),
    textLight: setColor('A1A1Ac'),
    primary_01: setColor('767676'),
    primary_02: setColor('ADADAD'),
    bgMedium: setColor('F1F1F5'),
    bgLight: setColor('F8F8FA'),
    lineStrong: setColor('909096'),
    lineMedium: setColor('DBDBDB'),
    lineLight: setColor('EDEDED'),
}