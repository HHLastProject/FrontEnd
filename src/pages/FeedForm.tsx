import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { path } from '../shared/path';
import { fontType } from '../components/ui/styles/typo';
import { colorSet } from '../components/ui/styles/color';
import SearchStore from '../components/search/SearchInput';
import useTextHandler from '../custom/jh/useTextCountHandler';
import { getToken } from '../apis/getToken';
import { sendFeedData } from '../custom/jh/sendFeedData';
import { Link } from 'react-router-dom';
import { HFlex, VFlex } from '../custom/ym/styleStore';
import ListHeader from '../components/home/ListHeader';
import { IconPlusWhite24 } from '../components/ui/element/icons/IconsStyle';
import BtnResetStyle from '../components/ui/element/buttons/BtnReset';
import { SelectData } from '../shared/select';
import CheckBtns from '../components/feedForm/CheckBtns';

interface IImgFile {
  feedPic: File | null;
  previewPic: string | ArrayBuffer | null;
};

function FeedForm() {
  const location = useLocation();
  let shopId: number | null = null;
  if (location.state?.shopId) shopId = Number(location.state.shopId);
  let shopName: string | null = null;
  if(location.state?.shopName) shopName = location.state.shopName;
  let isFeedForm: boolean = false;
  if(location.state?.isFeedForm) isFeedForm = location.state.isFeedForm;

  const navi = useNavigate();
  const maxLength = 500;
  const [comment, setComment] = useState<string>('');
  const [inputValue, setInputValue] = useState('');//가게 이름 입력
  const [checkList, setCheckList] = useState<string[]>([]);
  const [imgFile, setImgFile] = useState<IImgFile>({
    feedPic: null,
    previewPic: null,
  });
  const { count, textCountAndSetHandler } = useTextHandler(maxLength, setComment);

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
        };
      };
    };
  };

  //전송 버튼 눌렀을때
  const onClickSendFeedData = (shopId: number | null) => {
    setComment(pre => pre.trim());

    //[{tag: '데이터'}, {tag: '데이터'}] 이 형태로 저장하기 위함
    let tags = [];
    if(checkList.length !== 0) {
      for(let check of checkList)
      tags.push({tag: check});
    }

    const checkResult = [...tags];
    if (shopId && imgFile.feedPic && getToken()) {
      const formData = new FormData();
      formData.append('feedPic', imgFile.feedPic);
      formData.append('shopId', shopId.toString());
      formData.append('comment', comment);
      formData.append('tags', JSON.stringify(checkResult));

      sendFeedData(shopId, formData).then(() => {
        if(isFeedForm){
          navi(`${path.feedList}`);
        } else {
          navi(-1);
        };
      });
    } else {
      alert("가게명과 사진을 등록해주세요.");
    };
  };

  const inputClickHandler = () => {
    document.getElementById('input-preview-img')?.click();
  };

  useEffect(() => {
    if (shopName) { setInputValue(shopName) };

    if (!getToken()) {
      alert('로그인 해야 이용 가능합니다.');
      navi(path.login);
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
          {(inputValue && imgFile.previewPic)
            ?
            <BtnResetStyle>
              <Title4 color={`${colorSet.blue}`}>완료</Title4>
            </BtnResetStyle>
            :
            <Title4 color={`${colorSet.lineLight}`}>완료</Title4>
          }
        </div>
      </ListHeader>
      <FeedFormContainer>
        <VFlex>
          <Title3 style={{marginBottom: '20px'}}>새로운 기록</Title3>
          <FeedFormTitle>
            <Title4>방문한 카페</Title4>
            <Body4 color={colorSet.textMedium}>필수</Body4>
          </FeedFormTitle>
          <Link
            to={`${path.search}`}
            state={{link: `${path.feedForm}`}}
          >
            <SearchStore
              inputValue={inputValue}
              setInputValue={setInputValue}
              placeholder='카페 이름 입력하기'
              setDataList={setInputValue}
              isFeedForm={true}
            />
          </Link>
        </VFlex>

        {/* 미리보기 */}
        <VFlex>
          <FeedFormTitle>
            <Title4>사진</Title4>
            <Body4 color={colorSet.textMedium}>필수</Body4>
          </FeedFormTitle>
          <input
            id='input-preview-img'
            type="file"
            name="feedPic"
            onChange={previewImg}
            hidden
          />
            <ImgPreview
              onClick={inputClickHandler}
            >
              {(typeof imgFile.previewPic === "string")
                ?
                <img id='preview-img' src={imgFile.previewPic} alt="이미지 미리보기" />
                :
                <PriviewDiv>
                  <IconPlusWhite24 />
                  <>0/1</>
                </PriviewDiv>
              }
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

        {/* 태그 */}
        <VFlex>
          <FeedFormTitle>
            <Title4>태그</Title4>
            <Body4 color={colorSet.textMedium}>선택</Body4>
          </FeedFormTitle>
          <HFlex gap={'4px'}>
            <CheckBtns
              checkList={checkList}
              setCheckList={setCheckList}
              arr={SelectData.TAG_SELECT}
            />
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

const Margin = styled.div<{ margin: string }>`
  margin: ${({ margin }) => margin};
`;

const FeedFormTextarea = styled.textarea`
  height: 188px;
  padding: 16px;
  border: 1px solid ${colorSet.lineMedium};
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
  cursor: pointer;
  background-color: ${colorSet.lineMedium};
  #preview-img {
    height: 112px;
  }
`;

const PriviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  ${fontType.body_5}
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

export const Title4 = styled.label<{ color?: string }>`
  color: ${({ color }) => color};
  ${fontType.title_4}
`;
export const Title3 = styled.label<{ color?: string }>`
  color: ${({ color }) => color};
  ${fontType.title_3}
`;
export const Body4 = styled.label<{ color?: string }>`
  color: ${({ color }) => color};
  ${fontType.body_4}
`;
export const Body5 = styled.label<{ color?: string }>`
  color: ${({ color }) => color};
  ${fontType.body_5}
`;