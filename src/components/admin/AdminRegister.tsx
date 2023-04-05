import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ImageUpload from "../../custom/yh/ImageUpload";
import Button from "../../custom/yh/Button";
import useAdminRegister from "../../custom/yh/useAdminRegister";
import Post from "../../custom/yh/Post";

interface ShopRegister {
  shopName: string,
  category : string,
  address: string,
  operatingTime: string,
  phoneNumber: string,
  thumbnail: File | undefined, 
  menu: Menu[],
  menuPictures:(File | undefined)[]
}

interface Menu {
  menuName: string,
  price : number,
  menuDescription : string, 
  menuPictures: File | undefined;
}

function AdminRegister() {
  const navigate = useNavigate();
  const [shopRegister, setShopRegister] = React.useState<ShopRegister>({
    shopName: '',
    category: '',
    address: '',
    operatingTime: '',
    phoneNumber: '',
    thumbnail: undefined,
    menu: [],
    menuPictures:[]
  });

  const [menu, setMenu] =useState<Menu>({
    menuName: '',
    price : 0,
    menuDescription : '',
    menuPictures: undefined,
  });

  const shopRegisterChageHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;
    setShopRegister((old)=> {
      return {...old, [name] : value}
    });
  }; 

  const addMenuItem = () => {
    setShopRegister((prev) => ({
      ...prev,
      menu: [
        ...prev.menu,
        {
          menuName: "",
          price: 0,
          menuDescription: "",
          menuPictures: undefined,
        },
      ],
    }));
  };

  const handleCategorySelect = (category:string) => {
    setShopRegister({ ...shopRegister, category });
  };

  const mutation = useAdminRegister();

  //-------------------------------주소
  const [enroll_company, setEnrollCompany] = useState({
    address:'',
  });
  
  const [popup, setPopup] = useState(false);
  
  const handleInput = (e:any) => {
    setEnrollCompany({
        ...enroll_company,
          [e.target.name]:e.target.value,
      });
  };
  
  const handleComplete = (data:any) => {
      setPopup(!popup);
  };

  // const [image, setImage] = useState({
  //   thumbnail_file: '',
  //   menuPictures_file :'',
  // });
  
  const postHandler = () => {
    const formData = new FormData();
    formData.append('thumbnail', shopRegister.thumbnail);
    shopRegister.menu.forEach((menu, index) => {
      if (menu.menuPictures !== null) {
        formData.append(`menu[${index}][menuPictures]`, menu.menuPictures);
      }
    });
    
    const newShopRegister = {
      shopName: shopRegister.shopName,
      category: shopRegister.category,
      address: enroll_company.address + shopRegister.address,
      operatingTime: shopRegister.operatingTime,
      phoneNumber: shopRegister.phoneNumber,
      thumbnail: shopRegister.thumbnail,
      menu: shopRegister.menu,
      menuPictures: shopRegister.menuPictures
    };
    mutation.mutate(newShopRegister);
  };


  return (
    <StConteiner>
      <StHeaderLogo>
        <StHeaderInner>
          <StCancleBtn
            onClick={() => {
              navigate("/admin/list");
            }}
          >취소
          </StCancleBtn>
        </StHeaderInner>
      </StHeaderLogo>
      <StInforConteiner>
        <StInforInner>
          <StTitleLabel>업체명</StTitleLabel>
          <input
          name = "shopName"
          value={shopRegister.shopName}
          onChange={shopRegisterChageHandle}/>
        </StInforInner>
        <Button 
        value={shopRegister.category}
        categories={['분식', '샐러드', '육류', '해산물']} 
        onSelectCategory={handleCategorySelect} />
        <StInforInner>
          <StTitleLabel>전화</StTitleLabel>
          <input 
          name = "phoneNumber"
          value={shopRegister.phoneNumber}
          onChange={shopRegisterChageHandle}/>
        </StInforInner>
        <StInforInner>
          <StTitleLabel>주소</StTitleLabel>
          <input
          name = "address"
          required
          onChange={handleInput} 
          value={enroll_company.address}/>
          <input
          name = "address"
          required
          onChange={shopRegisterChageHandle} 
          value={shopRegister.address}/>
          <button onClick={handleComplete}>우편번호 찾기</button>
          {popup && <Post setcompany ={setEnrollCompany}></Post>}
        </StInforInner>
        <StInforInner>
          <StTitleLabel>운영시간</StTitleLabel>
          <StInforForm>
          <input 
          type = "textarea"
          name = "operatingTime"
          value={shopRegister.operatingTime}
          onChange={shopRegisterChageHandle}/>
          </StInforForm>
        </StInforInner>
        <ImageUpload
          accept="image/*"
          children="대표이미지"
          type = "file"
          name = "thumbnail"
          id = "thumbnailFile"
          value={shopRegister.thumbnail}
          onChange={shopRegisterChageHandle}
        />
        <div>
        {shopRegister?.menu.map((el, index) => {
          return(
            <div key={index}>
            <StMenuList>
              <StInforInner>
                <StTitleLabel>메뉴명</StTitleLabel>
                <input
                  name={`menuName_${index}`}
                  value={el.menuName}
                  onChange={(e) =>
                    setShopRegister((old) => {
                      const newMenuList = [...old.menu];
                      newMenuList[index] = {
                        ...el,
                        menuName: e.target.value,
                      };
                      return {
                        ...old,
                        menu: newMenuList,
                      };
                    })
                  }
                />
              </StInforInner>
              <StInforInner>
                <StTitleLabel>가격</StTitleLabel>
                <input
                  name={`price_${index}`}
                  value={el.price}
                  onChange={(e) =>
                    setShopRegister((old) => {
                      const newMenuList = [...old.menu];
                      newMenuList[index] = {
                        ...el,
                        price: Number(e.target.value),
                      };
                      return {
                        ...old,
                        menu: newMenuList,
                      };
                    })
                  }
                />
              </StInforInner>
              <StInforInner>
                <StTitleLabel>메뉴설명</StTitleLabel>
                <input
                  name={`menuDescription_${index}`}
                  value={el.menuDescription}
                  onChange={(e) =>
                    setShopRegister((old) => {
                      const newMenuList = [...old.menu];
                      newMenuList[index] = {
                        ...el,
                        menuDescription: e.target.value,
                      };
                      return {
                        ...old,
                        menu: newMenuList,
                      };
                    })
                  }
                />
              </StInforInner>
               <ImageUpload
                accept="image/*"
                children="이미지"
                type = "file"
                id = "menuPicturesFileInput"
                name={`menuPictures_${index}`}
                value={el.menuPictures ? el.menuPictures : undefined}
                onChange={(e) =>
                  setShopRegister((old) => {
                    const newMenuList = [...old.menu];
                    newMenuList[index] = {
                      ...el,
                      menuPictures: e.target.files[0] as File,
                    };
                    return {
                      ...old,
                      menu: newMenuList,
                    };
                  })
                }
              />
            </StMenuList>
          </div>
          );
        })}
        </div>
            <StBtn>
              <button onClick={addMenuItem}>메뉴추가 +</button>
              <button onClick={postHandler}>저장하기</button>
            </StBtn>
      </StInforConteiner>
    </StConteiner>
  );
}

export default AdminRegister;

const StConteiner = styled.div`
    width: 1135px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const StHeaderLogo = styled.div`
    width: 1135px;
    height: 80px;
`

const StHeaderInner = styled.div`
    width: 500px;
    display: flex;
    margin: 28px;
`

const StCancleBtn = styled.button`
    font-weight: bold;
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
`

const StInforConteiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StInforInner= styled.div`
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
`

const StInforForm= styled.div`
    display: flex;
    flex-direction: column;
`

const StBtn= styled.div`
    display: flex;
    flex-direction: column;
`

const StTitleLabel = styled.div`
    display: flex;
    font-weight : bold;
`

const StMenuList = styled.div`
  
`
