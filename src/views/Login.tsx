import * as React from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form'
import GreenThemedButton from '../components/buttons/GreenThemedButton';
import { Link } from 'react-router-dom';
import {Container, Title, Input, } from '../styles/login-signup'
import { LoginUser } from '../api-requests/user-requests';

interface ILoginProps {
}

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


// Error handling
// Api request

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    const {register, handleSubmit,  } = useForm({
        defaultValues: {
            username: '', 
            password: ''
        }
    })

    const onSubmit = (formData:any)=> {
        console.log(formData)
        LoginUser(formData).then(res=>{
            console.log(res)
        }).catch(err=> {
            console.log(err, 'Wrong username or password')
        })
    }

    const onErrors = (errors: any) => {

    }


  return (
    <Container>
       
       
        <Title>Log in to Net Finance.</Title>



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
    <GreenThemedButton onClick={handleSubmit(onSubmit, onErrors)} title='Log In'/>

    <ForgotPasswordButton to='/forgot-password' >Forgot Password?</ForgotPasswordButton>

    </ButtonWrapper>
    </Wrapper>
    </Container>
  );
};

export default Login;