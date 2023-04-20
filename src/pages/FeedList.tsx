import React, { useEffect, useState } from 'react'
import useGetFeedList from '../custom/jh/useGetFeedList'
import { defaultImgPath, imgPath } from '../shared/path';
import styled from 'styled-components';
import { fontType } from '../components/ui/styles/typo';
import { colorSet } from '../components/ui/styles/color';
import { VFlex } from '../custom/ym/styleStore';
import FeedProfile from '../components/FeedProfile';
import FeedPicture from '../components/feed/FeedPicture';
import FeedComment from '../components/feed/FeedComment';
import { PRIMARY_01, TITLE_5 } from '../custom/ym/variables';
import TagList from '../components/feed/TagList';
import PlaceCard from '../components/feed/PlaceCard';
import { Link } from 'react-router-dom';

function FeedList() {
  const [expand, setExpand] = useState<boolean>(false);
  const {feedList, feedListIsLoading, feedListIsError} = useGetFeedList();

  const expandButtonHandler = () => {
    setExpand(prev => !prev);
  }

  useEffect(() => {
    console.log('피드리스트',feedList);
  }, [feedList]);

  if(feedListIsLoading) { return <div>로딩중</div> };

  return (
    <FeedContainer>
      <MarginBothSides20>
        <Heading2>Feed</Heading2>
      </MarginBothSides20>
      { feedList?.map((item: any) => {
        return (
          <div key={item.shopId}>
            <VFlex gap='12px' etc='padding:20px;'>
              {item.profilePic ? 
                <FeedProfile 
                  profilePic={item.profilePic}
                />
                :
                <FeedProfile 
                  profilePic={defaultImgPath.shopList}
                />
              }
              <Link to={``}>
                <FeedPicture>{process.env.REACT_APP_SERVER_URL + '/uploads/' + item.feedPic}</FeedPicture>
                <FeedComment isExpanded={expand}>{item.comment}</FeedComment>
              </Link>
              <ExpandButton onClick={expandButtonHandler}>
                <ExpandText>{expand ? "닫기" : "더 보기"}</ExpandText>
              </ExpandButton>
              <TagList>{item.tags}</TagList>
              <Link to={'/'}>
                <PlaceCard />
              </Link>
            </VFlex>
          </div>
        )
      })}
    </FeedContainer>
  )
};

export default FeedList

const Heading2 = styled.div`
  ${fontType.heading_2}
  color: ${colorSet.textStrong};
`;

const FeedContainer = styled.div`
  margin: 40px 0 120px 0;
`;

const MarginBothSides20 = styled.div`
  margin: 0 20px;
`;

const ExpandButton = styled.button`
    width: fit-content;
    padding: 0px;
    margin: 0px;
    border: none;
    background-color: transparent;
`;
const ExpandText = styled.span`
    font-family: "Pretendard";
    font-size: ${TITLE_5.fontSize};
    font-weight: ${TITLE_5.fontWeight};
    line-height: ${TITLE_5.lineHeight};
    color: ${`#${PRIMARY_01}`};
`;

interface IFeedList {
  nickname: string;
  profilePic : string;
  createdAt : string | Date;
  feedPic : string;
  comment : string | null;
  tags : string[] | null;
  shopId: number;
  shopName : string;
  shopAddress : string;
  shopThumbnail : string;
  isScrap : boolean;
};

const dumiData: IFeedList[] = [
  {
    shopId: 12,
    nickname: "닉네임",
    profilePic : defaultImgPath.shopList,
    createdAt : "2023.04.01",
    feedPic : defaultImgPath.shopList,
    comment : "코멘트길게아무렇게나 적어보기 어쩌구코멘트길게아무렇게나 적어보기 어쩌구코멘트길게아무렇게나 적어보기 어쩌구코멘트길게아무렇게나 적어보기 어쩌구코멘트길게아무렇게나 적어보기 어쩌구코멘트길게아무렇게나 적어보기 어쩌구코멘트길게아무렇게나 적어보기 어쩌구코멘트길게아무렇게나 적어보기 어쩌구코멘트길게아무렇게나 적어보기 어쩌구코멘트길게아무렇게나 적어보기 어쩌구",
    tags : ['테그1','테그2'],
    shopName : '가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명가게명',
    shopAddress : '가게주소',
    shopThumbnail : defaultImgPath.shopList,
    isScrap : true,
  },
  {
    shopId: 20,
    nickname: "닉네임2",
    profilePic : defaultImgPath.shopList,
    createdAt : "2023.04.02",
    feedPic : defaultImgPath.shopList,
    comment : "코멘트",
    tags : ['태그1', '태그2', '태그3'],
    shopName : '가게명2',
    shopAddress : '가게주소2',
    shopThumbnail : defaultImgPath.shopList,
    isScrap : false,
  },
  {
    shopId: 31,
    nickname: "닉네임3",
    profilePic : defaultImgPath.shopList,
    createdAt : "2023.04.03",
    feedPic : defaultImgPath.shopList,
    comment : "코멘트",
    tags : ['태그1', '태그2', '태그3', '태그4'],
    shopName : '가게명3',
    shopAddress : '가게주소3',
    shopThumbnail : defaultImgPath.shopList,
    isScrap : true,
  },
];