import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useGetShopDetail, useGetShopDetailReview } from '../custom/jh/useGetShopDetail';
import ShopDetailMenu from '../components/shopDetail/ShopDetailMenu';
import ShopDetailReview from '../components/shopDetail/ShopDetailReview';
import { path } from '../shared/path';

function ShopDetail() {
  const navi = useNavigate();
  const param = Number(useParams().shopId);
  const tabInfoRef = useRef();
  const tabMenuRef = useRef();
  const tabReviewRef = useRef();
  
  const toShopDetailReviewForm = `/shop/${param}/reviewForm`;

  const [review, setReview] = useState({
    title: "",
    author: "",
  });

  const scrollToTabInfo = () => {
    // tabInfoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const {
    shopDetailData, 
    shopDetailIsLoading, 
    shopDetailIsError
  } = useGetShopDetail(param);
  const {
    getShopDetailReviewList,
    shopDetailReviewList,
    shopDetailReviewIsLoading,
    shopDetailReviewIsError
  } = useGetShopDetailReview(param);

  if(shopDetailIsError) {
    alert("페이지를 불러올 수 없어 메인 페이지로 돌아갑니다.");
    navi('/');
  };
  // const [isCheckedTabInfo, setIsCheckedTabInfo] = useState(true);     //정보
  // const [isCheckedTabMenu, setIsCheckedTabMenu] = useState(false);    //메뉴
  // const [isCheckedTabReview, setIsCheckedTabReview] = useState(false);//리뷰
  // const tabInfo = document.getElementById('detail-tab-info');

  useEffect(() => {
    console.log(shopDetailData);
  }, [shopDetailData])
  useEffect(() => {
    getShopDetailReviewList();
  }, []);

  return (
    <>
      <Header>
        <span><Link to={'/'}>뒤로가기</Link></span>
        <span>책갈피</span>
      </Header>
      <ShopDetailContainer>
        <ShopDetailThumbnail>
          <div>
            <img 
              src={shopDetailData?.thumbnail}
              alt={shopDetailData?.shopName}
              className='thumbnail-img'
            />
          </div>
          <div>
            <h1>{shopDetailData?.shopName}</h1>
            <span>
              <label>★별점</label>
              <label>(리뷰수)</label>
              <div className='category'>카테고리{shopDetailData?.category}</div>
            </span>
          </div>
        </ShopDetailThumbnail>
        <ShopDetailTab>
          <ul id='detail-tab'>
            <li id="">
              <input type="radio" id='detail-tab-info' name='detail-tab' hidden/>
              <div className='detail-tab-div'>
                <label htmlFor="detail-tab-info">정보</label> 
              </div>
            </li>
            <li id="">
              <input type="radio" id='detail-tab-menu' name='detail-tab' hidden/>
              <div className='detail-tab-div'>
                <label htmlFor="detail-tab-menu">메뉴</label>
              </div>
            </li>
            <li id="">
              <input type="radio" id='detail-tab-review' name='detail-tab' hidden/>
              <div className='detail-tab-div'>
                <label htmlFor="detail-tab-review">리뷰</label>
              </div>
            </li>
          </ul>
        </ShopDetailTab>
        <ShopDetailContent>
          <div className='shop-detail-info'>
            <h2>정보</h2>
            <div>
              <p>{shopDetailData?.address}</p>
              <p>{shopDetailData?.operatingTime}</p>
              <p>{shopDetailData?.phoneNumber}</p>
            </div>
            맵 위치
          </div>
          <div className='shop-detail-menu'>
            <hr />
            <h2>메뉴</h2>
            { shopDetailData?.Menus?.map((item:any) => {
              return (
                <ShopDetailMenu
                  menuName={item.menuName}
                  price={item.price}
                  picture={item.picture}
                />
              )
            })}
          </div>
          <div className='shop-detail-review'>
            <hr />
            <div className='shop-detail-review-sub'>
              <h2>리뷰</h2>
              <button
                onClick={() => navi(toShopDetailReviewForm)}
              >댓글 쓰기</button>
            </div>
            {shopDetailReviewList?.map((item:any) => {
              return (
                <>리뷰111</>
              )
            })}
            {(shopDetailReviewList?.length === 0) && (<div>리뷰가 없습니다.</div>)}
            {shopDetailReviewIsError && (<div>댓글 에러</div>)}
            <ShopDetailReview/>
          </div>
        </ShopDetailContent>
      </ShopDetailContainer>
    </>
  )
}

export default ShopDetail

const Header = styled.header`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
  border-bottom: 1px solid;
  span {
    margin: 20px;
  }
`;

const ShopDetailTab = styled.div`
  width: 100%;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;

    li {
      width: 33.33%; 
      background-color: #ffc9c9;
    }

    label {
      width: 100%;
      line-height: 50px;
      display: block;
      cursor: pointer;
    }

    input[type="radio"] + div {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    input[type="radio"]:checked + div {
      border-bottom: 3px solid #2e975a;
      label {
        color: #2e975a;
      }
    }
  }
`;

const ShopDetailContainer = styled.div`
  width: 100%;
  margin-top: 60px;
  hr {
    border: 1px 0 0 0 solid #bbb;
  }
`;

const ShopDetailThumbnail = styled.div`
  width: 100%;
  h1 {
    font-size: 1.5rem;
  }
`;

const ShopDetailContent = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  gap: 100px;
  h2 {
    font-size: 1.2rem;
    margin: 10px 0;
    font-weight: 600;
    display: inline-block;
  }
  .shop-detail-review-sub {
    display: flex;
    justify-content: space-between;
  }
`;

