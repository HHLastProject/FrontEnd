import React from 'react'
import styled from 'styled-components';
import { Buttons } from '../ui/element/buttons/Buttons';
import { Link } from 'react-router-dom';
import { path } from '../../shared/path';
import { getToken } from '../../apis/getToken';
import { controlVisible } from '../../custom/jh/controlHidden';
import { SelectBoxId } from '../SelectBox';
import IconSize from '../ui/element/icons/IconSize';
import { colorSet } from '../ui/styles/color';
import { fontType } from '../ui/styles/typo';

interface INoResult {
  shopList?: boolean,
  search?: boolean,
  feedList?: boolean,
  favorite?: boolean,
  mypage?: boolean,
  comment?: boolean,
}

function NoResult({shopList, search, feedList, favorite, comment, mypage}: INoResult) {
  const token = getToken();
  let resultImg = `${process.env.PUBLIC_URL}/images/noResult/`;

  if(search || shopList || feedList || favorite) {
    //세워진 판 이미지
    resultImg += `no_result.png`;
  } else if(favorite && !token) {
    //커피잔 이미지
    resultImg += `no_result_img_login.png`;
  } else if(comment) {
    //댓글 없을때
    resultImg += `no_commnet.png`;
  }

  return (
    <NoResultContainer>
      <IconSize.Size100>
        <img src={resultImg} alt="결과가 없습니다." />
      </IconSize.Size100>

      {shopList &&
      <>
        <label>주변엔 카페가 없어요.<br/>반경을 더 넓혀보세요.</label>
        <Buttons.Medium.Default
          onClick={() => controlVisible(SelectBoxId.RANGE_SELECT_ID)}
        >
          반경 설정하기
        </Buttons.Medium.Default>
      </>
      }

      {search &&
        <>
          <label>검색 결과가 없습니다.<br/>단어의 철자가 정확한지 확인해주세요.</label>
        </>
      }

      {(favorite && !token) &&
        <>
          <label>로그인 후<br/>새로운 카페을 저장해 보세요.</label>
          <Link to={`${path.login}`}>
            <Buttons.Medium.Default>로그인 하기</Buttons.Medium.Default>
          </Link>
        </>
      }

      {(favorite && token) &&
        <>
          <label>사람들이 방문한 곳에서<br/>새로운 카페를 찾아보세요.</label>
          <Link to={`${path.feedList}`}>
            <Buttons.Medium.Default>
              피드 구경하기
            </Buttons.Medium.Default>
          </Link>
        </>
      }

      {comment &&
        <>
          <label>첫 댓글을 작성해 보세요.</label>
        </>
      }
    </NoResultContainer>
  )
};

export default NoResult;

const NoResultContainer = styled.div`
  width: 100%;
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 120px;
  gap: 25px;
  label {
    ${fontType.body_4}
    color: ${colorSet.textMedium};
    text-align: center;
  }
`;