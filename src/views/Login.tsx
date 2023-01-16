import * as React from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form'
import TextField from '@mui/material/TextField';
import GreenThemedButton from '../components/buttons/GreenThemedButton';

interface ILoginProps {
}

const Container = styled.form`
  display: flex;
  color: white;
  flex-direction: column;
  max-width: 616px;
`;

const Title = styled.div`
  display: flex;
  font-size: 42px;
  margin-bottom: 1rem;
  font-weight: 300;
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

`;

const Input = styled(TextField)`
  color: white;
  background-color: #3f3f4a;
  width: calc(50% - 8px);
`;


const Login: React.FunctionComponent<ILoginProps> = (props) => {
    const {register, handleSubmit,  } = useForm({
        defaultValues: {
            username: '', 
            password: ''
        }
    })
    const onSubmit = (formData:any)=> {
        console.log(formData)
    }


  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
       
       
        <Title>Log in to Net Finance</Title>



    <Wrapper>
        <Input
            {...register('username')}
            label='Username'
        />

        <Input
            {...register('password')}
            type='password'
            label={'Password'}
        />
    </Wrapper>

    <GreenThemedButton title='Log In'/>
    </Container>
  );
};

export default Login;
