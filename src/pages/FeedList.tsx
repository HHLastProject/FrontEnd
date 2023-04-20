import React, { useEffect } from 'react'
import useGetFeedList from '../custom/jh/useGetFeedList'
import { imgPath } from '../shared/path';
import ListHeader from '../components/home/ListHeader';

function FeedList() {
  const {feedList, feedListIsLoading, feedListIsError} = useGetFeedList();
  useEffect(() => {
    console.log('피드리스트',feedList);
  }, []);

  return (
    <div>
      피드 페이지
      {dumiData.map((item: any) => {
        return (
          <div key={item.shopId}>
            {item.nickname}
            {item.profilePic}
            {item.createdAt}
            {item.comment}
            {item.feedPic}
            {item.tags.map((item: string) => {
              <div>item</div>
            })}
          </div>
        )
      })}
    </div>
  )
};

export default FeedList

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
    profilePic : imgPath.defaultImgPath,
    createdAt : "2023.04.01",
    feedPic : imgPath.defaultImgPath,
    comment : "코멘트",
    tags : ['테그1','테그2'],
    shopName : '가게명',
    shopAddress : '가게주소',
    shopThumbnail : imgPath.defaultImgPath,
    isScrap : true,
  },
  {
    shopId: 20,
    nickname: "닉네임2",
    profilePic : imgPath.defaultImgPath,
    createdAt : "2023.04.02",
    feedPic : imgPath.defaultImgPath,
    comment : "코멘트",
    tags : ['태그1', '태그2', '태그3'],
    shopName : '가게명2',
    shopAddress : '가게주소2',
    shopThumbnail : imgPath.defaultImgPath,
    isScrap : false,
  },
  {
    shopId: 31,
    nickname: "닉네임3",
    profilePic : imgPath.defaultImgPath,
    createdAt : "2023.04.03",
    feedPic : imgPath.defaultImgPath,
    comment : "코멘트",
    tags : ['태그1', '태그2', '태그3', '태그4'],
    shopName : '가게명3',
    shopAddress : '가게주소3',
    shopThumbnail : imgPath.defaultImgPath,
    isScrap : true,
  },
];