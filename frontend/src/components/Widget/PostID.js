import PropTypes from 'prop-types';

async function PostID() {
    return fetch('http://localhost:8080/newSession', {
      method: 'POST',
      body: JSON.stringify({reference_id: 'Dunno Yet'})
    })
      .then(data => data.json())
   }

export default PostID;