const serverUrl = 'http://localhost:4000';

const PostData = (data, route) => {
  const endpoint = `${serverUrl}/${route}`;

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
      console.log('Data posted.');
      window.location.reload();
    }, 400);
  })
  .catch((res) => {
    console.log(res)
  })
}

export default PostData;