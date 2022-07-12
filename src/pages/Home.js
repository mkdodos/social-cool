import React from 'react';
import app from '../utils/firebase';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

import {
  List,
  Container,
  Icon,
  Grid,
  GridRow,
  GridColumn,
  Header,
} from 'semantic-ui-react';
import Topics from '../components/Topics';




function Home() {
  const [posts, setPosts] = React.useState([]);
  const db = getFirestore(app);  
  const postsRef = collection(db, 'posts');
  // 取得所有文章資料
  React.useState(()=>{
    console.log('abc')
    const fetchData = async () => {
      const dataRef = await getDocs(postsRef);
      const data = dataRef.docs.map((docRef) => {
        return docRef.data();
      });

      setPosts(data);
      // console.log(data)
    };
    // 執行
    fetchData()
    
  },[])
  return (
    <Container>
      <Grid>
        <GridRow>
          <GridColumn width={3}>
            <Header>主題列表</Header>
            <Topics />
          </GridColumn>
          <GridColumn width={10}>
          <Header>文章列表</Header>
            {
           
<List selection divided size='large'>
      {posts.map((post) => {
        return <List.Item key={post.imageUrl}>
          {post.title}
          </List.Item>;
      })}
    </List>


          }</GridColumn>
          <GridColumn width={3}>空白</GridColumn>
        </GridRow>
      </Grid>
    </Container>
  );
}

export default Home;
