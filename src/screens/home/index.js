import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosLogIn } from 'react-icons/io';
import * as yup from 'yup';
import { SHA3 } from 'crypto-js';

import Input from 'components/input';
import Button from 'components/button';
import Help from 'components/help';
import Error from 'components/error';

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

  const defaultHelpText = useMemo(
    () => (
      <Help text="Your email will not be used to any kind of ads, just to keep your goals stored" />
    ),
    []
  );
  const [helpText, setHelpText] = useState(defaultHelpText);

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
          setHelpText(<Error text={err.errors.pop()} />);
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
            data-testid="email"
            type="text"
            maxLength={255}
            right={
              <Button data-testid="submit" type="submit">
                <IoIosLogIn size={28} color="#3b3c45" />
              </Button>
            }
            value={email}
            onChange={(event) => {
              setHelpText(defaultHelpText);
              setEmail(event.target.value.toLowerCase().trim());
            }}
            placeholder="Type your best email"
          />
          {helpText}
        </form>
      </Welcome>
    </Container>
  );
}
