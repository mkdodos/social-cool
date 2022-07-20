import { useParams } from 'react-router-dom';
function Post() {
  // 取得網址參數
  const { postId } = useParams();
  return postId
}

export default Post