import React from 'react'
import { ChildrenForBtnContents } from '../buttons/BtnContent';
import { TagRadius } from './TagRadius';
import { TagBg } from './TagBg';
import { TagSize } from './TagSize';
import { TagTextColor } from './TagTextColor';
import { TagContent } from './TagContent';

const Inactive = ({ children }: ChildrenForBtnContents) => {
    return (
        <TagRadius.Default>
            <TagBg.LineLight>
                <TagSize.Tag>
                    <TagTextColor.TextMedium>
                        <TagContent.Default>
                            {children}
                        </TagContent.Default>
                    </TagTextColor.TextMedium>
                </TagSize.Tag>
            </TagBg.LineLight>
        </TagRadius.Default>
    );
}

const Active = ({ children }: ChildrenForBtnContents) => {
    return (
        <TagRadius.Default>
            <TagBg.Primary01>
                <TagSize.Tag>
                    <TagTextColor.White>
                        <TagContent.Default>
                            {children}
                        </TagContent.Default>
                    </TagTextColor.White>
                </TagSize.Tag>
            </TagBg.Primary01>
        </TagRadius.Default>
    );
}

const Default = ({ children }: ChildrenForBtnContents) => {
    return (
        <TagRadius.Default>
            <TagBg.BgMedium>
                <TagSize.Tag>
                    <TagTextColor.TextStrongMedium>
                        <TagContent.Default>
                            {children}
                        </TagContent.Default>
                    </TagTextColor.TextStrongMedium>
                </TagSize.Tag>
            </TagBg.BgMedium>
        </TagRadius.Default>
    );
}

export const Tags = { Inactive, Active, Default };