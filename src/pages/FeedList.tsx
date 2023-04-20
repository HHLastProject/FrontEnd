import React, { useEffect } from 'react'
import useGetFeedList from '../custom/jh/useGetFeedList'

function FeedList() {
  const {feedList, feedListIsLoading, feedListIsError} = useGetFeedList();
  useEffect(() => {
    
  }, []);

  return (
    <div>
      {feedList?.map((item: any) => {
        <div>
          {item.nickname}
          {}
          {}
        </div>

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
  shopName : string;
  shopAddress : string;
  shopThumbnail : string;
  isScrap : boolean;
};

// const dumiData: IFeedList[] = {
//   {
//     nickname: "닉네임";
//     profilePic : "/";
//     createdAt : "2023.04.01";
//     feedPic : "/";
//     comment : "";
//     tags : string[] | null;
//     shopName : string;
//     shopAddress : string;
//     shopThumbnail : string;
//     isScrap : boolean;
//   }
// };