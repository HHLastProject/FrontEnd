import styled from "styled-components";
import { apiPath, imgPath } from "../../shared/path";
import { colorSet } from "../ui/styles/color";
import { fontType } from "../ui/styles/typo";

interface IShopDetailMenu {
  menuName: string;
  price: string;
  picture?: string | null | undefined;
}

function ShopDetailMenu({menuName, price, picture}: IShopDetailMenu) {
  const menuImgUrl = `${imgPath.shopMenuImg + picture}`;
  return (
    <ShopDetailMenuContainer>
      <div className="shop-detail-menu-content">
        <MenuNameFont>{menuName}</MenuNameFont>
        <MenuPriceFont>{price.toLocaleString()}원</MenuPriceFont>
      </div>
      { picture && (
        <ShopDetailMenuImg>
          <img src={menuImgUrl} alt={menuName}/>
        </ShopDetailMenuImg>
      )}
    </ShopDetailMenuContainer>
  )
}

export default ShopDetailMenu

const ShopDetailMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${colorSet.lineLight};
  padding: 16px 0;

  .shop-detail-menu-content {
    display: flex;
    flex-direction: column;
  }
`;

const MenuNameFont = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 23px;
`;

const MenuPriceFont = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
`;

const ShopDetailMenuImg = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  img {
    width: 80px;
  }
`;