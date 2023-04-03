import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeShopPostCard from '../components/jh/HomePostCard';
import TestButton from '../components/jh/TestButton';
import { path } from '../shared/path';

const Home = () => {
  interface IClickProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }

  const navi = useNavigate();
  const navigator = (path: string) => {
    return navi(path);
  }

  const naverAccessToken = () => {
    window.location.href.includes('access_token') && getNaverToken();
}

  const getNaverToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    console.log(token);
    localStorage.setItem('access_token', token);
  }

  useEffect(() => {
    naverAccessToken();
  }, []);

  return (
    <HomeWrap>
      <HomeContainer>
        <TestButton
          onClick={() => navigator(path.login)}
        >
          로그인하기
        </TestButton>

        <button>지도에서 보기</button>

        <input type="checkbox" id="by-distance" name="by-distance" hidden/>
        <button>
          <label htmlFor="by-distance">거리순</label>
        </button>
        <button onClick={() => navigator(path.mealFilter)}>
          필터
        </button>

        <HomeShopListContainer>
          {/* {shopList.map((item) => {
            return(
              <HomeShopPostCard
                id={item.shopId}
                address={item.address}
                shopName={item.shopName}
                thumbnail={item.thumbnail}
                menuName={item.menuName}
                maxPrice={item.maxPrice}
                minPrice={item.minPrice}
                category={item.category}
              />
            )
          })} */}
          <HomeShopPostCard
            id={1}
            address={"주소"}
            shopName={"가게이름"}
            thumbnail={"이미지주소"}
            menuName={"메뉴이름..."}
            maxPrice={19000}
            minPrice={5000}
            category={"카테고리"}
          />
          <HomeShopPostCard
            id={2}
            address={"주소2"}
            shopName={"가게이름2"}
            thumbnail={"이미지주소2"}
            menuName={"메뉴이름2..."}
            maxPrice={26000}
            minPrice={8000}
            category={"카테고리2"}
          />
        </HomeShopListContainer>
      </HomeContainer>
    </HomeWrap>
  )
}

export default Home

export const HomeWrap = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const HomeContainer = styled.div`
  max-width: 1600px;
  @media (max-width: 1600px) {
    
  }
  @media (max-width: 1334px) {
    
  }
  @media (max-width: 1024px) {
    
  }
  @media (max-width: 720px) {
    
  }
`;

const HomeShopListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;
