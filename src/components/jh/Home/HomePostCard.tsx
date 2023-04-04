import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { path } from "../../../shared/path";


export interface IShopPostList {
    id:number;
    address:string;
    shopName:string;
    thumbnail:string;
    menuName:string;
    maxPrice:number;
    minPrice:number;
    category:string;
  }

function HomeShopPostCard (
  {
    id,
    address,
    shopName,
    thumbnail,
    menuName,
    maxPrice,
    minPrice,
    category,
  } : IShopPostList) {
  
  const [imgSrc, setImgSrc] = useState(thumbnail);

  const onErrorImg = () => {
    setImgSrc(`${process.env.PUBLIC_URL}/shop-default-img.jpg`);
  }

  return (
    <Link to={`${path.toShopDetail}/${id}`}>
      <HomeShopPostCardContainer>
        <div className="home-postcard-thumbnail">
          <img 
            src={imgSrc} 
            alt={shopName} 
            onError={onErrorImg}
          />
        </div>
        <div className="home-postcard-content">
          <h4>{shopName}</h4>
          <label>{address}</label>
          <label>{menuName}</label>
          <span>
            <label>최소주문</label>
            <label>{minPrice}</label>
          </span>
        </div>
      </HomeShopPostCardContainer>
    </Link>
  );
};

export default HomeShopPostCard;

const HomeShopPostCardContainer = styled.div`
  width: 300px;
  height: 200px;
  border: 1px solid;
  border-radius: 5px 20px 5px 5px;
  overflow: hidden;
  .home-postcard-thumbnail {
    width: 100%;
    height: 50%;
    background-color: #ffd0d0;
    overflow: hidden;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
`;