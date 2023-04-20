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

type Ttag = { tag: string };
type Ttags = Ttag[] | [] | null | any;
type Ttoken = string | null;

interface IFeedResister {
  shopId: number;
  // feedPic: File | string | FormData;
  comment: string | null;
  tags: Ttags;
};

type imgFile = {
  feedPic: File | string;
  previewPic: string | ArrayBuffer | null;
};

function FeedForm() {
  const navi = useNavigate();
  const param = Number(useParams().shopId);
  let tags: Ttags = [];
  let token: Ttoken = null;
  const maxLength = 500;
  const { searchClickHandler } = useNavigateHandler();
  const [comment, setComment] = useState<string | null>(null);
  const [hashTags, setHashTags] = useState<Ttags>(null);

  const [imgFile, setImgFile] = useState<imgFile>({
    feedPic: '',
    previewPic: `${defaultImgPath.shopList}`,
  });

  const [formDataList, setFormDataList] = useState<IFeedResister>({
    shopId: param,
    // feedPic: new FormData(),
    comment: comment,
    tags: hashTags,
  });

  const { count, textCountAndSetHandler } = useTextHandler(maxLength, setComment);
  const { shopDetailData, shopDetailIsError } = useGetShopDetail(param);
  const [inputValue, setInputValue] = useState('');

  if (shopDetailIsError) { alert('에러') };

  //이미지 미리보기
  const previewImg = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    if ((e !== null) && (e.target.files !== null)) {
      const fileReader = new FileReader();
      e.preventDefault();
      if (e.target.files[0]) {
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = () => {
          setImgFile({
            feedPic: e.target.files[0],
            previewPic: fileReader.result
          });
          console.log('onload', imgFile);
        };
      };
    };
  };

  const onClickSendFeedData = (param: number) => {
    token = getToken();
    console.log('버튼 누름');
    setHashTags(tags);
    console.log('해시set', hashTags, tags);
    console.log('imgFile.feedPic: ', imgFile.feedPic);

    if (!token) {
      alert('로그인 해야 이용 가능합니다.');
      // navi('/login');
      return;
    };

    if (imgFile.feedPic && (param !== 0) && token) {
      console.log('코멘트', comment, '해시태그', hashTags);
      const formData = new FormData();
      formData.append('feedPic', imgFile.feedPic);
      // formData.append('feedPic', imgFile.feedPic, 파일명);

      console.log("처음 formData 셋팅할때 formData('feedPic') :", formData.get('feedPic'));
      setFormDataList({
        shopId: param,
        // feedPic: formData as FormData,
        comment: comment,
        tags: hashTags,
      });
      // const a = formDataList.feedPic as FormData;
      // console.log('a는 ', a.getAll('feedPic'));
      console.log("formDataList", formDataList);
      // console.log("formDataList.feedPic", formDataList.feedPic.get());
      sendFeedData(param, formData);
    } else {
      alert("가게명 또는 사진을 등록해주세요.");
    };
  };

  const sendFeedData = async (param: number, b: FormData) => {

    // console.log('state에 안넣고 보낼때 b:', b);
    // console.log('객체에 넣기 전 b.get(feedPic):', b.get('feedPic'));

    const newOb = { feedPic: b, ...formDataList };

    console.log('객체 합쳤을때 newOb:', newOb);
    console.log('객체 합쳤을때 b.get(feedPic):', newOb.feedPic.get('feedPic'));


    await api.post(`/api/shop/${param}/feed22`, { feedPic: b, ...formDataList }, {
      headers: { authorization: `${token}` },
    })
      .then((resolve) => {
        console.log("피드 등록 성공");
        alert("등록이 완료되었습니다!");
        navi(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //토큰 가져오기
  const getToken = () => {
    const token = localStorage.getItem('access_token');
    return token;
  };

  //태그 추가
  const addTag = (value: string) => {
    if (value && tags) {
      tags.push({ tag: value });
      console.log(tags);
    };
  };

  useEffect(() => {
    if (shopDetailData?.shopName) { setInputValue(shopDetailData?.shopName) };
    token = getToken();
    console.log(token);
  }, []);

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
          onClick={() => onClickSendFeedData(param)}
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