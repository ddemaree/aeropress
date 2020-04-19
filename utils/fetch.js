export const getData = url => fetch(url, {method: 'GET'}).then(res => res.json())

export const postData = (url, data) =>
  fetch(url, { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(response => response.json())