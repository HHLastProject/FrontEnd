import React from 'react'
type Prop = {
    isExpanded: boolean,
    children: string,
}
const FeedComment = ({ isExpanded, children }: Prop) => {
    const subString = children?.length > 86
        ? children.slice(0, 86) + '...'
        : children;

    // console.log('slice:', subString, subString.length);
    // console.log('children:', children, children.length);
    // console.log(a, a.length);
    return (
        <div>{isExpanded ? children : subString}</div>
    )
}

export default FeedComment