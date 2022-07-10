import app from '../utils/firebase';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import React from 'react';
import { List } from 'semantic-ui-react';

function Topics() {
  const [topics, setTopics] = React.useState([]);
  const db = getFirestore(app);
  // console.log(db)
  const ref = collection(db, 'topics');

  // console.log(ref)
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(ref);
      const mydata = data.docs.map((doc) => {
        return doc.data();
      });

      setTopics(mydata);
    };

    fetchData();
  }, []);
  return (
    <List animated selection>
      {topics.map((topic) => {
        return <List.Item key={topic.name}>{topic.name}</List.Item>;
      })}
    </List>
  );
  // return 'abc';

  // return <div>{topics.map((topic)=>{return (<h1>{topic.name}</h1>)})}</div>;
}

export default Topics;
