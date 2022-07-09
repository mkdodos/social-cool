import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <Menu>
      <Menu.Item>Social Cool</Menu.Item>
      <Menu.Item as={Link} to='/'>Home</Menu.Item>
      <Menu.Item as={Link} to='/new-post'>New Post</Menu.Item>
      {/* 靠右對齊 */}
      <Menu.Menu position="right">
        <Menu.Item as={Link} to='/signin'>Login/Signup</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
export default Header;
