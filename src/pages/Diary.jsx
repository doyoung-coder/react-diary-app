import { useParams } from "react-router-dom";

const Diary = () => {
  const Params = useParams();
  console.log(Params);
  return <div>{Params.id}번 일기입니다~~</div>;
};

export default Diary;
