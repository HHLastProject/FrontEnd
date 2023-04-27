import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import EachFolder from './EachFolder';

const ListedFolders = ({ list, dispatch }: { list: string[], dispatch: React.Dispatch<React.SetStateAction<string[]>> }) => {

    // const containerRef = useRef<HTMLDivElement>(null); // 드래그 할 영역 네모 박스 Ref
    // const dragComponentRef = useRef<HTMLDivElement>(null); // // 움직일 드래그 박스 Ref
    // const [originPos, setOriginPos] = useState({ x: 0, y: 0 }); // 드래그 전 포지션값 (e.target.offset의 상대 위치)
    // const [clientPos, setClientPos] = useState({ x: 0, y: 0 }); // 실시간 커서위치인 e.client를 갱신하는값
    // const [pos, setPos] = useState({ left: 0, top: 0 }); // 실제 drag할 요소가 위치하는 포지션값

    // const compPosData = []

    // const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //     console.log(e.clientY);
    // }
    // const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //     console.log("드래그중:", e.clientY);
    // }
    // const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    // }
    // const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //     console.log(e.clientX);

    // }

    return (
        <ContentsContanier onClick={(e) => console.log('좌표:', e.clientY)}>
            {list.map((element, index) => {
                return <EachFolder
                    // ref={dragComponentRef}
                    name={element}
                    dispatch={dispatch}
                    index={index}
                // onDragStart={dragStartHandler}
                // onDrag={dragHandler}
                // onDragOver={dragOverHandler}
                // onDragEnd={dragEndHandler}
                // draggable
                />
            }
            )}
        </ContentsContanier>
    )
}

export default ListedFolders;

const ContentsContanier = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 100%;
    background-color: white;
`