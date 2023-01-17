import * as React from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form'
import TextField from '@mui/material/TextField';
import GreenThemedButton from '../components/buttons/GreenThemedButton';
import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';

interface ILoginProps {
}

const Container = styled.form`
  display: flex;
  color: white;
  flex-direction: column;
  max-width: 616px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 70px 0px;
  /* height: 100%; */
  /* flex-grow: 10; */
`;

const Title = styled.div`
  display: flex;
  font-size: 42px;
  margin-bottom: 1rem;
  font-weight: 300;
  text-align: left;
  width: 100%;
`;


const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
    display: flex;
    margin-top: 14px;
    width: 100%;
    justify-content: space-between;
    align-items: center;

`

const Input = styled.input`
  color: white;
  background-color: #3f3f4a;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  padding: 18px 22px;

   @media (min-width: 770px) {
    width: calc(43% - 8px);

    }
    &:active{ 
        border: none;
    }
`;


const ForgotPasswordButton = styled(Link)`
  color: #52e3c2;
  background-color: transparent;
  border: none;
  text-decoration: none;
  margin-top: 15px;
  &:hover{ 
    cursor: pointer;
  }
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
            placeholder={'Username or email'}
            
        />

        <Input
            {...register('password')}
            type='password'
         
            placeholder={'Password'}
        />


    <ButtonWrapper>
    <GreenThemedButton title='Log In'/>

    <ForgotPasswordButton to='/forgot-password' >Forgot Password?</ForgotPasswordButton>

    </ButtonWrapper>
    </Wrapper>
    </Container>
  );
};

export default Login;
