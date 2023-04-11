import styled from "styled-components";
import { apiPath } from "../../shared/path";

interface IShopDetailMenu {
  menuName: string;
  price: string;
  picture: string | null;
}

function ShopDetailMenu({menuName, price, picture}: IShopDetailMenu) {
  return (
    <ShopDetailMenuContainer>
      <div className="shop-detail-menu-content">
        <label>{menuName}</label>
        <label>{price}</label>
      </div>
      { picture && (
        <div className="shop-detail-menu-picture">
          <img src={`${apiPath.imgUrl}${picture}`} alt={menuName}/>
        </div>
      )}
    </ShopDetailMenuContainer>
  )
}

export default ShopDetailMenu

const ShopDetailMenuContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;

  .shop-detail-menu-content {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .shop-detail-menu-picture {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: ${(80)} 80px;
      
    }
  }
`;