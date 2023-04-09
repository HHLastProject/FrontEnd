import React, { MouseEventHandler, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../custom/yh/Button";
import Post from "../../custom/yh/Post";
import { useDeleteShop } from "../../custom/yh/useDeleteShop";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../../apis/queries";
import apis from "../../apis/apis";

interface ShopListDetatil {
  shopId: number;
  shopName: string;
  thumbnail: string;
  category: string;
  address: string;
  operatingTime: string;
  phoneNumber: string;
  Menus: [
    {
      menuId: number;
      menuName: string;
      price: number;
      menuDescription: string;
      picture: string;
    }
  ];
}

interface ShopRegister {
  shopName: string;
  category: string;
  address: string;
  operatingTime: string;
  phoneNumber: string;
  thumbnail: File | undefined;
  menu: Menu[];
}

interface Menu {
  menuName: string;
  price: number;
  menuDescription: string;
  pictures: File | undefined;
}

function ShopListCard(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<ShopListDetatil[]>({
    queryKey: [keys.GET_ShopList_Detail] as const,
    queryFn: async () => {
      const data = await apis.get(`/api/admin/detail/${id}`, {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbkVtYWlsIjoicXdlckBuYXZlci5jb20iLCJpYXQiOjE2ODA3ODMxNDQsImV4cCI6MTY4MTY0NzE0NH0.BeigA3zgwDM-E4tAn3hKesYxeD9enog8w9RPtXsHOh8",
          // authorization: getCookie('token')
        },
      });
      console.log(data);
      return data.data.shop;
    },
  });

  // const deleteAdmin = useDeleteShop();

  const [shopRegister, setShopRegister] = React.useState<ShopRegister>({
    shopName: "",
    category: "",
    address: "",
    operatingTime: "",
    phoneNumber: "",
    thumbnail: undefined,
    menu: [],
  });

  const [menu, setMenu] = useState<Menu>({
    menuName: "",
    price: 0,
    menuDescription: "",
    pictures: undefined,
  });

  const shopRegisterChageHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setShopRegister((old) => {
      return { ...old, [name]: value };
    });
  };

  const upDateMenuItem = () => {
    setShopRegister((prev) => ({
      ...prev,
      menu: [
        ...prev.menu,
        {
          menuName: "",
          price: 0,
          menuDescription: "",
          pictures: undefined,
        } as Menu,
      ],
    }));
  };

  const handleCategorySelect = (category: string) => {
    setShopRegister({ ...shopRegister, category });
  };

  //-------------------------------주소
  const [enroll_company, setEnrollCompany] = useState({
    address: "",
  });

  const [popup, setPopup] = useState(false);

  const handleInput = (e: any) => {
    setEnrollCompany({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  const handleComplete = (data: any) => {
    setPopup(!popup);
  };
  //-------------------------------

  return (
    <StConteiner>
      <StHeaderLogo>
        <StHeaderInner>
          <StCancleBtn
            onClick={() => {
              navigate("/admin/shoplist");
            }}
          >취소
          </StCancleBtn>
        </StHeaderInner>
      </StHeaderLogo>
      <StInforConteiner>
        {Array.isArray(data) &&
          data.map((el) => {
            return (
              <div key={el.shopId}>
                <StInforInner>
                  <StTitleLabel>업체명</StTitleLabel>
                  <input
                    name="shopName"
                    value={el.shopName}
                    onChange={shopRegisterChageHandle}
                  />
                </StInforInner>
                <Button
                  value={el.category}
                  categories={["분식", "샐러드", "육류", "해산물"]}
                  onSelectCategory={handleCategorySelect}
                />
                <StInforInner>
                  <StTitleLabel>전화</StTitleLabel>
                  <input
                    name="phoneNumber"
                    value={el.phoneNumber}
                    onChange={shopRegisterChageHandle}
                  />
                </StInforInner>
                <StInforInner>
                  <StTitleLabel>주소</StTitleLabel>
                  <input
                    name="address"
                    required
                    onChange={handleInput}
                    value={el.address}
                  />
                  <input
                    name="address"
                    required
                    onChange={shopRegisterChageHandle}
                    value={el.address}
                  />
                  <button onClick={handleComplete}>주소검색</button>
                  {popup && <Post setcompany={setEnrollCompany}></Post>}
                </StInforInner>
                <StInforInner>
                  <StTitleLabel>운영시간</StTitleLabel>
                  <StInforForm>
                    <input
                      type="textarea"
                      name="operatingTime"
                      value={el.operatingTime}
                      onChange={shopRegisterChageHandle}
                    />
                  </StInforForm>
                </StInforInner>
                {/* <img src={el.thumbnail instanceof Blob ? URL.createObjectURL(el.thumbnail) : el.thumbnail} /> */}
                <div>
                  {el?.Menus.map((el, index) => {
                    return (
                      <div key={index}>
                        <StMenuList>
                          <StInforInner>
                            <StTitleLabel>메뉴명</StTitleLabel>
                            <input
                              name={`menuName_${index}`}
                              value={el.menuName}
                            />
                          </StInforInner>
                          <StInforInner>
                            <StTitleLabel>가격</StTitleLabel>
                            <input 
                            name={`price_${index}`} 
                            value={el.price} />
                          </StInforInner>
                          <StInforInner>
                            <StTitleLabel>메뉴설명</StTitleLabel>
                            <input
                              name={`menuDescription_${index}`}
                              value={el.menuDescription}
                            />
                          </StInforInner>
                          {/* <img src={el.pictures ? URL.createObjectURL(el.pictures) : ''} /> */}
                        </StMenuList>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        <StBtn>
          <button onClick={upDateMenuItem}>수정하기</button>
          <button
          //   onClick={deleteShopHandler}
          >
            삭제하기
          </button>
        </StBtn>
      </StInforConteiner>
    </StConteiner>
  );
}
export default ShopListCard;

const StConteiner = styled.div`
  width: 1135px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StHeaderLogo = styled.div`
  width: 1135px;
  height: 80px;
`;

const StHeaderInner = styled.div`
  width: 500px;
  display: flex;
  margin: 28px;
`;

const StCancleBtn = styled.button`
  font-weight: bold;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const StInforConteiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StInforInner = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
`;

const StInforForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const StBtn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StTitleLabel = styled.div`
  display: flex;
  font-weight: bold;
`;

const StMenuList = styled.div``;
