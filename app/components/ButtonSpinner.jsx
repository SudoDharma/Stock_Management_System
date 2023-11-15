import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ButtonSpinner = () => {
  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 24,
            filter: "brightness(0) invert(1)",
          }}
          spin
        />
      }
    />
  );
};

export default ButtonSpinner;
