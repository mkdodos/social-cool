import { Card, Icon, Form, Container } from 'semantic-ui-react';
import app from '../utils/firebase';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React from 'react';

function NewPost() {
  const [topics, setTopics] = React.useState([]);
  const db = getFirestore(app);
  const ref = collection(db, 'topics');
  // 渲染一次
  React.useEffect(() => {
    // 取得資料
    const fetchData = async () => {
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      });
      // 把資料設給 React state
      setTopics(data);
      
      
    };

    fetchData();
    
  }, []);

  console.log(topics);
  const options = topics.map((topic)=>{
    return {text:topic.name,
    value:topic.name}
  })
  return (
    <Container>
      <Form>
        <Form.Input placeholder="請輸入標題" />
        <Form.TextArea placeholder="內容" />
        <Form.Dropdown
          placeholder="主題"
          selection
          options={options}
        ></Form.Dropdown>
      </Form>
      {/* <Card>
        <Card.Content>
          <Card.Header>Mark</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            22 Friends
          </a>
        </Card.Content>
      </Card> */}
    </Container>
  );
}

export default NewPost;
