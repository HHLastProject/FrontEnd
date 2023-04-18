import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useNavigateHandler from '../custom/jh/useNavigateHandler';
import useTextCountHandler from '../custom/jh/useTextCountHandler';
import SearchStore from '../components/search/SearchInput';
import api from '../shared/api';
import { useGetShopDetail } from '../custom/jh/useGetShopDetail';
import { defaultImgPath } from '../shared/path';
import { fontType } from '../components/ui/styles/typo';

interface IFeedResister {
  shopId: number;
  feedPic : File | string | FormData;
  comment : string | null;   //null허용
  tags : string[] | null;   //null허용
};

type imgFile = {
  feedPic: File | string;
  previewPic: string | ArrayBuffer | null; 
};

function FeedForm() {
  const param = Number(useParams().shopId);
  const maxLength = 500;
  const {count, textCountHandler} = useTextCountHandler(maxLength);
  const {searchClickHandler} = useNavigateHandler();
  const [comment, setComment] = useState(null);
  const [hashTags, setHashTags] = useState(null);
  let tags: string[] = [];

  const {
    shopDetailData,
    shopDetailIsLoading,
    shopDetailIsError
  } = useGetShopDetail(param);

  const [inputValue, setInputValue] = useState(shopDetailData?.shopName ? shopDetailData?.shopName : '');
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


  const saveImg = (e: any) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if(e.target.files[0]){
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImgFile({
        feedPic: e.target.files[0],
        previewPic: fileReader.result
      });
    }
  };

  const sendFeedData = async (param: number) => {
    if(imgFile.feedPic){
      const formData = new FormData();
      formData.append('file', imgFile.feedPic);
      setFormDataList({
        shopId: param,
        feedPic : formData,
        comment : null,
        tags : null,
      });
      await api.post(`/api/shop/${param}/feed`, formDataList);
      setImgFile({
        feedPic: "",
        previewPic: "img/default_image.png",
      });
      alert("서버에 등록이 완료되었습니다!");
    }
    else{
      alert("사진을 등록해주세요.")
    }
  }

  if(!shopDetailData?.shopName) {setInputValue('')};

  const naverAccessToken = () => {
    window.location.href.includes('access_token') && getNaverToken();
  };
  const getNaverToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    console.log(token);
    localStorage.setItem('access_token', token);
  };

  const addTag = (value: string) => {
    tags.push(value);
    console.log(tags);
  };

  useEffect(() => {
    naverAccessToken();
    console.log(shopDetailData);
  },[]);

  return (
    <>
      <ShopDetailReviewFormContainer>
        <Title3>새로운 기록</Title3>
        <div>
          <div>
            <Title4>방문한 카페</Title4>
            <Body4>선택</Body4>
          </div>
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
          <div>
            <Title4>사진</Title4>
            <Body4>필수</Body4>
          </div>

          <input 
            type="file" 
            name="feedPic"
            onChange={saveImg}
          />
          <ImgPreview
            // onClick={}
          >
            {(typeof imgFile.previewPic === "string") && <img src={imgFile.previewPic} alt="이미지 미리보기" />}
          </ImgPreview>
        </div>
        <div>
          <div>
            <Title4>코멘트</Title4>
            <Body4>선택</Body4>
          </div>
          <ShopDetailReviewTextarea
            onChange={textCountHandler}
            maxLength={maxLength}
            placeholder='카페에서의 순간을 작성해 주세요.'
          />
          <div className='text-count'>
            <label>{count}/{maxLength}</label>
          </div>
        </div>
    
        <div>
          <div>
            <Title4>태그</Title4>
            <Body4>3개까지 선택</Body4>
          </div>
          <div>
            <button
              onClick={(e) => addTag("분위기 맛집")}
            >
              분위기 맛집
            </button>
            <button
              onClick={(e) => addTag("디저트 맛집")}
            >
              디저트 맛집
            </button>
            <button
              onClick={(e) => addTag("커피 맛집")}
            >
              커피 맛집
            </button>
            <button
              onClick={(e) => addTag("뷰 맛집")}
            >
              뷰 맛집
            </button>
          </div>
        </div>

        <button
          className='sticky-btn'
          // onClick={}
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

export const Title4 = styled.label`
  ${fontType.title_4}
`;
export const Title3 = styled.label`
  ${fontType.title_3}
`;
export const Body4 = styled.label`
  ${fontType.body_4}
`;