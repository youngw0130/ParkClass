import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from './MyButton';
import { emotionList } from '../App';

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const contentRef = useRef();
  
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");
  
  useEffect(() => {
    if (isEdit && originData) {
      setDate(originData.date);
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  const handleClickEmotionItem = (emotionId) => {
    setEmotion(emotionId);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
      const storedDiaries = localStorage.getItem('diaries');
      let diaryList = storedDiaries ? JSON.parse(storedDiaries) : [];
      
      if (isEdit) {
        diaryList = diaryList.map((it) =>
          it.id === originData.id
            ? {
                ...it,
                date,
                emotion,
                content
              }
            : it
        );
      } else {
        const newDiary = {
          id: Date.now(),
          date,
          emotion,
          content
        };
        
        diaryList.push(newDiary);
      }
      
      localStorage.setItem('diaries', JSON.stringify(diaryList));
      
      navigate('/', { replace: true });
    }
  };

  const EmotionItem = ({ emotion_id, emotion_img, emotion_descript, onClick, isSelected }) => {
    return (
      <div 
        className={[
          "emotion-item", 
          isSelected ? "selected" : ""
        ].join(" ")} 
        onClick={() => onClick(emotion_id)}
      >
        <div className={`emotion-img-large emotion-${emotion_id}`}>
          {emotion_img}
        </div>
        <span className="emotion-desc">{emotion_descript}</span>
      </div>
    );
  };

  return (
    <div className="diary-form">
      <div className="form-group">
        <label>오늘은 언제인가요?</label>
        <input 
          className="date-input"
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>
      
      <div className="form-group">
        <label>오늘의 감정</label>
        <div className="emotion-select">
          {emotionList.map((it) => (
            <EmotionItem 
              key={it.emotion_id} 
              {...it} 
              onClick={handleClickEmotionItem}
              isSelected={it.emotion_id === emotion}
            />
          ))}
        </div>
      </div>
      
      <div className="form-group">
        <label>오늘의 일기</label>
        <textarea
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘은 어땠나요?"
        />
      </div>
      
      <div className="btn-group">
        <div>
          <MyButton 
            text={"취소하기"} 
            onClick={() => navigate(-1)} 
          />
          {isEdit && (
            <MyButton 
              text={"삭제하기"} 
              type={"negative"} 
              onClick={() => {
                if (window.confirm("정말 삭제하시겠습니까?")) {
                  const storedDiaries = localStorage.getItem('diaries');
                  if (storedDiaries) {
                    const diaryList = JSON.parse(storedDiaries);
                    const newDiaryList = diaryList.filter((it) => it.id !== originData.id);
                    localStorage.setItem('diaries', JSON.stringify(newDiaryList));
                  }
                  navigate('/', { replace: true });
                }
              }} 
            />
          )}
        </div>
        <MyButton 
          text={"저장하기"} 
          type={"positive"} 
          onClick={handleSubmit} 
        />
      </div>
    </div>
  );
};

export default DiaryEditor;