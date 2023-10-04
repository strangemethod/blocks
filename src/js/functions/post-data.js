const serverUrl = 'http://localhost:4000';

const PostData = async (data, route) => {
  const endpoint = `${serverUrl}/${route}`;

  const response = await fetch(endpoint, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => {
    return json;
  })
  .catch(err => console.error('error:' + err));

  return response;
}

export default PostData;