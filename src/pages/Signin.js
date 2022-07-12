import { Container, Form, Menu, Message } from 'semantic-ui-react';
import React from 'react';
import '../utils/firebase';
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const auth = getAuth();

function Signin() {
  
  const navigate = useNavigate();
  // 變數, 設定變數
  const [activeItem, setActiveItem] = React.useState('login');
  const [email, setEmail] = React.useState('mk@gmail.com');
  const [password, setPassword] = React.useState('123456');
  const [errorMessage, setErrorMessage] = React.useState('');
  function onSubmit() {
    signInWithEmailAndPassword(auth, email, password).then(userCredential =>{
      console.log(userCredential.user.email)
      // 導到首頁
      navigate('/')
    }).catch(error=>{
      switch(error.code){
        case 'auth/wrong-password':
          setErrorMessage('密碼錯誤')
        console.log(error.code)
        break;
        ;
      }
      
    })
  }
  return (
    <Container>
      {/* widths=2 寬度均分 */}
      <Menu widths={2}>
        {/* active 設定作用中樣式
        用變數 activeItem 做為 active 的條件
        按下項目設定為符合條件的值
        */}
        <Menu.Item
          active={activeItem === 'login'}
          onClick={() => setActiveItem('login')}
        >
          Login
        </Menu.Item>
        <Menu.Item
          active={activeItem === 'signup'}
          onClick={() => setActiveItem('signup')}
        >
          Sign up
        </Menu.Item>
      </Menu>
      <Form onSubmit={onSubmit}>
        <Form.Input
          label="帳號"
          placeholder="請輸入帳號"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Form.Input label="密碼" placeholder="請輸入密碼"
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        />
        {/* 登入錯誤提示 */}
        {errorMessage && <Message negative>{errorMessage}</Message>}
        <Form.Button primary>
          {/* 依變數值呈現不同文字 */}
          {activeItem === 'login' && 'Login'}
          {activeItem === 'signup' && 'Sign up'}
        </Form.Button>
        {/* <Button secondary>Secondary</Button> */}
      </Form>
    </Container>
  );
}

export default Signin;
