import { useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useGetShopDetail, useGetShopDetailFeed } from '../custom/jh/useGetShopDetail';
import useNavigateHandler from '../custom/jh/useNavigateHandler';
import ShopDetailMenu from '../components/shopDetail/ShopDetailMenu';
import ShopDetailMap from '../components/map/ShopDetailMap';
import ShopDetailStoreName from '../components/home/ShopDetailStoreName';
import ShopDetailContentInfo from '../components/shopDetail/ShopDetailContent';
import ShopDetailFeed from '../components/shopDetail/ShopDetailFeed';
import { iconImgPath, imgPath } from '../shared/path';
import { colorSet } from '../components/ui/styles/color';
import { fontType } from '../components/ui/styles/typo';
import { Buttons } from '../components/ui/element/buttons/Buttons';
import { IconPencil } from '../components/ui/element/icons/IconsStyle';

function ShopDetail() {
  const navi = useNavigate();
  const param = Number(useParams().shopId);
  const tabInfoRef = useRef();
  const tabMenuRef = useRef();
  const tabReviewRef = useRef();
  const { feedFormClickHandler } = useNavigateHandler();

  const scrollToTabInfo = () => {
    // tabInfoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const {
    shopDetailData,
    shopDetailIsLoading,
    shopDetailIsError
  } = useGetShopDetail(param);
  const {
    shopDetailFeedList,
    getShopDetailFeedList,
    shopDetailFeedIsLoading,
    shopDetailFeedIsError,
  } = useGetShopDetailFeed(param);

  if (shopDetailIsError) {
    alert("페이지를 불러올 수 없어 이전 페이지로 돌아갑니다.");
    navi(-1);
  };
  // const [isCheckedTabInfo, setIsCheckedTabInfo] = useState(true);     //정보
  // const [isCheckedTabMenu, setIsCheckedTabMenu] = useState(false);    //메뉴
  // const [isCheckedTabReview, setIsCheckedTabReview] = useState(false);//리뷰
  // const tabInfo = document.getElementById('detail-tab-info');

  useEffect(() => {
    console.log(shopDetailData);
  }, [shopDetailData])
  useEffect(() => {
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
              src={`${imgPath.shopThumbnailImg + shopDetailData?.thumbnail}`}
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
                <input type="radio" id='detail-tab-info' name='detail-tab' defaultChecked hidden />
                <div className='detail-tab-div'>
                  <label htmlFor="detail-tab-info">정보</label>
                </div>
              </li>
              <li id="">
                <input type="radio" id='detail-tab-menu' name='detail-tab' hidden />
                <div className='detail-tab-div'>
                  <label htmlFor="detail-tab-menu">메뉴</label>
                </div>
              </li>
              <li id="">
                <input type="radio" id='detail-tab-review' name='detail-tab' hidden />
                <div className='detail-tab-div'>
                  <label htmlFor="detail-tab-review">피드</label>
                </div>
              </li>
            </ul>
          </ShopDetailTab>
          <ShopDetailContentContainer>
            <h2>정보</h2>
            <div>
              <ShopDetailContentInfo
                iconImg={iconImgPath.detailInfo.mapPin}
                content={shopDetailData?.address}
              />
              <ShopDetailContentInfo
                iconImg={iconImgPath.detailInfo.clock}
                content={shopDetailData?.operatingTime}
              />
              <ShopDetailContentInfo
                iconImg={iconImgPath.detailInfo.phone}
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
        </ShopDetailContainer>
        <ShopDetailContainer>
          <ShopDetailContentContainer>
            <div className='shop-detail-menu'>
              <h2>메뉴</h2>
              {shopDetailData?.Menus?.map((item: any) => {
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
        </ShopDetailContainer>
        <ShopDetailContainer>
          <ShopDetailContentContainer>
            <div className='shop-detail-review'>
              <div className='shop-detail-review-sub'>
                <h2>피드</h2>
                <div
                  onClick={() => feedFormClickHandler(param)}
                >
                  <Buttons.Small.Default>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <IconPencil />피드 쓰기
                    </div>
                  </Buttons.Small.Default>
                </div>
              </div>
              <div>
                {shopDetailFeedList?.map((item: any) => {
                  return (
                    <>피드들</>
                  )
                })}
                {(shopDetailFeedList?.length === 0) && (<div>피드가 없습니다.</div>)}
                {shopDetailFeedIsError && (<div>피드 에러</div>)}
              </div>
              {/* <ShopDetailFeed/> */}
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
      border-bottom: 3px solid #fff;
      label {
        ${fontType.body_1}
        color: ${colorSet.textMedium};
      }
    }

    input[type="radio"]:checked + div {
      border-bottom: 3px solid ${colorSet.primary_01};
      label {
        ${fontType.title_4}
        color: ${colorSet.textStrong};
      }
    }
  }
`;

const ShopDetailContainer = styled.div`
  width: 100%;
  border-top: 12px solid #EDEDED;
  background-color: #fff;
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
  /* width: 100%; */
  padding: 40px 20px 40px 20px;
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