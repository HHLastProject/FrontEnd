import React from 'react'
import { BtnPosition } from './BtnPosition'
import { BtnRadius } from './BtnRadius'
import { BtnBg } from './BtnBg'
import { BtnTextColor } from './BtnContent'
import { BtnBorder } from './BtnBorder'
import { BtnSize } from './BtnSize'
import { BtnLargeLength, BtnMediumLength, BtnSmallLength } from './BtnLength'
import { BtnText } from './BtnText'
import BtnNavContents from './BtnNavContents'
import { BtnNavProps, CategoryStateProp, ChildrenForJSX, DivProp, InternalJSX, NavButtonInputLimit, NavStateProp } from '../../../../custom/ym/types'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'



/*
버튼 property 전달 component
*/

export const BtnPropertyThrower = ({ children, isActive = false, id, ...props }: NavStateProp) => {
    return <Thrower isActive={isActive} id={id} {...props}>{children}</Thrower>
}


const Thrower = styled.button<{ isActive?: boolean }>`
    flex : none;
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    border : none;
    padding: 0px;
    margin : 0px;
`

/*
*****************
Large 사이즈 버튼
*****************
*/

const Default = ({ onClick, children }: InternalJSX) => {
    return (
        <BtnRadius.Default onClick={onClick}>
            <BtnLargeLength.Long>
                <BtnSize.Large>
                    <BtnBg.Gray>
                        <BtnPosition.Center>
                            <BtnText.Large>
                                <BtnTextColor.White>
                                    {children}
                                </BtnTextColor.White>
                            </BtnText.Large>
                        </BtnPosition.Center>
                    </BtnBg.Gray>
                </BtnSize.Large>
            </BtnLargeLength.Long>
        </BtnRadius.Default>
    );
};

const Inactive = ({ onClick, children }: InternalJSX) => {
    return (
        <BtnRadius.Default onClick={onClick}>
            <BtnLargeLength.Long>
                <BtnSize.Large>
                    <BtnBg.Lightgray>
                        <BtnPosition.Center>
                            <BtnText.Large>
                                <BtnTextColor.White>
                                    {children}
                                </BtnTextColor.White>
                            </BtnText.Large>
                        </BtnPosition.Center>
                    </BtnBg.Lightgray>
                </BtnSize.Large>
            </BtnLargeLength.Long>
        </BtnRadius.Default>
    );
};

const Done = ({ onClick, children }: InternalJSX) => {
    return (
        <BtnRadius.Default onClick={onClick}>
            <BtnLargeLength.Long>
                <BtnSize.Large>
                    <BtnBg.Black>
                        <BtnPosition.Center>
                            <BtnText.Large>
                                <BtnTextColor.White>
                                    {children}
                                </BtnTextColor.White>
                            </BtnText.Large>
                        </BtnPosition.Center>
                    </BtnBg.Black>
                </BtnSize.Large>
            </BtnLargeLength.Long>
        </BtnRadius.Default>
    );
};

const Apply = ({ onClick, children }: InternalJSX) => {
    return (
        <BtnRadius.Default onClick={onClick}>
            <BtnLargeLength.Medium>
                <BtnSize.Large>
                    <BtnBg.Gray>
                        <BtnPosition.Center>
                            <BtnText.Large>
                                <BtnTextColor.White>
                                    {children}
                                </BtnTextColor.White>
                            </BtnText.Large>
                        </BtnPosition.Center>
                    </BtnBg.Gray>
                </BtnSize.Large>
            </BtnLargeLength.Medium>
        </BtnRadius.Default>
    );
};

const Init = ({ onClick, children }: InternalJSX) => {
    return (
        <BtnRadius.Default onClick={onClick}>
            <BtnLargeLength.Short>
                <BtnSize.Large>
                    <BtnBg.White>
                        <BtnPosition.Center>
                            <BtnText.Large>
                                <BtnTextColor.Black>
                                    {children}
                                </BtnTextColor.Black>
                            </BtnText.Large>
                        </BtnPosition.Center>
                    </BtnBg.White>
                </BtnSize.Large>
            </BtnLargeLength.Short>
        </BtnRadius.Default>
    );
};

