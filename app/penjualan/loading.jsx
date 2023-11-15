import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = () => {
  return (
    <div className="p-40 flex flex-col justify-center gap-3 text-xl text-center font-medium text-indigo-500">
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 60,
              filter:
                "brightness(0) saturate(100%) invert(42%) sepia(87%) saturate(3420%) hue-rotate(224deg) brightness(98%) contrast(92%)",
            }}
            spin
          />
        }
      />
      <p>Memuat...</p>
    </div>
  );
};

export default Loading;
