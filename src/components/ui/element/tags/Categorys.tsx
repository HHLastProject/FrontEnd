import React from 'react'
import { ChildrenForBtnContents } from '../buttons/BtnContent';
import { TagRadius } from './TagRadius';
import { TagBg } from './TagBg';
import { TagSize } from './TagSize';
import { TagTextColor } from './TagTextColor';
import { TagContent } from './TagContent';
import { TagBorder } from './TagBorder';

const Inactive = ({ children }: ChildrenForBtnContents) => {
    return (
        <TagBorder.LineMedium>
            <TagRadius.Default>
                <TagBg.LineLight>
                    <TagSize.Category>
                        <TagTextColor.TextMedium>
                            <TagContent.Default>
                                {children}
                            </TagContent.Default>
                        </TagTextColor.TextMedium>
                    </TagSize.Category>
                </TagBg.LineLight>
            </TagRadius.Default>
        </TagBorder.LineMedium>
    );
}

const Active = ({ children }: ChildrenForBtnContents) => {
    return (
        <TagRadius.Default>
            <TagBg.LineLight>
                <TagSize.Category>
                    <TagTextColor.TextMedium>
                        <TagContent.Default>
                            {children}
                        </TagContent.Default>
                    </TagTextColor.TextMedium>
                </TagSize.Category>
            </TagBg.LineLight>
        </TagRadius.Default>
    );
}

export const Categorys = { Inactive, Active };