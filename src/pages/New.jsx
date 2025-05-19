import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyHeader from '../components/MyHeader.jsx';
import MyButton from '../components/MyButton.jsx';
import DiaryEditor from '../components/DiaryEditor';

const New = () => {
  const navigate = useNavigate();

  return (
    <div>
      <MyHeader 
        headText={"새 일기 작성하기"} 
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <DiaryEditor />
    </div>
  );
};

export default New;