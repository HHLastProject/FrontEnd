/* Typograpy 관련 변수 및 객체 */

type FontFactors = {
    fontSize: string,
    lineHeight: string,
    fontWeight: string,
};

type SetFont = (fs: number, lh: number, fw: number) => FontFactors;

const setFont: SetFont = (fs, lh, fw) => {
    return {
        fontSize: `${fs}px`,
        fontWeight: `${fw}`,
        lineHeight: `${lh}px`,
    }
};


export const fontType = {
    heading_1: setFont(32, 40, 700),
    heading_2: setFont(28, 35, 700),
    title_1: setFont(24, 30, 600),
    title_2: setFont(20, 26, 600),
    title_3: setFont(18, 24, 600),
    title_4: setFont(16, 22, 600),
    title_5: setFont(14, 20, 600),
    body_1: setFont(16, 22, 400),
    body_2: setFont(15, 21, 400),
    body_3: setFont(14, 20, 400),
    body_4: setFont(13, 18, 400),
    body_5: setFont(12, 16, 400),
};