import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

const Post = (props:any) => {
  const complete = (data:any) => {
    let fullAddress = data.address;
    let extraAddress = "";
  
    if (data.addressType === "R") { 
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    props.setcompany({
      ...props.company,
      address: fullAddress,
    });
  };

  return (
    <DaumPostcodeEmbed style={{ 
    background : "rgba(0,0,0,0.25)",
    position : "fixed",
    left:0,
    top:0,
    height:"400px",
    width: "450px",
    }} autoClose onComplete={complete} />
  );
};

export default Post;
