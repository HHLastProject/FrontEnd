import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useGetShopDetail, useGetShopDetailFeed } from '../custom/jh/useGetShopDetail';
import useNavigateHandler from '../custom/jh/useNavigateHandler';
import ShopDetailMenu from '../components/shopDetail/ShopDetailMenu';
import ShopDetailMap from '../components/map/ShopDetailMap';
import ShopDetailStoreName from '../components/home/ShopDetailStoreName';
import ShopDetailContentInfo from '../components/shopDetail/ShopDetailContent';
import ShopDetailFeed from '../components/shopDetail/ShopDetailFeed';
import { iconImgPath, imgPath, path } from '../shared/path';
import { colorSet } from '../components/ui/styles/color';
import { fontType } from '../components/ui/styles/typo';
import { Buttons } from '../components/ui/element/buttons/Buttons';
import { IconPencil } from '../components/ui/element/icons/IconsStyle';
import { VFlex } from '../custom/ym/styleStore';
import moment from 'moment';
import FeedProfile from '../components/FeedProfile';
import FeedPicture from '../components/feed/FeedPicture';
import FeedComment from '../components/feed/FeedComment';
import PlaceCard from '../components/feed/PlaceCard';
import TagList from '../components/feed/TagList';
import { PRIMARY_01, TITLE_5 } from '../custom/ym/variables';

function ShopDetail() {
  const navi = useNavigate();
  const param = Number(useParams().shopId);
  const tabInfoRef = useRef();
  const tabMenuRef = useRef();
  const tabReviewRef = useRef();
  const { feedFormClickHandler } = useNavigateHandler();

  const [expand, setExpand] = useState<boolean>(false);
  const expandButtonHandler = () => {
    setExpand(prev => !prev);
  }

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
  }, [])

  useEffect(() => {
    getShopDetailFeedList();
    console.log(shopDetailFeedList);
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
                {/* { dumiFeedData?.map((item: any, index: number) => {
                  return(
                    <div key={`${item.shopId + index}`}>
                      <VFlex gap='12px' etc='padding:20px;'>
                        {item.profilePic ? 
                          <FeedProfile 
                            profilePic={item.profilePic}
                            nickname={item.nickname}
                            createdAt={moment(item.createAt).format("YYYY.MM.DD")}
                          />
                          :
                          <FeedProfile 
                            profilePic={item.defaultImgPath.shopList}
                            nickname={item.nickname}
                            createdAt={moment(item.createAt).format("YYYY.MM.DD")}
                          />
                        }
                        <Link to={`${path.toFeedDetail + '/' + item.feedId}`}>
                          <FeedPicture>{process.env.REACT_APP_SERVER_URL + '/uploads/' + item.feedPic}</FeedPicture>
                          <FeedComment isExpanded={expand}>{item.comment}</FeedComment>
                        </Link>
                        <ExpandButton onClick={expandButtonHandler}>
                          <ExpandText>{expand ? "닫기" : "더 보기"}</ExpandText>
                        </ExpandButton>
                        <TagList>{item.tags}</TagList>
                        <Link to={`${path.toShopDetail + '/' + item.shopId}`}>
                          <PlaceCard
                            shopThumbnail={imgPath.shopThumbnailImg + item.shopThumbnail}
                            shopName={item.shopName}
                            shopAddress={item.shopAddress}
                          />
                        </Link>
                      </VFlex>
                      {(index >=0 && index < dumiFeedData.length-1) && <FeedPageHr/>}
                    </div>
                  )
                })}
                {(shopDetailFeedList?.length === 0 || !shopDetailFeedList) && (<div>피드가 없습니다.</div>)}
                {shopDetailFeedIsError && (<div>피드 에러</div>)} */}
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

const ExpandButton = styled.button`
  width: fit-content;
  padding: 0px;
  margin: 0px;
  border: none;
  background-color: transparent;
`;

const ExpandText = styled.span`
  font-size: ${TITLE_5.fontSize};
  font-weight: ${TITLE_5.fontWeight};
  line-height: ${TITLE_5.lineHeight};
  color: ${`#${PRIMARY_01}`};
`;

const FeedPageHr = styled.hr`
  width: 350px;
  height: 1px;
  background-color: ${colorSet.lineLight};
  border: 0;
`;

const dumiFeedData = [
  {
    comment:"어몽어스123 어몽어스 123 어몽어스 14314 어몽어스 어몽어스\r\n어몽어스123 어몽어스 123 어몽어스 14314 어몽어스 어몽어스어몽어스123 어몽어스 12",
    createdAt: "2023-04-21T06:28:07.000Z",
    feedId: 61,
    feedPic: "1682058487739.png",
    isScrap: true,
    nickname: "김용민",
    profilePic: "http://k.kakaocdn.net/dn/bYqF7P/btrrKx4Et4E/CnhDpRN7tj9OGKRV5rhgp0/img_640x640.jpg",
    shopAddress: "서울특별시 강남구 봉은사로 438",
    shopId: 31475,
    shopName: "매머드익스프레스봉은사로",
    shopThumbnail: "cafe17.jpg",
    tag: 
    [
      {tag: '분위기 맛집'},
      {tag: '커피 맛집'},
    ]
  },
  {
    comment:"어몽어스123 어몽어스 123 어몽어스 14314 어몽어스 어몽어스\r\n어몽어스123 어몽어스 123 어몽어스 14314 어몽어스 어몽어스어몽어스123 어몽어스 12",
    createdAt: "2023-04-21T06:28:07.000Z",
    feedId: 61,
    feedPic: "1682058487739.png",
    isScrap: true,
    nickname: "김용민",
    profilePic: "http://k.kakaocdn.net/dn/bYqF7P/btrrKx4Et4E/CnhDpRN7tj9OGKRV5rhgp0/img_640x640.jpg",
    shopAddress: "서울특별시 강남구 봉은사로 438",
    shopId: 31475,
    shopName: "매머드익스프레스봉은사로",
    shopThumbnail: "cafe17.jpg",
    tag: []
  },
];