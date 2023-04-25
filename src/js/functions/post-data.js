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
  .then(res => res.json())
  .then(json => {
    console.log(json)
  })
  .catch(err => console.error('error:' + err));
}

export default PostData;