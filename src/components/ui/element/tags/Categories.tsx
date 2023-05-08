import React from 'react'
import { Round, TagRadius } from './TagRadius';
import { Paint, TagBg } from './TagBg';
import { CategorySizing, TagSize } from './TagSize';
import { TagTextColor, WhiteText } from './TagTextColor';
import { TagContent } from './TagContent';
import { CategoryStateProp, ChildrenForBtnContents, InternalJSX, NavStateProp } from '../../../../custom/ym/types';
import { BtnPropertyThrower, Buttons } from '../buttons/Buttons';
import styled from 'styled-components';

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

export const Categories = { Inactive, Active };
