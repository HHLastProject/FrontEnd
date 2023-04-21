import React, { useEffect, useState } from 'react'
import { VFlex } from '../custom/ym/styleStore';
import FeedProfile from './FeedProfile';
import moment from 'moment';
import { defaultImgPath, imgPath, path } from '../shared/path';
import { Link } from 'react-router-dom';
import FeedPicture from './feed/FeedPicture';
import FeedComment from './feed/FeedComment';
import styled from 'styled-components';
import { PRIMARY_01, TITLE_5 } from '../custom/ym/variables';
import TagList from './feed/TagList';
import PlaceCard from './feed/PlaceCard';

export interface IFeedList {
  nickname: string;
  profilePic : string | undefined | null;
  createdAt : string | Date;
  feedPic : string;
  comment : string | null;
  tags : Array<Ttag> | [];
  shopId : number;
  shopName : string;
  shopAddress : string;
  shopThumbnail : string;
  isScrap : boolean;
};

type Ttag = {tag: string};

// function FeedContents2({shopId, profilePic, createAt, nickname, feedId, comment, shopName, shopAddress, shopThumbnail}) {
//   const [expand, setExpand] = useState<boolean>(false);
//   const expandButtonHandler = () => {
//     setExpand(prev => !prev);
//   }

//   return (
//     <>
      
//       <div key={`${shopId + index}`}>
//         <VFlex gap='12px' etc='padding:20px;'>
//           {profilePic ? 
//             <FeedProfile 
//               profilePic={profilePic}
//               nickname={nickname}
//               createdAt={moment(createAt).format("YYYY.MM.DD")}
//             />
//             :
//             <FeedProfile 
//               profilePic={defaultImgPath.shopList}
//               nickname={nickname}
//               createdAt={moment(createAt).format("YYYY.MM.DD")}
//             />
//           }
//           <Link to={`${path.toFeedDetail + '/' + feedId}`}>
//             <FeedPicture>{process.env.REACT_APP_SERVER_URL + '/uploads/' + feedPic}</FeedPicture>
//             <FeedComment isExpanded={expand}>{comment}</FeedComment>
//           </Link>
//           <ExpandButton onClick={expandButtonHandler}>
//             <ExpandText>{expand ? "닫기" : "더 보기"}</ExpandText>
//           </ExpandButton>
//           <TagList>{tags}</TagList>
//           <Link to={`${path.toShopDetail + '/' + shopId}`}>
//             <PlaceCard
//               shopThumbnail={imgPath.shopThumbnailImg + shopThumbnail}
//               shopName={shopName}
//               shopAddress={shopAddress}
//             />
//           </Link>
//         </VFlex>
//       </div>
//     </>
//   )
// }

// export default FeedContents2

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