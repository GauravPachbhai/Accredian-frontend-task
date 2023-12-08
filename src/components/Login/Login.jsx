import { Box, Button, TextField, styled, Typography, } from "@mui/material";


import axios from "axios";




import { useState } from "react";


const URL = 'http://localhost:8000';
const Wrapper = styled(Box)`
    boxshadow:2px
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
    width:100vh;
`;
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;


const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;
const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer
`;


const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};
const LoginValues = {
    email: '',
    password: ''
}

const accountInitialValues = {
    login: {
        view: 'login',

    },
    signup: {
        view: 'signup',

    }
}
const alertmessage ={
    success :'Login successful',
    failed :'Login failed. Please try again.'
}
const Loginpage = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width:40vh:
`

const LoginPage = () => {

    const [account, toggleAccount] = useState(accountInitialValues.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(LoginValues)
    const [flag, setFlag] = useState(false);

    const onInputChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChangeSign = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }
    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    };

    const handleClose = () => {
        toggleAccount(accountInitialValues.login);
        setFlag(false)

        
    };
    const signupUser = async () => {
        try {
            const response = await axios.post(`${URL}/signup`, signup);
            console.log(response.data);
            handleClose();
            alert('Registered successfully!!'); 
        } catch (error) {

            console.error('Error signing up:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${URL}/login`, login);

            setFlag(true)
            handleClose()
            alert(alertmessage.success); 
            console.log(response.data);
        } catch (error) {

            console.error('Error logging in:', error);
            alert(alertmessage.failed); 
        }
    };




    return (
        <Loginpage onClose={handleClose}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh',
                    width: '60vh',
                }}
            >
                {account.view === 'login' ? (
                    <Wrapper
                        sx={{
                            padding: '0 2rem',
                            borderRadius:2,
                            boxShadow: '0 3px 4px rgba(0, 0, 0, 0.5)',
                            height:'40vh',
                            width:'20vh'
                        }}
                    >
                        <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label="Enter email/Mobile number" />
                        <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label="Enter password" />
                        <Text>
                            By continuing, you agree to all Terms of Use and Privacy Policy.
                        </Text>
                        <LoginButton onClick={() => handleSubmit()}>Login</LoginButton>
                        <CreateAccount onClick={() => toggleSignup()}>
                            Signup here?
                        </CreateAccount>
                    </Wrapper>

                ) : (
                    <Box
                        component="form"

                        sx={{
                            boxShadow: 2,
                            borderRadius: 2,
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <div>
                            <TextField

                                required
                                id="outlined-required"
                                label="email"
                                onChange={(e) => onInputChangeSign(e)}
                                name="email"
                            />
                            <TextField

                                required
                                id="outlined-required"
                                label="Firstname"
                                onChange={(e) => onInputChangeSign(e)}
                                name="firstname"
                            />
                        </div>
                        <div>
                            <TextField

                                required
                                id="outlined-required"
                                label="lastname"
                                onChange={(e) => onInputChangeSign(e)}
                                name="lastname"

                            />
                            <TextField

                                required
                                id="outlined-required"
                                label="username"
                                oonChange={(e) => onInputChangeSign(e)}
                                name="username"

                            />
                        </div>
                        <div>
                            <TextField

                                required
                                id="outlined-required"
                                label="password"
                                onChange={(e) => onInputChangeSign(e)}
                                name="password"
                                variant="standard"
                            />
                            <TextField

                                required
                                id="outlined-required"
                                label="phone"
                                onChange={(e) => onInputChangeSign(e)}
                                name="phone"
                                variant="standard"
                            />
                        </div>
                        <LoginButton style={{ marginLeft: '2%', marginBottom: "2%" }} onClick={() => signupUser()} >SignUp</LoginButton>
                    </Box>
                    
                )}
                {flag && <div className="alert">Login Successful!</div>} 
                


            </Box>
        </Loginpage>
    );
};

export default LoginPage;
