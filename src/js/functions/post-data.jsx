import Endpoints from '../constants/endpoints.jsx';

const PostData = (data, operation) => {
  fetch(Endpoints[operation], {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then((res) => {
    setTimeout(() => {
      window.location.reload();
    }, 400);
  })
  .catch((res) => {
    console.log(res)
  })
}

export default PostData;