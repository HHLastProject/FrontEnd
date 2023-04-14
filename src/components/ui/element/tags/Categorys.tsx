import React from 'react'
import { ChildrenForBtnContents } from '../buttons/BtnContent';
import { TagRadius } from './TagRadius';
import { TagBg } from './TagBg';
import { TagSize } from './TagSize';
import { TagTextColor } from './TagTextColor';
import { TagContent } from './TagContent';

const Inactive = ({ children }: ChildrenForBtnContents) => {
    return (
        <TagRadius.BorderColor>
            <TagBg.White>
                <TagSize.Category>
                    <TagTextColor.TextStrongMedium>
                        <TagContent.Default>
                            {children}
                        </TagContent.Default>
                    </TagTextColor.TextStrongMedium>
                </TagSize.Category>
            </TagBg.White>
        </TagRadius.BorderColor>
    );
}

const Active = ({ children }: ChildrenForBtnContents) => {
    return (
        <TagRadius.Default>
            <TagBg.Primary01>
                <TagSize.Category>
                    <TagTextColor.White>
                        <TagContent.Default>
                            {children}
                        </TagContent.Default>
                    </TagTextColor.White>
                </TagSize.Category>
            </TagBg.Primary01>
        </TagRadius.Default>
    );
}

export const Categorys = { Inactive, Active };