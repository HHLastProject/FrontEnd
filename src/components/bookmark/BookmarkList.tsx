import React, { useEffect, useState } from 'react'
import { HFlex, VFlex } from '../../custom/ym/styleStore'
import { FILTER_LIST, SAMPLE_DATA } from '../../custom/ym/variables'
import BookmarkCard from '../ui/element/cards/BookmarkCard'
import { Categorys } from '../ui/element/tags/Categorys'
import uuid from 'react-uuid'
import { categoryTypes } from '../../custom/ym/types'
import BookmarkLoginComp from './BookmarkLoginComp'
import BookmarkLogoutComp from './BookmarkLogoutComp'

const BookmarkList = () => {
    const [category, setCategory] = useState<categoryTypes | null>(null);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const categoryClickHandler = (
        e: React.MouseEvent<HTMLButtonElement>,
        element: categoryTypes
    ) => {
        if (isLogin) {
            element === category
                ? setCategory(null)
                : setCategory(element)
        } else;
    }

    useEffect(() => {
        localStorage.getItem("access_token") && setIsLogin(prev => !prev);
        console.log(isLogin);
    }, [])

    return (
        <>
            <HFlex gap='2px' height='fit-content' etc="padding:8px 20px;">
                {FILTER_LIST.map((element) => {
                    if (category === element) {
                        return (
                            <Categorys.Active
                                key={uuid()}
                                name={element}
                                onClick={(e) => categoryClickHandler(e, element)}
                            >{element}</Categorys.Active>
                        );
                    } else {
                        return (
                            <Categorys.Inactive
                                key={uuid()}
                                name={element}
                                onClick={(e) => categoryClickHandler(e, element)}
                            >{element}</Categorys.Inactive>
                        )
                    }
                })}
            </HFlex>
            {
                isLogin
                    ? <BookmarkLoginComp categoryState={category} />
                    : <BookmarkLogoutComp />
            }
        </>
    )
}

export default BookmarkList