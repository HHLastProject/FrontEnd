import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { defaultImgPath, path } from '../shared/path';
import { fontType } from '../components/ui/styles/typo';
import { colorSet } from '../components/ui/styles/color';
import SearchStore from '../components/search/SearchInput';
import useTextHandler from '../custom/jh/useTextCountHandler';
import { getToken } from '../apis/getToken';
import { sendFeedData } from '../custom/jh/sendFeedData';
import { Link } from 'react-router-dom';
import { HFlex, VFlex } from '../custom/ym/styleStore';
import ListHeader from '../components/home/ListHeader';

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
  const shopName = location.state.shopName;
  
  const tags: string[] = [];
  const tagRef: Ttags = useRef([]);
  const formBtn = useRef();
  const [token, setToken] = useState<string | null>(null);
  const maxLength = 500;
  const [comment, setComment] = useState<string | null>(null);
  const [hashTags, setHashTags] = useState<Ttags>([]);
  const [imgFile, setImgFile] = useState<IImgFile>({
    feedPic: null,
    previewPic: `${defaultImgPath.shopList}`,
  });

  // const addForm = useCallback(() => onClickSendFeedData(shopId), [shopId]);

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
    <ListHeader
      feedForm={true}
    >
      <div
        onClick={() => onClickSendFeedData(shopId)}
      >
        <Title4 color={`#427AF5`}>완료</Title4>
      </div>
    </ListHeader>
      <FeedFormContainer>
        <VFlex>
          <Margin margin={`0 0 20px 0`}>
            <Title3>새로운 기록</Title3>
          </Margin>
          <FeedFormTitle>
            <Title4>방문한 카페</Title4>
            <Body4 color={colorSet.textMedium}>선택</Body4>
          </FeedFormTitle>
          <Link
            to={`${path.search}`}
            state={{toFeedForm: true}}
          >
            <SearchStore
              inputValue={inputValue}
              setInputValue={setInputValue}
              placeholder='카페 이름 입력하기'
              setDataList={setInputValue}
            />
          </Link>
        </VFlex>

        <VFlex>
          <FeedFormTitle>
            <Title4>사진</Title4>
            <Body4 color={colorSet.textMedium}>필수</Body4>
          </FeedFormTitle>
          <input
            type="file"
            name="feedPic"
            onChange={previewImg}
          />
          <ImgPreview>
            {(typeof imgFile.previewPic === "string") && <img src={imgFile.previewPic} alt="이미지 미리보기" />}
          </ImgPreview>
        </VFlex>

        <VFlex>
          <FeedFormTitle>
            <Title4>코멘트</Title4>
            <Body4 color={colorSet.textMedium}>선택</Body4>
          </FeedFormTitle>
          <FeedFormTextarea
            onChange={textCountAndSetHandler}
            maxLength={maxLength}
            placeholder='카페에서의 순간을 작성해 주세요.'
          />
          <Margin margin='4px'>
            <CommentTextCount>
              <Body5 color={colorSet.textLight}>{count}/{maxLength}</Body5>
            </CommentTextCount>
          </Margin>
        </VFlex>

        <VFlex>
          <FeedFormTitle>
            <Title4>태그</Title4>
            <Body4 color={colorSet.textMedium}>3개까지 선택</Body4>
          </FeedFormTitle>
          <HFlex gap={'4px'}>
            {["분위기 맛집", "디저트 맛집", "커피 맛집", "뷰 맛집"].map((item: string) => {
              return(
                <TagBtn onClick={(e) => addTag(item, e)}>
                  {item}
                </TagBtn>
              )})
            }
          </HFlex>
        </VFlex>
      </FeedFormContainer>
    </>
  )
}

export default FeedForm

const FeedFormContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 40px;
  margin-bottom: 120px;
  background-color: #fff;
`;

const Margin = styled.div<{margin: string}>`
  margin: ${({margin}) => margin};
`;

const FeedFormTextarea = styled.textarea`
  height: 188px;
  padding: 16px;
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
  margin-bottom: 12px;
`;

const CommentTextCount = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TagBtn = styled.button`
  padding: 7px 12px;
  background-color: ${colorSet.lineLight};
  border-radius: 100px;
  ${fontType.body_3}
  color: ${colorSet.textMedium};
  border: none;
  &:active {
    color: white;
    background-color: #010101;
  }
`;

export const Title4 = styled.label<{color?: string}>`
  color: ${({color})=> color};
  ${fontType.title_4}
`;
export const Title3 = styled.label<{color?: string}>`
  color: ${({color})=> color};
  ${fontType.title_3}
`;
export const Body4 = styled.label<{color?: string}>`
  color: ${({color})=> color};
  ${fontType.body_4}
`;
export const Body5 = styled.label<{color?: string}>`
  color: ${({color})=> color};
  ${fontType.body_5}
`;