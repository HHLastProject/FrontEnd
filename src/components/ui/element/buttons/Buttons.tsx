import React from 'react'
import { BtnPosition } from './BtnPosition'
import { BtnRadius } from './BtnRadius'
import { BtnBg } from './BtnBg'
import { BtnTextColor, ChildrenForBtnContents } from './BtnContent'
import { BtnBorder } from './BtnBorder'
import { BtnSize } from './BtnSize'
import { BtnLargeLength, BtnMediumLength, BtnSmallLength } from './BtnLength'
import { BtnText } from './BtnText'


const Default = ({ children }: ChildrenForBtnContents) => {
    return (
        <BtnRadius.Default>
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

const Inactive = ({ children }: ChildrenForBtnContents) => {
    return (
        <BtnRadius.Default>
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

const Done = ({ children }: ChildrenForBtnContents) => {
    return (
        <BtnRadius.Default>
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

const Apply = ({ children }: ChildrenForBtnContents) => {
    return (
        <BtnRadius.Default>
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

const Init = ({ children }: ChildrenForBtnContents) => {
    return (
        <BtnRadius.Default>
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

const ShowAll = ({ children }: ChildrenForBtnContents) => {
    return (
        <BtnRadius.Default>
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

const MediumDefault = ({ children }: ChildrenForBtnContents) => {
    return (
        <BtnRadius.Others>
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

const SmallDefault = ({ children }: ChildrenForBtnContents) => {
    return (
        <BtnRadius.Others>
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

export const Buttons = {
    Large, Medium, Small
}
