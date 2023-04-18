import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useNavigateHandler from '../custom/jh/useNavigateHandler';
import useTextCountHandler from '../custom/jh/useTextCountHandler';
import SearchStore from '../components/search/SearchInput';
import api from '../shared/api';

interface IFeedResister {
  shopId: string;
  feedPic : string;
  comment : string;   //null허용
  tags : string [];   //null허용
};

function ShopDetailFeedForm() {
  const param = useParams().shopId;
  const maxLength = 500;
  const {count, textCountHandler} = useTextCountHandler(maxLength);

  const [inputValue, setInputValue] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [dataList, setDataList] = useState([]);
  const {searchClickHandler} = useNavigateHandler();
  const [shopData, setShopData] = useState({
    shopId : 0,
    shopName : '',
    shopAddress : '',
  });

  type imgFile = {
    image_file: File | string;
    preview_URL: string | ArrayBuffer | null;
  }

  const [image, setImage] = useState<imgFile>({
    image_file: "",
    preview_URL: "img/default_image.png",
  });

  // const saveImg = (e: ) => {
  //   e.preventDefault();
  //   const fileReader = new FileReader();
    
  //   if(e.target.files[0]){
  //     fileReader.readAsDataURL(e.target.files[0])
  //   }
  //   fileReader.onload = () => {
  //     setImage(
  //       {
  //         image_file: e.target.files[0],
  //         preview_URL: fileReader.result
  //       }
  //     )
  //   }
  // }

  const sendImg = async () => {
    if(image.image_file){
      const formData = new FormData()
      formData.append('file', image.image_file);
      await api.post(`/api/shop/${param}/feed`, formData);
      alert("서버에 등록이 완료되었습니다!");
      setImage({
        image_file: "",
        preview_URL: "img/default_image.png",
      });
    }
    else{
      alert("사진을 등록해주세요.")
    }
  }

  const naverAccessToken = () => {
    window.location.href.includes('access_token') && getNaverToken();
  };
  const getNaverToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    console.log(token);
    localStorage.setItem('access_token', token);
  };

  useEffect(() => {
    naverAccessToken();
  },[])

  return (
    <>
      <form 
        action={`/api/shop/${param}/feed`} 
        method='POST'
        encType='multipart/form-data'
      >
        <ShopDetailReviewFormContainer>
          <h2>새로운 기록</h2>
          <div>
            <div>
              <h3>방문한 카페</h3>
              <label>선택</label>
            </div>
            <div
              onClick={searchClickHandler}
            >
              <SearchStore
                inputValue={inputValue}
                setInputValue={setInputValue}
                placeholder='카페 이름 입력하기'
                setDataList={setDataList}
              />
            </div>
          </div>
          <div>
            <div>
              <h3>사진</h3>
              <label>필수</label>
            </div>
            <div
              // onClick={}
            >
              <input type="file" name="shopFeedImg"/>
              {/* {imgFile && <img src='' alt=''/>} */}
            </div>
          </div>
          <div>
            <div>
              <h3>코멘트</h3>
              <label>선택</label>
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

          <button
            className='sticky-btn'
            // onClick={}
          >
            작성 완료
          </button>
        </ShopDetailReviewFormContainer>
      </form>
    </>
  )
}

export default ShopDetailFeedForm

const ShopDetailReviewFormContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  h2 {
    font-size: 18px;
    font-weight: 600;
  }
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