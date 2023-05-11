import React from 'react'
import { ShopData } from '../../../custom/ym/variables'

const SearchedCafe = ({ arr }: { arr: ShopData[] }) => {
    return (
        <div style={{ fontSize: '12px', fontWeight: '400' }}>
            <span>검색된 카페 </span>
            <span>{arr.length}</span>
        </div>
    )
}

export default SearchedCafe