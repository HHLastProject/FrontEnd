import React from 'react'
import { useQuery } from '@tanstack/react-query';
import apis from '../../apis/apis'
import { getCookie } from '../../apis/Cookies';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { keys } from '../../apis/queries';

interface ShopListItem {
  shopId: number;
  shopName: string;
  category: string;
  address: string;
};

function AdminMain(): JSX.Element {
  const navigate = useNavigate();
  const keys = { GET_ShopList: 'GetShopList', } as const;
  const { data, isLoading } = useQuery<ShopListItem[]>({
    queryKey: [keys.GET_ShopList],
    queryFn: async () => {
      const data = await apis.get(`/shopList`, {
        headers: {
          Authorization: getCookie('token'),
        },
      });
      return data.data;
    },
  });

  const logoutBtnHandler = () => {
    localStorage.removeItem("admin_token");
    navigate('/');
  }
  console.log(data)

  return (
    <StConteiner>
      <StHeaderLogo>
        <StHeaderLogoInner>
          <StInformationbox>
            <StUserIdBox>asdf@naver.com</StUserIdBox>
            <LogoutBtn
              type="submit"
              onClick={logoutBtnHandler}>로그아웃</LogoutBtn>
          </StInformationbox>
        </StHeaderLogoInner>
        <StAddbox>
          <Addbutton
            type="submit"
            onClick={() => {
              navigate('/admin/register')
            }}
          >등록하기 + </Addbutton>
        </StAddbox>
        <ShopListBox>
          {data?.map((el) => {
            return (
              <ShopList
                key={el.shopId}
              // onClick={()=> {
              //   navigate(`/admin/update/:${shopId}`)
              // }}
              >
                <ShopNameBox>
                  <ShopName>{el.shopName}</ShopName>
                </ShopNameBox>
                <ShopCategoryBox>
                  <ShopCategory>{el.category}</ShopCategory>
                </ShopCategoryBox>
                <ShopAddrBox>
                  <ShopAddr>{el.address}</ShopAddr>
                </ShopAddrBox>
              </ShopList>
            );
          })}
        </ShopListBox>
      </StHeaderLogo>
    </StConteiner>
  );
};

export default AdminMain;

const StConteiner = styled.div`
  width: 100%;
  height : 100%;
  display : flex;
`
const StHeaderLogo = styled.div`
  width: 1135px;
  height: 80px
`
const StHeaderLogoInner = styled.div`
  height :100px;
  display : flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`
const StInformationbox = styled.div`
  width : 500px;
  display : flex;
  justify-content: space-between;
`

const StAddbox = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const StUserIdBox = styled.div`
  font-Weight : bold;
  font-size : 18px;
`

const LogoutBtn = styled.button`
  font-Weight : bold;
  background-color : transparent;
  border : none;
  font-size : 20px;
  cursor: pointer;
`

const Addbutton = styled.button`
  width : 500px;
  height : 50px;
  background-color : transparent;
  border: 1px solid black;
  font-Weight : bold;
  font-size : 20px;
  cursor: pointer;
`

const ShopListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ShopList = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width : 500px;
  height : 50px;
  margin-top: 10px;
  background-color : transparent;
  border : none;
  cursor: pointer;
`
const ShopNameBox = styled.div`
  margin-left : 10px;
`
const ShopName = styled.div`
  font-Weight : bold;
  display: flex;
  justify-content: flex-start;
  font-size : 15px;
`

const ShopCategoryBox = styled.div`
  margin-left : 15px;
`
const ShopCategory = styled.div`
  font-Weight : bold;
  display: flex;
  justify-content: flex-start;
  color : gray;
`

const ShopAddrBox = styled.div`
  margin-left : 15px;
`

const ShopAddr = styled.div`
  display: flex;
  justify-content: flex-start;
  color : gray;
`