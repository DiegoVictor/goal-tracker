import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from './styles';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userKey, setUserKey] = useState('');
  useEffect(() => {
    if (!location.state || !location.state?.key) {
      navigate('/');
    } else {
      const { key } = location.state;

      setUserKey(key);
    }
  }, []);

  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (userKey) {
      const data = JSON.parse(localStorage.getItem(userKey));
      setUserData(data);
    }
  }, [userKey]);

  const [goals, setGoals] = useState([]);
  useEffect(() => {
    if (userKey) {
      localStorage.setItem(userKey, JSON.stringify(userData));
      setGoals(userData.goals);
    }
  }, [userKey, userData]);
  return (
      <Container>
      </Container>
  );
}
