import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useGetShopDetail, useGetShopDetailFeed } from '../custom/jh/useGetShopDetail';
import ShopDetailMenu from '../components/shopDetail/ShopDetailMenu';
import ShopDetailMap from '../components/map/ShopDetailMap';
import ShopDetailStoreName from '../components/home/ShopDetailStoreName';
import ShopDetailContentInfo from '../components/shopDetail/ShopDetailContent';
import { iconImgPath, imgPath, path } from '../shared/path';
import { colorSet } from '../components/ui/styles/color';
import { fontType } from '../components/ui/styles/typo';
import { Buttons } from '../components/ui/element/buttons/Buttons';
import { IconPencil } from '../components/ui/element/icons/IconsStyle';
import { VFlex } from '../custom/ym/styleStore';
import { PRIMARY_01, TITLE_5 } from '../custom/ym/variables';
import ListHeader from '../components/home/ListHeader';
import FeedContentsTest from '../components/feed/FeedContentsTest';
import { getToken } from '../apis/getToken';
import { api_token } from '../shared/api';
import { IconSize28 } from '../components/ui/element/icons/IconSize';

function ShopDetail() {
  const navi = useNavigate();
  const param = Number(useParams().shopId);
  const [scrap, setScrap] = useState(false);
  const [expand, setExpand] = useState<boolean>(false);

  //data
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

  //util
  const expandButtonHandler = () => {
    setExpand(prev => !prev);
  }

  const scrapHandler = () => {
    const token = getToken();
    if(token) {
      changeScrap(param);
    } else {
      const result = window.confirm('로그인이 필요한 기능입니다. 로그인 하시겠습니까?');
      if(result) navi(`${path.login}`);
    }
  }

  const changeScrap = async (shopId: number) => {
    const token = getToken();
    let result : boolean= false;
    if(token) {
      await api_token.put(`/api/${shopId}/scrap`)
      .then((response) => {
        result = response.data.isScrap;
        setScrap(result);
        }
      ).catch((error) => {
        throw error;
      });
    } else {
      alert('로그인이 필요합니다.');
    }
    return result;
  };

  const scrollToTabInfo = () => {
    // tabInfoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (shopDetailIsError) {
    alert("페이지를 불러올 수 없어 이전 페이지로 돌아갑니다.");
    navi(-1);
  };

  useEffect(() => {
    getShopDetailFeedList();
    console.log('최초',shopDetailData?.isScrap);
    setScrap(shopDetailData?.isScrap);
  }, []);

  useEffect(() => {
    console.log('테스트',scrap);
  }, [scrap]);

  if (shopDetailIsLoading) {
    return(<div>로딩중</div>)
  }

  return (
    <>
      {/* 헤더 */}
      <ListHeader
        scrap={true}
      >
        <div
          style={{cursor: 'pointer'}}
          onClick={scrapHandler}
        >
          <IconSize28>
            {shopDetailData?.isScrap && <img src={`${process.env.PUBLIC_URL}/icon/bookmark checked.png`} alt="" />}
            {scrap
              ? <img src={`${process.env.PUBLIC_URL}/icon/bookmark checked.png`} alt="" />
              : <img src={`${process.env.PUBLIC_URL}/icon/book mark line_28.png`} alt="" />
            }
          </IconSize28>
        </div>
      </ListHeader>

      {/* 내용 */}
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

        {/* 탭 */}
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

          {/* 정보 */}
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

        {/* 메뉴 */}
        <ShopDetailContainer>
          <ShopDetailContentContainer>
            <div className='shop-detail-menu'>
              <h2>메뉴</h2>
              {shopDetailData?.Menus?.map((item: any) => {
                return (
                  <ShopDetailMenu
                    key={`${item.menuName + item.price}`}
                    menuName={item.menuName}
                    price={item.price}
                    picture={item.picture}
                  />
                )
              })}
            </div>
          </ShopDetailContentContainer>
        </ShopDetailContainer>

        {/* 피드 */}
        <ShopDetailContainer>
          <ShopDetailContentContainer>
            <div className='shop-detail-review'>
              <div className='shop-detail-review-sub'>
                <h2>피드</h2>
                <Link 
                  to={`${path.feedForm}`}
                  state={{shopId : param, shopName: shopDetailData?.shopName}}
                >
                  <Buttons.Small.Default>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <IconPencil />피드 쓰기
                    </div>
                  </Buttons.Small.Default>
                </Link>
              </div>
            </div>
            {
              shopDetailFeedList?.map((item: any, index: number) => {
                //tag: [{tag: 내용}]
                if(item?.tag) {
                  let tags = [];
                  for(let i of item.tag){
                    const {tag} = i;
                    tags.push(tag);
                  }
                  item.tag = [...tags];
                }
                return(
                  <div key={`Feed${item.shopId + index}`}>
                    <VFlex gap='12px'>
                      <FeedContentsTest
                        page={'shopDetailFeed'}
                        feedData={item}
                      />
                    </VFlex>
                    {(index >=0 && index < shopDetailFeedList.length-1) && <FeedPageHr/>}
                  </div>
                )
              })
            }
            {(shopDetailFeedList?.length === 0 || !shopDetailFeedList) && (<div>피드가 없습니다.</div>)}
            {shopDetailFeedIsError && (<div>피드 에러</div>)}
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