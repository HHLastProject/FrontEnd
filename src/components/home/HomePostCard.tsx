import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { imgPath, path } from "../../shared/path";
import { fontType } from "../ui/styles/typo";
import { colorSet } from "../ui/styles/color";

export interface IShopPostList {
  id:number;
  address:string;
  shopName:string;
  thumbnail:string;
  category:string;
};

function HomeShopPostCard (
  {
    id,
    address,
    shopName,
    thumbnail,
    category,
  } : IShopPostList) {
  
  const thumbnailUrl = `${imgPath.shopThumbnailImg + thumbnail}`;
  const [imgSrc, setImgSrc] = useState<string>(thumbnailUrl);

  const onErrorImg = () => {
    setImgSrc(`${process.env.PUBLIC_URL}/shop-default-img.jpg`);
  };

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
          <div className="postcard-content-bottom">
            <span>
              <label className="bold">{202}</label>
              <label>m</label>
            </span>
            <LineDiv/>
            <span>
              <label>피드</label>
              <label className="bold feed-count">{10}</label>
            </span>
          </div>
        </div>
      </HomeShopPostCardContainer>
    </Link>
  );
};

export default HomeShopPostCard;

const LineDiv = styled.div`
  width: 1px;
  height: 12px;
  display: inline-block;
  background-color: ${colorSet.lineMedium};
`;

const HomeShopPostCardContainer = styled.div`
  width: 100%;
  height: 268px;
  border-radius: 5px 40px 5px 5px;
  overflow: hidden;

  background-color: #ffffff;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.1);
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.15));

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
      color: ${colorSet.textStrong};
      ${fontType.title_4}
    }
    label {
      color: ${colorSet.textMedium};
      ${fontType.body_3}
    }

    span:nth-of-type(1) {
      padding-right: 5px;
    }
    span:nth-of-type(2) {
      padding-left: 5px;
    }
    .postcard-content-bottom {
      display: flex;
      align-items: center;
    }

    .bold {
      font-weight: 700;
    }
    .feed-count {
      margin-left: 3px;
    }
  }
`;