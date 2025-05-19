import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import NotFound from './pages/Notfound';

// 공통으로 사용할 감정 데이터
export const emotionList = [
  {
    emotion_id: 1,
    emotion_img: "😀",
    emotion_descript: "완전 좋음"
  },
  {
    emotion_id: 2,
    emotion_img: "🙂",
    emotion_descript: "좋음"
  },
  {
    emotion_id: 3,
    emotion_img: "😐",
    emotion_descript: "그럭저럭"
  },
  {
    emotion_id: 4,
    emotion_img: "😢",
    emotion_descript: "나쁨"
  },
  {
    emotion_id: 5,
    emotion_img: "😭",
    emotion_descript: "끔찍함"
  }
];

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;