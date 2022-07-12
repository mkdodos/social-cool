import React from 'react';
import app from '../utils/firebase';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import {Link } from 'react-router-dom'
import {
  List,
 
  Container,
  Icon,
  Grid,
  GridRow,
  GridColumn,
  Header,
  
  Item,
} from 'semantic-ui-react';
import Topics from '../components/Topics';

function Home() {
  const [posts, setPosts] = React.useState([]);
  const db = getFirestore(app);
  const postsRef = collection(db, 'posts');
  // 取得所有文章資料
  React.useState(() => {
    
    const fetchData = async () => {
      const dataRef = await getDocs(postsRef);
      const data = dataRef.docs.map((docRef) => {
        const id = docRef.id;
        return {...docRef.data(), id:id};
      });

      setPosts(data);
      // console.log(data)
    };
    // 執行
    fetchData();
  }, []);
  return (
    <Container>
      <Grid>
        <GridRow>
          <GridColumn width={3}>
            <Header>主題列表</Header>
            <Topics />
          </GridColumn>
          <GridColumn width={10}>
            {/* <Header>文章列表</Header> */}
            <Item.Group>
              {posts.map((post) => {
                return (
                  <Item key={post.id} as={Link} to={`/post/${post.id}`}>
                    <Item.Image src={post.imageUrl} />
                    <Item.Content>
                    <Item.Header>{post.title}</Item.Header>
                    
                    
                      <Item.Meta>
                        <Icon name="user circle"/>
                        {post.topicName}。使用者
                      </Item.Meta>
                      
                      <Item.Description>
                      {post.content}
                    </Item.Description>
                    <Item.Extra>留言 0 。 按讚 0</Item.Extra>
                    </Item.Content>
                  
                  </Item>
                );
              })}
            </Item.Group>
          </GridColumn>
          <GridColumn width={3}>空白</GridColumn>
        </GridRow>
      </Grid>
    </Container>
  );
}

export default Home;
