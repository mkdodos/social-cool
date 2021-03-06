import { Menu, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

import './utils/firebase';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();
function Header() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);
  // return 'abc'
  return (
    <Menu>
      <Menu.Item as={Link} to="/">
        首頁
      </Menu.Item>
      <Menu.Item>
        <Search />
      </Menu.Item>

      <Menu.Menu position="right">
        {user ? (
          <>
            
            <Menu.Item as={Link} to="/new-post">
              發表文章
            </Menu.Item>
            <Menu.Item onClick={()=>signOut(auth)}>
              登出
            </Menu.Item>
          </>
        ) : (
          <Menu.Item as={Link} to="/signin">
            註冊/登入
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