const ShowAll = ({ onClick, children }: InternalJSX) => {
    return (
        <BtnRadius.Default onClick={onClick}>
            <BtnLargeLength.Long>
                <BtnSize.Large>
                    <BtnBg.Transparent>
                        <BtnPosition.Center>
                            <BtnText.Large>
                                <BtnTextColor.Gray>
                                    {children}
                                </BtnTextColor.Gray>
                            </BtnText.Large>
                        </BtnPosition.Center>
                    </BtnBg.Transparent>
                </BtnSize.Large>
            </BtnLargeLength.Long>
        </BtnRadius.Default>
    );
};

const Large = {
    Default,
    Inactive,
    Done,
    Apply,                  // 적용하기
    Init,                   // 초기화하기
    ShowAll                 // 전체보기
}


/*
******************
Medium 사이즈 버튼
******************
*/

const MediumDefault = ({ onClick, children }: InternalJSX) => {
    return (
        <BtnRadius.Others onClick={onClick}>
            <BtnMediumLength.Default>
                <BtnSize.Medium>
                    <BtnBg.White>
                        <BtnPosition.Center>
                            <BtnText.Medium>
                                <BtnTextColor.Black>
                                    {children}
                                </BtnTextColor.Black>
                            </BtnText.Medium>
                        </BtnPosition.Center>
                    </BtnBg.White>
                </BtnSize.Medium>
            </BtnMediumLength.Default>
        </BtnRadius.Others>
    );
};


const Medium = {
    Default: MediumDefault,
};



/*
******************
Medium 사이즈 버튼
******************
*/

const SmallDefault = ({ onClick, children }: InternalJSX) => {
    return (
        <BtnRadius.Others onClick={onClick}>
            <BtnSmallLength.Default>
                <BtnSize.Small>
                    <BtnBg.White>
                        <BtnPosition.Center>
                            <BtnText.Small>
                                <BtnTextColor.Black>
                                    {children}
                                </BtnTextColor.Black>
                            </BtnText.Small>
                        </BtnPosition.Center>
                    </BtnBg.White>
                </BtnSize.Small>
            </BtnSmallLength.Default>
        </BtnRadius.Others>
    );
};

const Small = {
    Default: SmallDefault
}



/*
*********************************************
하단 네비게이션바 버튼 
Boolean형 State(isActive)에 따라 활성화 결정됨
*********************************************
*/

const NavButtonGenerator = ({ onClick, isActive, btnType }: BtnNavProps) => {
    return (
        <BtnRadius.Default onClick={onClick} name={btnType}>
            <BtnSmallLength.Nav>
                <BtnSize.Nav>
                    <BtnBg.White>
                        <BtnPosition.Center>
                            <BtnNavContents isActive={isActive} btnType={btnType} />
                        </BtnPosition.Center>
                    </BtnBg.White>
                </BtnSize.Nav>
            </BtnSmallLength.Nav>
        </BtnRadius.Default>
    );
};


const NavButton = ({ isActive = true, onClick, name, ...props }: NavStateProp) => {
    return (
        <NavButtonGenerator
            name={name}
            onClick={onClick}
            isActive={isActive}
            btnType={name as NavButtonInputLimit}
        />
    )
}
// const List = ({ isActive = false, onClick, name, ...props }: NavStateProp) => {
//     return (
//         <NavButtonGenerator
//             onClick={onClick}
//             isActive={isActive}
//             btnType={name as NavButtonInputLimit}
//         />
//     )
// }
// const Feed = ({ isActive = false, onClick, name, ...props }: NavStateProp) => {
//     return (
//         <NavButtonGenerator
//             onClick={onClick}
//             isActive={isActive}
//             btnType={name as NavButtonInputLimit}
//         />
//     )
// }
// const Bookmark = ({ isActive = false, onClick, name, ...props }: NavStateProp) => {
//     return (
//         <NavButtonGenerator
//             onClick={onClick}
//             isActive={isActive}
//             btnType={name as NavButtonInputLimit}
//         />
//     )
// }
// const Mypage = ({ isActive = false, onClick, name, ...props }: NavStateProp) => {
//     return (
//         <NavButtonGenerator
//             onClick={onClick}
//             isActive={isActive}
//             btnType={name as NavButtonInputLimit}
//         />
//     )
// }

// const Others = { Home, List, Feed, Bookmark, Mypage };
const Others = { NavButton };

export const Buttons = {
    Large, Medium, Small, Others
}




