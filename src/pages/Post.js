import { useParams } from 'react-router-dom';
import app from '../utils/firebase';
import { getFirestore, getDoc, doc } from 'firebase/firestore';

import React from 'react';
import { Container, Card, Icon, Image, Grid } from 'semantic-ui-react';
import Topics from '../components/Topics';

function Post() {
  const { postId } = useParams();
  const [post, setPost] = React.useState({});
  const db = getFirestore(app);
  // const postsRef = collection(db, 'posts');

  React.useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'posts', postId);
      const docSnap = await getDoc(docRef);
      setPost(docSnap.data());
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    };
    fetchData();
    console.log(post);
  }, []);
  // 取得網址參數

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}><Topics /></Grid.Column>
          <Grid.Column width={10}>
          <Card>
        <Image src={post.imageUrl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{post.title}</Card.Header>
          <Card.Meta>
            <span className="date">Created at {post.createdAt?.toDate().toLocaleDateString()}</span>
          </Card.Meta>
          <Card.Description>
            {post.content}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            22 Friends
          </a>
        </Card.Content>
      </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
     
    </Container>
  );
}
export default Post;
