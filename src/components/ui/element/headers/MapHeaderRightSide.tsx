import React from 'react'
import { Link } from 'react-router-dom'
import { path } from '../../../../shared/path'
import { Buttons } from '../buttons/Buttons'

const MapHeaderRightSide = () => {
    return (
        <Link
            to={`${path.search}`}
            state={{ link: `${path.home}` }}
        >
            <Buttons.Others.IconButton
                name='search'
                width={24}
                height={24}
                fileName='search_24.png'
            />
            {/* <ButtonContainer>
                <Image src={`${process.env.PUBLIC_URL}/icon/search_24.png`} alt="" />
            </ButtonContainer> */}
        </Link>
    )
}

export default MapHeaderRightSide