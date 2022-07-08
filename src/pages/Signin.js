import React from 'react';
import { Menu, Form, Container } from 'semantic-ui-react';
// import { useHistory } from 'react-router-dom'
// useHistory 新版改成 useNavigate
import { useNavigate } from 'react-router-dom';

// import { getAuth } from 'firebase/auth';
// import { signInWithEmailAndPassword } from "firebase/auth";

import '../utils/firebase'
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
function Signin() {
  // const history = useHistory();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = React.useState('register');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const auth = getAuth()
  function onSubmit() {
    
    // 註冊或登入
    if(activeItem==='register'){
      createUserWithEmailAndPassword(auth,email, password).then(()=>{
        navigate('/')
      })
    }else if(activeItem==='signin'){
      // console.log()
      signInWithEmailAndPassword(auth,email,password).then(()=>{
        navigate('/')
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
    }
   
    // console.log('signin')
    // signInWithEmailAndPassword(email, password)
  }
  return (
    <>
      <Container>
        <Menu widths="2">
          {/* active 會加上樣式,變反灰 
          在每個項目設定 active 樣式產生的條件
          按下項目時,設定滿足條件的值
          */}
          <Menu.Item
            active={activeItem === 'register'}
            onClick={() => setActiveItem('register')}
          >
            註冊
          </Menu.Item>
          <Menu.Item
            active={activeItem === 'signin'}
            onClick={() => setActiveItem('signin')}
          >
            登入
          </Menu.Item>
        </Menu>
        <Form onSubmit={onSubmit}>
          <Form.Input
            label="信箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="請輸入信箱"
          />
          <Form.Input label="密碼"  placeholder="請輸入密碼" 
          value={password}
       
            onChange={(e) => setPassword(e.target.value)}
           type="password"
          />
          <Form.Button>
            {activeItem === 'register' && '註冊'}
            {activeItem === 'signin' && '登入'}
          </Form.Button>
        </Form>
      </Container>
    </>
  );
}

export default Signin;
