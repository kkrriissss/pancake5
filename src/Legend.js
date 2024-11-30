import React from "react";

const Legend = ({ keys, colors }) => {
  const reversedKeys = [...keys].reverse();
  const reversedColors = [...colors].reverse();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "-400px", 
      }}
    >
      {reversedKeys.map((key, index) => (
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: reversedColors[index],
              marginRight: "10px",
            }}
          ></div>
          <span style={{ fontSize: "12px" }}>{key}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
