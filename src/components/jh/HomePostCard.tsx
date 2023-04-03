import styled from "styled-components";

export interface IShopPostList {
    key:number;
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
    key,
    address,
    shopName,
    thumbnail,
    menuName,
    maxPrice,
    minPrice,
    category,
  } : IShopPostList) {

  return (
    <HomeShopPostCardContainer key={key}>
      <div className="home-postcard-thumbnail">
        <img src={thumbnail} alt={shopName}/>
      </div>
      <div className="home-postcard-content">
        <h4>{shopName}</h4>
        <label>{menuName}</label>
        <span>
          <label>최소주문</label>
          <label>{minPrice}</label>
        </span>
      </div>
    </HomeShopPostCardContainer>
  );
};

export default HomeShopPostCard;

const HomeShopPostCardContainer = styled.div`
  width: 300px;
  height: 200px;
  border: 1px solid black;
  .home-postcard-thumbnail {
    width: 100%;
    height: 50%;
    border: 1px solid blue;
    img {
      height: 100%;
      
    }
  }
`;