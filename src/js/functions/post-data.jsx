const serverUrl = 'http://localhost:4000';

const PostData = (data, operation) => {
  const endpoint = `${serverUrl}/${operation}`;

  fetch(endpoint, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then((res) => {
    setTimeout(() => {
      console.log('reloooooad');
      window.location.reload();
    }, 400);
  })
  .catch((res) => {
    console.log(res)
  })
}

export default PostData;