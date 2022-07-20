import { useParams } from 'react-router-dom';
import app from '../utils/firebase';
import {
  getFirestore,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import React from 'react';
import { Container, Card, Icon, Image, Grid, Segment } from 'semantic-ui-react';
import Topics from '../components/Topics';

function Post() {
  // 取得網址參數
  const { postId } = useParams();
  const [post, setPost] = React.useState({});
  // const [isCollected, setIsCollected] = React.useState(false);
  const db = getFirestore(app);

  // const postsRef = collection(db, 'posts');

  React.useEffect(() => {
    // const auth = getAuth();
    // const uid = auth.currentUser.uid;
    const fetchData = async () => {
      const docRef = doc(db, 'posts', postId);
      await getDoc(docRef).then((docSnap) => {
        console.log('ddd');
        setPost(docSnap.data());
        console.log(post);
        // // 判斷是否已收藏
        // setIsCollected(post.collectedBy?.includes('uid'));
        // console.log(isCollected);
        // console.log(post.collectedBy.includes('uid'))
      });

      // if (docSnap.exists()) {

      //   console.log('Document data:', docSnap.data());

      // } else {
      //   // doc.data() will be undefined in this case
      //   console.log('No such document!');
      // }
    };
    fetchData();
    // console.log(post);
  }, []);

  const isCollected = post.collectedBy.includes('uid')

  function toggleCollected() {
    const updateData = async () => {
      const docRef = doc(db, 'posts', postId);
     
      console.log(isCollected);
      console.log('to');
      if (isCollected) {
        await updateDoc(docRef, { collectedBy: arrayRemove('uid') });
      } else {
        await updateDoc(docRef, { collectedBy: arrayUnion('uid') });
      }

      // const docSnap = await getDoc(docRef);
      // setPost(docSnap.data());
    };
    updateData();
  }

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Topics />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card>
              <Image src={post.imageUrl} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{post.title}</Card.Header>
                <Card.Meta>
                  <span className="date">
                    Created at {post.createdAt?.toDate().toLocaleDateString()}
                  </span>
                </Card.Meta>
                <Card.Description>{post.content}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  22 Friends
                </a>
                <Segment>
                  <Icon
                    name="bookmark outline link"
                    onClick={toggleCollected}
                  />
                </Segment>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
export default Post;
