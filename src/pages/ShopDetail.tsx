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
import api from '../shared/api';
import { IconSize28 } from '../components/ui/element/icons/IconSize';
import Loading from '../components/Loading';
import { displayHandler } from '../custom/jh/useOnClickHiddenHandler';
import ShopDetailTab, { shopDetailTabEl } from '../components/shopDetail/ShopDetailTab';

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

  //스크랩 클릭
  const scrapHandler = () => {
    const token = getToken();
    if(token) {
      console.log('토큰있음')
      changeScrap(param);
    } else {
      const result = window.confirm('로그인이 필요한 기능입니다. 로그인 하시겠습니까?');
      if(result) navi(`${path.login}`);
    }
  }

  //스크랩 변경
  const changeScrap = async (shopId: number) => {
    const token = getToken();
    console.log('스크랩들어옴', shopId, token);
    let result: {isScrap: boolean} = {isScrap: false};
    if(token) {
      result = await api.put(`/api/${shopId}/scrap`, {
        headers: {
          "Authorization": `${token}`,
        }
      })
      .then((res) => {
        console.log('결과', res.data.isScrap);
        setScrap(res.data.isScrap);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
    } else {
      alert('로그인이 필요합니다.');
    }
    return result;
  };


  if (shopDetailIsError) {
    alert("페이지를 불러올 수 없어 이전 페이지로 돌아갑니다.");
    navi(-1);
  };

  useEffect(() => {
    getShopDetailFeedList();
    console.log('바뀜',shopDetailData?.isScrap);
    setScrap(shopDetailData?.isScrap);
    console.log('테스트',scrap);
  }, [scrap]);

  if (shopDetailIsLoading) return <Loading/>;

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
              ? <img src={`${process.env.PUBLIC_URL}/icon/bookmark checked.png`} alt="스크랩" />
              : <img src={`${process.env.PUBLIC_URL}/icon/book mark line_28.png`} alt="스크랩" />
            }
          </IconSize28>
        </div>
      </ListHeader>

      {/* 내용 */}
      <div id='shop-detail-wrap'>
        <ShopDetailThumbnail>
          <div className='thumbnail-img' style={{backgroundColor: `${colorSet.lineMedium}`}}>
            <img
              id={`shop-detail-thumbnail`}
              src={`${imgPath.shopThumbnailImg + shopDetailData?.thumbnail}`}
              alt={shopDetailData?.shopName}
              onError={(e) => displayHandler(`shop-detail-thumbnail`)}
            />
          </div>
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
          <ShopDetailContentContainer id={shopDetailTabEl[1].id}>
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
          <ShopDetailContentContainer id={shopDetailTabEl[2].id}>
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
                if(item?.tag.length !== 0) {
                  let tags = [];
                  for(let i of item?.tag){
                    if(i){
                      const {tag} = i;
                      tags.push(tag);
                    }
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

const FeedPageHr = styled.hr`
  width: 350px;
  height: 1px;
  background-color: ${colorSet.lineLight};
  border: 0;
`;