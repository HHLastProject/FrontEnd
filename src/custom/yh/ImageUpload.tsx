import React, { useState } from 'react'
import styled from 'styled-components';

interface ImageUploadProps {
  id : string;
  type : string;
  accept : string;
  children: React.ReactNode;
  name: string;
  value: File | undefined;
  set : any

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ImageUpload({ children, name, onChange,set }: ImageUploadProps) {
  const [myImage, setMyImage] = useState<string[]>([]);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const imageList = e.target.files;
    // if (imageList) {
    //   const formData = new FormData();
    //   if (children=== "대표이미지") {
    //     formData.append("thumbnail", imageList[0]);
    //     set((old:object) => {
    //       return { ...old, thumbnail: formData };
    //     });
    //   } else if (children === "이미지") {
    //     formData.append("menuPictures[]", imageList[0]);
    //     const newMenuPictures = [...old.menuPictures, formData];
    //     set((old:object) => {
    //       return { ...old, menuPictures: newMenuPictures };
    //     });
    //   }
    // }

    const ImageList = e.target.files;
    // console.log(ImageList)
    if (ImageList) {
      const formData = new FormData();
      formData.append("thumbnail", ImageList[0])
      // for (let i = 0; i < ImageList.length; i += 1) {
      // formData.append(name === 'menuPictures' ? 'menuPictures[]' : name, ImageList[i]);
      // }
      setMyImage((prevImages) => [
        ...prevImages,
        ...Array.from(ImageList).map((file) => URL.createObjectURL(file)),
      ]);
      // console.log(formData.get('thumbnail'));
      // console.log(formData.has('thumbnail'));
      set((old:object) => {
        return {...old, thumbnail : formData}
      })
    }
  }
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
            name={isMultiUpload ? 'menuPictures[]' : 'menuPictures'}
            onChange={addImage}
            id="fileInput"
            style={{ display: 'none' }}
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

const StInforInner= styled.form`
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999;
`

const StImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;