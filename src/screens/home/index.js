import React, { useState } from 'react';
import * as yup from 'yup';
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

  return (
    <Container>
    </Container>
  );
}
