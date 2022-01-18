import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
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

  return (
    <Container>
      <Welcome>
      </Welcome>
    </Container>
  );
}
