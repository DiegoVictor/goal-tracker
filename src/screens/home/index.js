import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { SHA3 } from 'crypto-js';

import Input from '../../components/input';
import Welcome from './components/welcome';
import { Container } from './styles';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Please type your best email')
    .email('Must be a valid email'),
});

export default function Home() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      await schema
        .validate({ email })
        .then(() => {
          const key = SHA3(email).toString();

          localStorage.setItem('current_session', key);
          navigate('/dashboard', {
            state: {
              key,
            },
          });
        })
        .catch((err) => {
          setError(err.errors.pop());
        });
    },
    [email]
  );

  useEffect(() => {
    if (
      localStorage.current_session &&
      localStorage.current_session.length > 0
    ) {
      navigate('/dashboard', {
        state: {
          key: localStorage.current_session,
        },
      });
    }
  }, []);

  return (
    <Container>
      <Welcome>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            maxLength={255}
            value={email}
            onChange={(event) => {
              setError(null);
              setEmail(event.target.value.toLowerCase().trim());
            }}
            placeholder="Type your best email"
          />
        </form>
      </Welcome>
    </Container>
  );
}
