
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MyHeader from '../components/MyHeader.jsx';
import MyButton from '../components/MyButton.jsx';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [originData, setOriginData] = useState(null);

  useEffect(() => {
    const storedDiaries = localStorage.getItem('diaries');
    if (storedDiaries) {
      const diaryList = JSON.parse(storedDiaries);
      const targetDiary = diaryList.find(
        (diary) => diary.id === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("존재하지 않는 일기입니다.");
        navigate('/', { replace: true });
      }
    }
  }, [id, navigate]);

  return (
    <div>
      <MyHeader 
        headText={"일기 수정하기"} 
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      {originData && (
        <DiaryEditor isEdit={true} originData={originData} />
      )}
    </div>
  );
};

export default Edit;