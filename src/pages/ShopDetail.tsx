import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useGetShopDetail, useGetShopDetailFeed } from '../custom/jh/useGetShopDetail';
import ShopDetailMenu from '../components/shopDetail/ShopDetailMenu';
import ShopDetailMap from '../components/map/ShopDetailMap';
import ShopDetailStoreName from '../components/home/ShopDetailStoreName';
import ShopDetailContentInfo from '../components/shopDetail/ShopDetailContent';
import { iconImgPath, imgPath, path } from '../shared/path';
import { colorSet } from '../components/ui/styles/color';
import { Buttons } from '../components/ui/element/buttons/Buttons';
import { IconPencil } from '../components/ui/element/icons/IconsStyle';
import { VFlex } from '../custom/ym/styleStore';
import ListHeader from '../components/home/ListHeader';
import FeedContentsTest from '../components/feed/FeedContentsTest';
import { getToken } from '../apis/getToken';
import { displayHandler } from '../custom/jh/useOnClickHiddenHandler';
import ShopDetailTab, { shopDetailTabEl } from '../components/shopDetail/ShopDetailTab';
import IconScrap from '../components/shopDetail/ScrapBtn';
import BtnResetStyle from '../components/ui/element/buttons/BtnReset';
import { changeScrap } from '../custom/jh/changeScrap';
import Loading from '../components/loading/Loading';
import { Title3 } from '../components/FontStyle';

function ShopDetail() {
  const navi = useNavigate();
  const param = Number(useParams().shopId);
  const [scrap, setScrap] = useState(false);

  //data
  const {
    shopDetailData,
    shopDetailIsLoading,
    shopDetailIsError
  } = useGetShopDetail(param, setScrap);
  const {
    shopDetailFeedList,
    getShopDetailFeedList,
    shopDetailFeedIsLoading,
    shopDetailFeedIsError,
  } = useGetShopDetailFeed(param);

  //스크랩 클릭
  const scrapHandler = () => {
    const token = getToken();
    if(token) {
      console.log('토큰있음')
      changeScrap(param)
        .then((res) => {
          const {isScrap} = res;
          setScrap(isScrap);
        });
    } else {
      const result = window.confirm('로그인이 필요한 기능입니다. 로그인 하시겠습니까?');
      if(result) navi(`${path.login}`);
    }
  }

  if (shopDetailIsError) {
    alert("페이지를 불러올 수 없어 이전 페이지로 돌아갑니다.");
    navi(-1);
  };

  useEffect(() => {
    getShopDetailFeedList();
  }, []);

  if (shopDetailIsLoading) return <Loading/>;

  return (
    <>
      {/* 헤더 */}
      <ListHeader
        scrap={true}
      >
        {/* 스크랩 */}
        <BtnResetStyle onClick={scrapHandler}>
          <IconScrap isScrap={scrap}/>
        </BtnResetStyle>
      </ListHeader>

      {/* 내용 */}
      <div style={{padding: '0 0 120px 0'}}>
        <ShopDetailThumbnail>
          <ThumbnailDiv>
            <img
              id={`shop-detail-thumbnail`}
              src={`${imgPath.shopThumbnailImg + shopDetailData?.thumbnail}`}
              alt={shopDetailData?.shopName}
              onError={(e) => displayHandler(`shop-detail-thumbnail`)}
            />
          </ThumbnailDiv>
          <ShopDetailStoreName
            shopName={shopDetailData?.shopName}
            category={shopDetailData?.category}
          />
        </ShopDetailThumbnail>

        <ShopDetailContainer>
          {/* 탭 */}
          <ShopDetailTab tabEl={shopDetailTabEl} listCount={shopDetailFeedList?.length}/>

          {/* 정보 */}
          <ShopDetailContentContainer id={shopDetailTabEl[0].id}>
            <Title3>정보</Title3>
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
          <ShopDetailContentContainer id={shopDetailTabEl[1].id}>
            <div className='shop-detail-menu'>
              <Title3>메뉴</Title3>
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
          <ShopDetailContentContainer id={shopDetailTabEl[2].id}>
            <div>
              <SpaceBetween>
                <Title3>피드</Title3>
                <Link 
                  to={`${path.feedForm}`}
                  state={{shopId : param, shopName: shopDetailData?.shopName}}
                >
                  {/* 피드쓰기 버튼 */}
                  <Buttons.Small.Default>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <IconPencil />피드 쓰기
                    </div>
                  </Buttons.Small.Default>
                </Link>
              </SpaceBetween>
            </div>
            {/* 피드들 */}
            {shopDetailFeedIsLoading 
              ?
              <>로딩중...</>
              :
              shopDetailFeedList?.map((item: any, index: number) => {
                return(
                  <>
                    {index === 0 && <div style={{height: '12px'}}/>}
                    {index > 0 && <div style={{height: '40px'}}/>}
                    <div className='shop-detail-feed' key={`Feed${item.shopId + index}`}>
                      <VFlex gap='12px'>
                        <FeedContentsTest
                          page={'shopDetailFeed'}
                          feedData={item}
                        />
                      </VFlex>
                    </div>
                    {(index < shopDetailFeedList.length-1) && <div style={{height: `${40-12}px`}}/>}
                    {(index >=0 && index < shopDetailFeedList.length-1) && <FeedPageHr/>}
                  </>
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

const ShopDetailContainer = styled.div`
  width: 100%;
  border-top: 12px solid ${colorSet.lineLight};
`;

const ShopDetailThumbnail = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 72px;
`;

const ThumbnailDiv = styled.div`
  width: 100%;
  height: 252px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colorSet.lineMedium};
  img {
    width: 100%;
  }
`

const ShopDetailContentContainer = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FeedPageHr = styled.hr`
  width: 350px;
  height: 1px;
  margin: 0;
  background-color: ${colorSet.lineLight};
  border: 0;
`;