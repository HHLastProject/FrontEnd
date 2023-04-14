import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useGetShopDetail, useGetShopDetailReview } from '../custom/jh/useGetShopDetail';
import ShopDetailMenu from '../components/shopDetail/ShopDetailMenu';
import ShopDetailReview from '../components/shopDetail/ShopDetailReview';
import { apiPath } from '../shared/path';
import ShopDetailMap from '../components/map/ShopDetailMap';
import ShopDetailStoreName from '../components/home/ShopDetailStoreName';
import ShopDetailContentInfo from '../components/shopDetail/ShopDetailContent';

function ShopDetail() {
  const icon = {
    detailInfo: {
      mapPin: `${process.env.PUBLIC_URL}/images/detail/map_pin_20.png`,
      clock: `${process.env.PUBLIC_URL}/images/detail/clock_20.png`,
      phone: `${process.env.PUBLIC_URL}/images/detail/phone_20.png`,
    }
  };
  const navi = useNavigate();
  const param = Number(useParams().shopId);
  const tabInfoRef = useRef();
  const tabMenuRef = useRef();
  const tabReviewRef = useRef();
  
  const toShopDetailReviewForm = `/shop/${param}/reviewForm`;

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
      <div>
        <ShopDetailThumbnail>
        <div className='thumbnail-img'>
          <img
            src={`${apiPath.imgUrl + shopDetailData?.thumbnail}`}
            alt={shopDetailData?.shopName}
          />
        </div>
        <ShopDetailStoreName
          shopName={shopDetailData?.shopName}
          category={shopDetailData?.category}
        />
      </ShopDetailThumbnail>
      <ShopDetailContainer>
        
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
        <ShopDetailContentContainer>
          <h2>정보</h2>
          <div>
            <ShopDetailContentInfo
              icon={icon.detailInfo.mapPin}
              content={shopDetailData?.address}
            />
            <ShopDetailContentInfo
              icon={icon.detailInfo.clock}
              content={shopDetailData?.operatingTime}
            />
            <ShopDetailContentInfo
              icon={icon.detailInfo.phone}
              content={shopDetailData?.phoneNumber}
            />
          </div>
          <XFlexCenter>
            <ShopDetailMap
              width={350}
              height={150}
              lng={shopDetailData?.lng}
              lat={shopDetailData?.lat}
            />
          </XFlexCenter>
        </ShopDetailContentContainer>
        <ShopDetailContentContainer>
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
        </ShopDetailContentContainer>
        <ShopDetailContentContainer>
          <div className='shop-detail-review'>
            <hr />
            <div className='shop-detail-review-sub'>
              <h2>피드</h2>
              <button
                onClick={() => navi(toShopDetailReviewForm)}
              >댓글 쓰기</button>
            </div>
            <div>
              {shopDetailReviewList?.map((item:any) => {
                return (
                  <>리뷰111</>
                )
              })}
              {(shopDetailReviewList?.length === 0) && (<div>피드가 없습니다.</div>)}
              {shopDetailReviewIsError && (<div>댓글 에러</div>)}
            </div>
            <ShopDetailReview/>
          </div>
        </ShopDetailContentContainer>
      </ShopDetailContainer>
      </div>
      
    </>
  )
}

export default ShopDetail

const XFlexCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  background-color: #ffffff;
  border-bottom: 1px solid;
  z-index: 9999;
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
  border-top: 12px solid #EDEDED;
  background-color: #fff;
  hr {
    border: 1px 0 0 0 solid #bbb;
  }
`;

const ShopDetailThumbnail = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 72px;
  background-color: #fff;
  h1 {
    font-size: 1.5rem;
  }
  .thumbnail-img {
    width: 100%;
    height: 252px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
    }
  }
`;

const ShopDetailContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
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

