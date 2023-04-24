import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { defaultImgPath, path } from '../shared/path';
import { fontType } from '../components/ui/styles/typo';
import { colorSet } from '../components/ui/styles/color';
import useNavigateHandler from '../custom/jh/useNavigateHandler';
import SearchStore from '../components/search/SearchInput';
import useTextHandler from '../custom/jh/useTextCountHandler';
import { getToken } from '../apis/getToken';
import { sendFeedData } from '../custom/jh/sendFeedData';
import { Link } from 'react-router-dom';

type Ttag = { tag: string } | string;
type Ttags = Ttag[] | [] | null | any;

interface IImgFile {
  feedPic: File | null;
  previewPic: string | ArrayBuffer | null;
};

function FeedForm() {
  const navi = useNavigate();
  const location = useLocation();
  const shopId = Number(location.state.shopId);
  console.log(shopId);
  const shopName = location.state.shopName;
  
  const tags: string[] = [];
  const tagRef: Ttags = useRef([]);
  const [token, setToken] = useState<string | null>(null);
  const maxLength = 500;
  const [comment, setComment] = useState<string | null>(null);
  const [hashTags, setHashTags] = useState<Ttags>([]);
  const [imgFile, setImgFile] = useState<IImgFile>({
    feedPic: null,
    previewPic: `${defaultImgPath.shopList}`,
  });

  const [inputValue, setInputValue] = useState('');
  const { count, textCountAndSetHandler } = useTextHandler(maxLength, setComment);

  //태그 추가
  const addTag = (value: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (value) {
      tags.push(value);
      tagRef.current = tags;
      setHashTags([...tagRef.current]);
    };
  };

  //이미지 미리보기
  const previewImg = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    if ((e !== null) && (e.target.files !== null)) {
      const fileReader = new FileReader();
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

  //전송 버튼 눌렀을때
  const onClickSendFeedData = (shopId: number) => {
    const token = getToken();
    if (imgFile.feedPic && token) {
      const tagsList = tagRef.current.map((item: string) => { return { tag: item } });
      const formData = new FormData();
      formData.append('feedPic', imgFile.feedPic);
      formData.append('shopId', shopId.toString());
      formData.append('comment', comment ? comment : '');
      formData.append('tags', JSON.stringify(tagsList));

      sendFeedData(shopId, formData).then(() => {navi(-1)});
    } else {
      alert("가게명 또는 사진을 등록해주세요.");
    };
  };

  useEffect(() => {
    if (shopName) { setInputValue(shopName) };
    setToken(getToken());

    if (!getToken()) {
      alert('로그인 해야 이용 가능합니다.');
      navi('/login');
      return;
    };
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
          <Link
            to={`${path.search}`}
          >
            <SearchStore
              inputValue={inputValue}
              setInputValue={setInputValue}
              placeholder='카페 이름 입력하기'
              setDataList={setInputValue}
            />
          </Link>
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
              onClick={(e) => addTag("분위기 맛집", e)}
            >
              분위기 맛집
            </button>
            <button
              onClick={(e) => addTag("디저트 맛집", e)}
            >
              디저트 맛집
            </button>
            <button
              onClick={(e) => addTag("커피 맛집", e)}
            >
              커피 맛집
            </button>
            <button
              onClick={(e) => addTag("뷰 맛집", e)}
            >
              뷰 맛집
            </button>
          </div>
        </div>

        <button
          className='sticky-btn'
          onClick={() => onClickSendFeedData(shopId)}
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