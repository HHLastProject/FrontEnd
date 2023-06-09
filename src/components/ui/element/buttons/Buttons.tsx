import { BtnPosition } from './BtnPosition'
import { BtnRadius } from './BtnRadius'
import { BtnBg } from './BtnBg'
import { BtnTextColor } from './BtnContent'
import { BtnSize } from './BtnSize'
import { BtnLargeLength, BtnMediumLength, BtnSmallLength } from './BtnLength'
import { BtnText } from './BtnText'
import BtnNavContents from './BtnNavContents'
import { BtnNavProps, EditNicknameProps, InternalJSX, NavButtonInputLimit, NavStateProp } from '../../../../custom/ym/types'
import styled from 'styled-components'
import { colorSet } from '../../styles/color'



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

const A = ({ onClick, children }: InternalJSX) => {
    return (
        <BtnRadius.Default onClick={onClick}>
            <BtnLargeLength.Short>
                <BtnSize.Small>
                    <BtnBg.White>
                        <BtnPosition.Center>
                            <BtnText.Medium>
                                <BtnTextColor.White>
                                    {children}
                                </BtnTextColor.White>
                            </BtnText.Medium>
                        </BtnPosition.Center>
                    </BtnBg.White>
                </BtnSize.Small>
            </BtnLargeLength.Short>
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


const Refresh = ({ onClick, children }: InternalJSX) => {
    return (
        <Wrapper onClick={onClick}>
            <BtnMediumLength.Default>
                <BtnSize.Medium>
                    <BtnBg.White>
                        <BtnPosition.Center>
                            <BtnText.Medium>
                                <BtnTextColor.Gray>
                                    {children}
                                </BtnTextColor.Gray>
                            </BtnText.Medium>
                        </BtnPosition.Center>
                    </BtnBg.White>
                </BtnSize.Medium>
            </BtnMediumLength.Default>
        </Wrapper>
    );
};

const Medium = {
    Default: MediumDefault, Refresh,
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

const IconButton = ({ width, height, onClick, fileName, ...props }: EditNicknameProps) => {
    return (
        <BtnRadius.Default onClick={onClick} {...props}>
            <IconContainer width={width} height={height}>
                <Icon src={`${process.env.PUBLIC_URL}/icon/${fileName}`} alt="Icon" />
            </IconContainer>
        </BtnRadius.Default>
    )
}

const AimButton = ({ width, height, onClick, fileName, ...props }: EditNicknameProps) => {
    return (
        <BtnRadius.Aim onClick={onClick} {...props}>
            <IconContainer width={width} height={height}>
                <Icon src={`${process.env.PUBLIC_URL}/icon/${fileName}`} alt="Icon" />
            </IconContainer>
        </BtnRadius.Aim>
    )
}

const Others = { NavButton, IconButton, AimButton };

export const Buttons = {
    Large, Medium, Small, Others
}


const IconContainer = styled.div<{ width: number, height: number }>`
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
    background-color:transparent;
`

const Icon = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const Wrapper = styled(BtnRadius.Rounded)`
  &:hover > ${BtnMediumLength.Default} {
    > ${BtnSize.Medium} {
      > ${BtnBg.White} {
        background-color: ${colorSet.primary_01};
        > ${BtnPosition.Center} {
          > ${BtnText.Medium} {
            > ${BtnTextColor.Gray} {
              color: white;
            }
          }
        }
      }
    }
  }
`;