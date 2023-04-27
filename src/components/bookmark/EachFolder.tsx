import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import { HFlex, HFlexSpaceBetween, VFlex, VFlexCenter } from '../../custom/ym/styleStore';
import { BODY_1 } from '../../custom/ym/variables';
import { Buttons } from '../ui/element/buttons/Buttons';
import { colorSet } from '../ui/styles/color';
import { EachFolderProps } from '../../custom/ym/types';

const EachFolder = ({
    name,
    dispatch,
    index,
    // onDragStart,
    // onDrag,
    // onDragEnd,
    // onDragOver,
    ...props }: EachFolderProps) => {

    // const triggerRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isDragged, setIsDragged] = useState<boolean>(false);
    console.log('index:', index);

    const deleteClickHandler = () => {
        dispatch(prev => [...prev].filter((element) => element !== name));
    }

    const downClickHandler = (index: number) => {
        console.log(index);
        dispatch(prev => {
            // console.log(`prev: ${prev.length}, index: ${index+1}`)
            if (prev.length === index + 1) {
                return prev;
            } else {
                const temp = [...prev];
                const prevValue = temp[index];
                temp[index] = temp[index + 1];
                temp[index + 1] = prevValue;
                return temp;
            }
        });
    }
    // const test = () => {
    //     setIsDragged(true);
    //     console.log('isDragged:', isDragged);
    // }
    // const test1 = () => {
    //     setIsDragged(false);
    //     console.log('isDragged:', isDragged);
    // }
    // const dragstart = (e: React.DragEvent<HTMLDivElement>) => {
    //     console.log(e.target);
    //     console.log(triggerRef.current);
    //     e.target === triggerRef.current ? console.log("동일함") : console.log("다름");
    // }

    return (
        <Container
            // onDragStart={onDragStart}
            // onDrag={onDrag}
            // onDragOver={onDragOver}
            // onDragEnd={onDragEnd}
            draggable
        >
            <VFlexCenter>
                <HFlexSpaceBetween height='56px' etc='flex:1;'>
                    <FolderName>{name}</FolderName>
                    <HFlex gap="16px" width='fit-content'>
                        <Buttons.Others.IconButton
                            width={24}
                            height={24}
                            onClick={deleteClickHandler}
                            fileName='delete_folder.png' />
                        <Buttons.Others.IconButton
                            ref={triggerRef}
                            width={24}
                            height={24}
                            onClick={() => downClickHandler(index)}
                            // onDragStartCapture={() => { }}
                            // onMouseDown={test}
                            // onMouseUp={test1}
                            fileName='pulling_bar.png' />
                    </HFlex>
                </HFlexSpaceBetween>
                <Bar />
            </VFlexCenter>
        </Container >
    )
}

export default EachFolder;
const Bar = styled.div`
    flex : none;
    width: 353px;
    height: 1px;
    margin: 0;
    padding: 0;
    background-color: ${colorSet.lineLight};
`
const FolderName = styled.span`
    font-size: ${BODY_1.fontSize};
    line-height: ${BODY_1.lineHeight};
    font-weight: ${BODY_1.fontWeight};
    color : black;
`

const Container = styled.div`
    width: 100%;
    height: 56px;
    padding: 0px 20px;
    background-color: white;
    box-sizing: border-box;
`