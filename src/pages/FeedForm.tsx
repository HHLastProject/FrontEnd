import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useNavigateHandler from '../custom/jh/useNavigateHandler';
import SearchStore from '../components/search/SearchInput';
import api from '../shared/api';
import { useGetShopDetail } from '../custom/jh/useGetShopDetail';
import { defaultImgPath } from '../shared/path';
import { fontType } from '../components/ui/styles/typo';
import { colorSet } from '../components/ui/styles/color';
import useTextHandler from '../custom/jh/useTextCountHandler';

interface IFeedResister {
  shopId: number;
  feedPic : File | string | FormData;
  comment : string | null;
  tags : string[] | null;
};

type imgFile = {
  feedPic: File | string;
  previewPic: string | ArrayBuffer | null; 
};

function FeedForm() {
  const navi = useNavigate();
  const param = Number(useParams().shopId);
  let tags: string[] = [];
  const maxLength = 500;
  const {searchClickHandler} = useNavigateHandler();
  const [comment, setComment] = useState<string | null>(null);
  const [hashTags, setHashTags] = useState<string[] | null>(null);
  const [imgFile, setImgFile] = useState<imgFile>({
    feedPic: "",
    previewPic: `${defaultImgPath.shopList}`,
  });
  const [formDataList, setFormDataList] = useState<IFeedResister>({
    shopId: param,
    feedPic : '',
    comment : comment,
    tags : hashTags,
  });
  
  const {count, textCountAndSetHandler} = useTextHandler(maxLength, setComment);
  const { shopDetailData, shopDetailIsError } = useGetShopDetail(param);
  const [inputValue, setInputValue] = useState(shopDetailData?.shopName ? shopDetailData?.shopName : '');

  if(!shopDetailData.shopName) {setInputValue('')};
  if(shopDetailIsError) {};

  //이미지 미리보기
  const previewImg = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    if((e !== null) && (e.target.files !== null)) {
      const fileReader = new FileReader();
      // e.preventDefault();
      if(e.target.files[0]){
        fileReader.readAsDataURL(e.target.files[0]);
      };
      fileReader.onload = () => {
        setImgFile({
          feedPic: e.target.files[0],
          previewPic: fileReader.result
        });
      };
    };
  };

  const sendFeedData = async (param: number) => {
    console.log('버튼 누름');
    setHashTags(tags);
    if(imgFile.feedPic && (param !== 0)){
      const formData = new FormData();
      formData.append('feedPic', imgFile.feedPic);
      setFormDataList({
        shopId: param,
        feedPic : formData,
        comment : comment,
        tags : hashTags,
      });
      console.log("formDataList", formDataList);
      await api.post(`/api/shop/${param}/feed`, {
        // headers: {authorization: `Bearer ${token}`},
        data: formDataList,
        })
        .then((resolve) => {
          console.log("성공");
          alert("등록이 완료되었습니다!");
          navi(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else{
      alert("가게명 또는 사진을 등록해주세요.");
    };
  };

  //토큰 가져오기


  //태그 추가
  const addTag = (value: string) => {
    tags.push(value);
    console.log(tags);
  };

  useEffect(() => {
    const token = localStorage.getItem('authorization');
    console.log(token,'토큰');
    console.log(shopDetailData);
  },[]);

  return (
    <>
      <ShopDetailReviewFormContainer>
        <Title3>새로운 기록</Title3>
        <div>
          <FeedFormTitle>
            <Title4>방문한 카페</Title4>
            <Body4>선택</Body4>
          </FeedFormTitle>
          <div
            onClick={searchClickHandler}
          >
            <SearchStore
              inputValue={inputValue}
              setInputValue={setInputValue}
              placeholder='카페 이름 입력하기'
              setDataList={setInputValue}
            />
          </div>
        </div>
    
        <div>
          <FeedFormTitle>
            <Title4>사진</Title4>
            <Body4>필수</Body4>
          </FeedFormTitle>
          <input 
            type="file" 
            name="feedPic"
            onChange={previewImg}
          />
          <ImgPreview>
            {(typeof imgFile.previewPic === "string") && <img src={imgFile.previewPic} alt="이미지 미리보기" />}
          </ImgPreview>
        </div>

        <div>
          <FeedFormTitle>
            <Title4>코멘트</Title4>
            <Body4>선택</Body4>
          </FeedFormTitle>
          <ShopDetailReviewTextarea
            onChange={textCountAndSetHandler}
            maxLength={maxLength}
            placeholder='카페에서의 순간을 작성해 주세요.'
          />
          <div className='text-count'>
            <label>{count}/{maxLength}</label>
          </div>
        </div>
    
        <div>
          <FeedFormTitle>
            <Title4>태그</Title4>
            <Body4>3개까지 선택</Body4>
          </FeedFormTitle>
          <div>
            <button
              onClick={() => addTag("분위기 맛집")}
            >
              분위기 맛집
            </button>
            <button
              onClick={() => addTag("디저트 맛집")}
            >
              디저트 맛집
            </button>
            <button
              onClick={() => addTag("커피 맛집")}
            >
              커피 맛집
            </button>
            <button
              onClick={() => addTag("뷰 맛집")}
            >
              뷰 맛집
            </button>
          </div>
        </div>

        <button
          className='sticky-btn'
          onClick={() => sendFeedData(param)}
        >
          완료
        </button>
      </ShopDetailReviewFormContainer>
    </>
  )
}

export default FeedForm

const ShopDetailReviewFormContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  .text-count {
    display: flex;
    justify-content: flex-end;
  }
  .sticky-btn {
    position: sticky;
    bottom: 0;
  }
`;

const ShopDetailReviewTextarea = styled.textarea`
  width: 100%;
  height: 220px;
  border: 1px solid #DBDBDB;
  border-radius: 10px;
  resize: none;
  outline: none;
`;

const ImgPreview = styled.div`
  width: 112px;
  height: 112px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    height: 112px;
  }
`;

const FeedFormTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const Title4 = styled.label`
  ${fontType.title_4}
`;
export const Title3 = styled.label`
  ${fontType.title_3}
`;
export const Body4 = styled.label`
  ${fontType.body_4}
  color: ${colorSet.textMedium};
`;