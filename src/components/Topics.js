import app from '../utils/firebase';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import React from 'react';
import { List } from 'semantic-ui-react';

function Topics() {

  const [topics, setTopics] = React.useState([]);
  const db = getFirestore(app);  
  const ref = collection(db, 'topics');
  
  React.useEffect(() => {
    // https://www.youtube.com/watch?v=jCY6DH8F4oc
    // https://devtrium.com/posts/async-functions-useeffect
    // 用一個 fetchData 變數代表 async 的函數,之後用 fetchData() 執行
    const fetchData = async () => {
      const dataRef = await getDocs(ref);
      const data = dataRef.docs.map((doc) => {
        return doc.data();
      });

      setTopics(data);
    };
    // 執行
    fetchData();
  }, []);
  return (
    <List selection divided size='large'>
      {topics.map((topic) => {
        return <List.Item key={topic.name}>
          {topic.name}
          </List.Item>;
      })}
    </List>
  );
}

export default Topics;
