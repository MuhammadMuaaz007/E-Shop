import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ setDropDown, categoriesData }) => {
  console.log("categoriesData in DropDown:", categoriesData);
  const navigate = useNavigate();
  const handleSubmit = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => handleSubmit(i)}
          >
            <img
              src={i.image_Url}
              alt={i.title}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
            />
            <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
          </div>  
        ))}
    </div>
  );
};

export default DropDown;
