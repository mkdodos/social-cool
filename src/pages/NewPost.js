import { Card, Icon, Form, Container, Image, Button } from 'semantic-ui-react';
import app from '../utils/firebase';
import { collection, getDocs, getFirestore, addDoc, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import React from 'react';
import {useNavigate} from 'react-router-dom'

import { getDownloadURL, getStorage,ref, uploadBytes } from "firebase/storage";


function NewPost() {
  const storage = getStorage(app);
  
  const navigate = useNavigate();
  const [topics, setTopics] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [topicName, setTopicName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const db = getFirestore(app);
  const topicsRef = collection(db, 'topics');
  // 渲染一次
  React.useEffect(() => {
    // 取得資料
    const fetchData = async () => {
      const snapshot = await getDocs(topicsRef);
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      });
      // 把資料設給 React state
      setTopics(data);
    };

    fetchData();
  }, []);

  // console.log(topics);
  const options = topics.map((topic) => {
    return { text: topic.name, value: topic.name };
  });

  const [file, setFile] = React.useState(null);
  const previewUrl = file
    ? URL.createObjectURL(file)
    : 'https://react.semantic-ui.com/images/wireframe/image.png';
  function onUploadFile() {
    console.log('ddd')
    uploadBytes(storageRef, file).then(() => {
      console.log('Uploaded a blob or file!');
    }).catch(error=>{
      console.log(error.message)
    });
  }
  function onSubmit() {
    setIsLoading(true)
    const auth = getAuth()
    // 新增資料
    const addData = async () => {
      await addDoc(collection(db, 'posts'), {
        title: title,
        content: content,
        topicName: topicName,
        createdAt: Timestamp.now(),
        author:{
          displayName: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
          email: auth.currentUser.email
        }
      }).then((docRef)=>{
        // 上傳圖片
        const storageRef = ref(storage,'post-images/'+docRef.id);
        uploadBytes(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(url=>{
            // 設定 imageUrl 欄位值
            updateDoc(doc(db, "posts", docRef.id), {
              imageUrl: url             
            });

            console.log(url)
          })
          console.log('Uploaded a blob or file!');
        }).catch(error=>{
          console.log(error.message)
        });

        setIsLoading(false)
        navigate('/')
        // console.log('OK')
      });
    };

    addData();
  }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        {/* 放預覽圖片 */}
        {/* <Image src="https://fakeimg.pl/300/" floated='left' size="small" /> */}
        <Image src={previewUrl} floated="left" size="small" />
        {/* as="label" htmlFor 才有作用 */}
        <Button basic htmlFor="post-image" as="label">
          上傳圖片
        </Button>
        {/* 上傳檔案元件 */}
        <Form.Input
          type="file"
          id="post-image"
          style={{ display: 'none' }}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <Form.Input
          placeholder="請輸入標題"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.TextArea
          placeholder="內容"
          onChange={(e) => setContent(e.target.value)}
        />
        <Form.Dropdown
          onChange={(e,{value}) => setTopicName(value)}
          placeholder="主題"
          selection
          options={options}
        ></Form.Dropdown>
        <Form.Button loading={isLoading}>送出</Form.Button>
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
