import React from 'react'
import { useParams } from 'react-router-dom'

function ShopDetail() {
  const param = useParams().shopId;

  return (
    <div>ShopDetail</div>
  )
}

export default ShopDetail