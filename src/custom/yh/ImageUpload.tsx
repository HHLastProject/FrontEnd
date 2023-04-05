import React, { useState } from 'react'
import styled from 'styled-components';

interface ImageUploadProps {
  id : string;
  type : string;
  accept : string;
  children: React.ReactNode;
  name: string;
  value: (File | undefined)[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ImageUpload({ children, name, value, onChange}: ImageUploadProps) {
  const [myImage, setMyImage] = useState<string[]>([]);
  

  let ImageURLList = [];

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ImageList = e.target.files;
    ImageURLList = [...myImage];
    console.log(ImageURLList)
    if (ImageList) {
      for (let i = 0; i < ImageList.length; i += 1) {
        const nowImageUrl = URL.createObjectURL(ImageList[i]);
        ImageURLList.push(nowImageUrl);
      }
      setMyImage(ImageURLList);
      onChange(e);
    }
  };

  const isMultiUpload = name === 'menuPictures';

  return (
    <div>
      <StInforInner>
        <StTitleLabel>{children}</StTitleLabel>
        <StSaveImege>
          <input
            type="file"
            accept="image/*"
            multiple
            name={isMultiUpload? 'menuPictures[]':'menuPictures'}
            value={value}
            onChange={addImage}
            id="fileInput"
            style={{display:'none'}}
          />
          <label htmlFor="fileInput">
            {myImage.map((imageUrl) => (
              <StImagePreview key={imageUrl} src={imageUrl} alt="Preview" />
            ))}
            {myImage.length === 0 && <StText>+</StText>}
          </label>
        </StSaveImege>
      </StInforInner>
    </div>
  );
}

export default ImageUpload;

const StInforInner= styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const StTitleLabel = styled.div`
  display: inline-block;
  width: 100px;
  font-size: 16px;
  font-weight: 700;
  margin-right: 20px;
`

const StSaveImege = styled.label`
  display: inline-block;
  width: 70px;
  height: 70px;
  border: 1px dashed #ddd;

  position: relative; 
  // 얘를 없애면 StText가 날라간다 슝~ 안 없애려니 주소 팝업창위에 있다 슝~
  
  margin-right: 20px;
  cursor: pointer;
`

const StText = styled.p`
  font-size: 20px;
  font-weight: 700;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999;
`

const StImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;