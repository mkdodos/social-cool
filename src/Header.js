import { Menu, Search } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
// import app from './utils/firebase'
import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import algolia from './utils/algolia';
function Header() {
  
  const auth = getAuth();
  const [inputValue, setInputValue] = React.useState('');
  const [user, setUser] = React.useState(null);
  const [results, setResults] = React.useState([]);
  React.useEffect(() => {
    // 監聽 user 登入狀態
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      // console.log(user)
    });
  });

  const navigate = useNavigate();

  function onSignout() {
    // const navigate = useNavigate();
    // signOut(auth)
    // navigate('/')
    signOut(auth).then(navigate('/'));
  }

  // algolia search
  function onSearchChange(e, { value }) {
    setInputValue(value);
    algolia.search(value).then((result) => {
      // console.log(result.hits)
      const results = result.hits.map((hit) => {
        return { 
          title: hit.title,
          description: hit.content,
          id: hit.objectID
         };
      });

      setResults(results);
      // console.log(results);
    });
  }

  function onResultSelect(e,{result}) {
    navigate(`/post/${result.id}`)
  }

  return (
    <Menu>
      <Menu.Item>Social Cool</Menu.Item>
      <Menu.Item>
        <Search
          value={inputValue}
          onSearchChange={onSearchChange}
          results={results}
          noResultsMessage="無資料"
          onResultSelect={onResultSelect}
        />
      </Menu.Item>
      <Menu.Item as={Link} to="/">
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/new-post">
        New Post
      </Menu.Item>
      {/* 靠右對齊 */}
      <Menu.Menu position="right">
        {user ? (
          <Menu.Item onClick={onSignout}>Signout</Menu.Item>
        ) : (
          <Menu.Item as={Link} to="/signin">
            Login/Signup
          </Menu.Item>
        )}

        {/* <Menu.Item onClick={()=>{signOut(auth)}}>Signout</Menu.Item> */}
      </Menu.Menu>
    </Menu>
  );
}
export default Header;
