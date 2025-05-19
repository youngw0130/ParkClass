
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { emotionList } from '../App.jsx';
import MyHeader from '../components/MyHeader.jsx';
import MyButton from '../components/MyButton.jsx';

const Diary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState(null);

  useEffect(() => {
    const storedDiaries = localStorage.getItem('diaries');
    if (storedDiaries) {
      const diaryList = JSON.parse(storedDiaries);
      const foundDiary = diaryList.find((item) => item.id === parseInt(id));
      
      if (foundDiary) {
        setDiary(foundDiary);
      } else {
        alert("존재하지 않는 일기입니다.");
        navigate('/', { replace: true });
      }
    }
  }, [id, navigate]);

  const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const getEmotionData = (emotionId) => {
    return emotionList.find((item) => item.emotion_id === emotionId);
  };

  const handleDelete = () => {
    if (window.confirm('정말 이 일기를 삭제하시겠습니까?')) {
      const storedDiaries = localStorage.getItem('diaries');
      if (storedDiaries) {
        const diaryList = JSON.parse(storedDiaries);
        const newDiaryList = diaryList.filter((item) => item.id !== parseInt(id));
        localStorage.setItem('diaries', JSON.stringify(newDiaryList));
      }
      navigate('/', { replace: true });
    }
  };

  if (!diary) {
    return <div className="DiaryPage">로딩중...</div>;
  }

  const emotionData = getEmotionData(diary.emotion);

  return (
    <div className="DiaryPage">
      <MyHeader 
        headText={"일기 상세보기"} 
        leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
        rightChild={
          <div style={{ display: 'flex', gap: '10px' }}>
            <MyButton 
              text={"수정하기"} 
              onClick={() => navigate(`/edit/${id}`)} 
            />
            <MyButton 
              text={"삭제하기"} 
              type={"negative"} 
              onClick={handleDelete} 
            />
          </div>
        }
      />
      
      <div className="diary-detail">
        <div className="diary-detail-header">
          <div className="emotion-wrapper">
            <div className={`big-emotion-img emotion-${diary.emotion}`}>
              {emotionData.emotion_img}
            </div>
            <div className="emotion-descript">
              {emotionData.emotion_descript}
            </div>
          </div>
        </div>
        
        <div className="diary-detail-date">
          {getFormattedDate(diary.date)}
        </div>
        
        <div className="diary-detail-content">
          {diary.content}
        </div>
      </div>
    </div>
  );
};

export default Diary;