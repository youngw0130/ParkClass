import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryList from '../components/DiaryList';
import MyHeader from '../components/MyHeader.jsx';
import MyButton from '../components/MyButton.jsx';

const Home = () => {
  const navigate = useNavigate();
  const [diaries, setDiaries] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedDiaries = localStorage.getItem('diaries');
    if (storedDiaries) {
      setDiaries(JSON.parse(storedDiaries));
    }
  }, []);

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const handlePrevMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
  };

  const handleNextMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
  };

  const filteredDiaries = diaries.filter((diary) => {
    const diaryDate = new Date(diary.date);
    return (
      diaryDate.getFullYear() === curDate.getFullYear() &&
      diaryDate.getMonth() === curDate.getMonth()
    );
  });

  const getEmotionFilteredDiary = () => {
    if (filter === 'good') {
      return filteredDiaries.filter(diary => diary.emotion <= 3);
    } else if (filter === 'bad') {
      return filteredDiaries.filter(diary => diary.emotion > 3);
    }
    return filteredDiaries;
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <MyHeader 
        headText={headText} 
        leftChild={<MyButton text={"<"} onClick={handlePrevMonth} />}
        rightChild={<MyButton text={">"} onClick={handleNextMonth} />}
      />
      
      <div className="control-menu">
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">모든 감정</option>
          <option value="good">좋은 감정만</option>
          <option value="bad">안 좋은 감정만</option>
        </select>
        <MyButton 
          text={"새 일기 작성"} 
          type={"positive"} 
          onClick={() => navigate('/new')} 
        />
      </div>
      
      <DiaryList diaryList={getEmotionFilteredDiary()} />
      
      {getEmotionFilteredDiary().length === 0 && (
        <div className="empty-list">
          작성된 일기가 없습니다. 첫 일기를 작성해 보세요!
        </div>
      )}
    </div>
  );
};

export default Home;