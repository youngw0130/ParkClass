import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../components/MyButton';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404 Not Found</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <MyButton 
        text={"홈으로 돌아가기"} 
        onClick={() => navigate('/')} 
      />
    </div>
  );
};

export default NotFound;