import React from 'react'
type Prop = {
    isExpanded: boolean,
    children: string,
}
const FeedComment = ({ isExpanded, children }: Prop) => {
    console.log(children.length);
    const subString = children.slice(0, 90) + '...';

    console.log('slice:', subString, subString.length);
    console.log('children:', children, children.length);
    // console.log(a, a.length);
    return (
        <div>{isExpanded ? children : subString}</div>
    )
}

export default FeedComment