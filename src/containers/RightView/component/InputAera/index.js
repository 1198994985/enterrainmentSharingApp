import React, { useState, useCallback, useEffect } from "react";
import "./index.less";

const iconClassConfig = [
  "icon-biaoqing",
  "icon-wenjianshangchuan",
  "icon-tupian"
];

export function InputAera({
  sendClick,
  videoApply,
  setUpLoadVisible,
  sharingText
}) {
  const [value, setValue] = useState();

  const valueChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  const sendMsg = () => {
    if (!value) {
      return;
    }
    sendClick(value);
    setValue("");
  };
  useEffect(() => {
    if (sharingText) {
       if (sharingText.split("=").length>1) setValue(sharingText.split("=")[1]);
    }
   
  }, [sharingText]);
  return (
    <>
      <div className="input-aera">
        <header className="input-aera-header">
          {iconClassConfig.map((item, index) => {
            if (index === 0) {
              return (
                <span
                  className={"iconfont " + item}
                  key={index}
                  onClick={videoApply}
                ></span>
              );
            } else {
              return (
                <span
                  className={"iconfont " + item}
                  key={index}
                  onClick={setUpLoadVisible}
                ></span>
              );
            }
          })}
        </header>

        <textarea value={value} onChange={valueChange} />
        {/* <div
         
          contentEditable="true"
        >
        </div> */}
        <footer className="input-aera-footer">
          <div className="send-button" onClick={sendMsg}>
            Send
          </div>
        </footer>
      </div>
    </>
  );
}
