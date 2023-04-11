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
        <div className="home-postcard-content-wrap">
          <h4>{shopName}</h4>
          <label className="address">{address}</label>
          <div>
            <span>
              <label className="bold">{202}</label>
              <label>m</label>
            </span>
            <span>
              <label>별점</label>
              <label className="bold">{4.8}</label>
            </span>
            <span>
              <label>리뷰</label>
              <label className="bold">{10}</label>
            </span>
          </div>
        </div>
      </HomeShopPostCardContainer>
    </Link>
  );
};

export default HomeShopPostCard;

const HomeShopPostCardContainer = styled.div`
  width: 100%;
  height: 268px;
  border-radius: 5px 40px 5px 5px;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.1);
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.15));
  overflow: hidden;
  background-color: #ffffff;
  .home-postcard-thumbnail {
    width: 100%;
    height: 172px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: #ffffff;
    img {
      width: 100%;
      bottom: 50%;
      object-fit: cover;
    }
  }
  .home-postcard-content-wrap {
    width: 100%;
    height: 100%;
    padding: 16px 20px;
    h4 {
      font-size: 16px;
      font-weight: 600;
    }
  }
`;