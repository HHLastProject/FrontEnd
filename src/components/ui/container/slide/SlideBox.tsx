import React, { useRef, useState } from 'react'
import styled from 'styled-components'

const SlideBox = ({ children, ...props }: React.ComponentPropsWithRef<'div'>) => {
    const [isdragging, setIsdragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [scrollX, setScrollX] = useState<number>(0);
    const [diff, setDiff] = useState<number>(0);
    const boxRef = useRef<HTMLDivElement>(null);

    const box = boxRef.current;

    const mouseDownHandler = (e: React.TouchEvent<HTMLDivElement>) => {
        setIsdragging(true);
        setStartX(e.touches[0].pageX);
    }

    const mouseMoveHandler = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isdragging) return;

        if (box) {
            setDiff(e.touches[0].pageX - startX);
            box.scrollTop = scrollX - diff;
        }
    }

    const mouseUpHandler = (e: React.TouchEvent<HTMLDivElement>) => {
        setIsdragging(false);
        box && setScrollX(box.scrollTop);
    }

    // const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    // }

    // const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //     setDragStart(e.clientX);
    // }

    // const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //     setDistance(e.clientX - dragStart);
    // }

    // const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //     const result = e.clientX - dragStart;
    //     setDistance(result);
    // }


    return (
        <SlideContainer
            ref={boxRef}
            // onTouchStart={mouseDownHandler}
            // onTouchMove={mouseMoveHandler}
            // onTouchEnd={mouseUpHandler}
            draggable={false}
        // diff={diff}
        >
            <SlideContents draggable={false}>{children}</SlideContents>
        </SlideContainer>
    )
}

export default SlideBox

const SlideContainer = styled.div`
    width: 100%;
    height: fit-content;
    background-color: transparent;
    flex-wrap: nowrap;
    overflow-x: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`

const SlideContents = styled.div`
    display: flex;
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    flex-wrap: nowrap;
`