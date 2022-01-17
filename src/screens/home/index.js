import * as yup from 'yup';
import { Container } from './styles';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Please type your best email')
    .email('Must be a valid email'),
});

export default function Home() {
  return (
    <Container>
    </Container>
  );
}
