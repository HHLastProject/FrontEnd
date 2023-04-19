import React from 'react'
import { TagRadius } from './TagRadius';
import { TagBg } from './TagBg';
import { TagSize } from './TagSize';
import { TagTextColor } from './TagTextColor';
import { TagContent } from './TagContent';
import { CategoryStateProp, ChildrenForBtnContents, InternalJSX, NavStateProp } from '../../../../custom/ym/types';
import { BtnPropertyThrower, Buttons } from '../buttons/Buttons';

const Inactive = ({ children, isActive = false, ...props }: NavStateProp) => {
    return (
        <BtnPropertyThrower {...props}>
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
        </BtnPropertyThrower>
    );
}

const Active = ({ children, isActive = false, ...props }: NavStateProp) => {
    return (
        <BtnPropertyThrower {...props}>
            <TagRadius.BorderColor>
                <TagBg.Primary01>
                    <TagSize.Category>
                        <TagTextColor.White>
                            <TagContent.Default>
                                {children}
                            </TagContent.Default>
                        </TagTextColor.White>
                    </TagSize.Category>
                </TagBg.Primary01>
            </TagRadius.BorderColor>
        </BtnPropertyThrower>
    );
}

export const Categorys = { Inactive, Active };
