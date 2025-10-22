document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('postForm');
  const feed = document.getElementById('feed');

  if (form && feed) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const caption = document.getElementById('caption').value;
      const media = document.getElementById('media').files[0];

      const post = document.createElement('div');
      post.className = 'post';

      if (media) {
        const url = URL.createObjectURL(media);
        if (media.type.startsWith('image')) {
          post.innerHTML += `<img src="${url}" width="200"><br>`;
        } else if (media.type.startsWith('video')) {
          post.innerHTML += `<video src="${url}" width="200" controls></video><br>`;
        }
      }

      post.innerHTML += `<p>${caption}</p>
        <button onclick="likePost(this)">❤️ Like</button>
        <span class="likes">0</span> likes
        <br><input type="text" placeholder="Comment..." onkeypress="commentPost(event, this)">
        <div class="comments"></div>`;

      feed.prepend(post);
      form.reset();
    });
  }
});

function likePost(btn) {
  const likes = btn.nextElementSibling;
  likes.textContent = parseInt(likes.textContent) + 1;
}

function commentPost(e, input) {
  if (e.key === 'Enter') {
    const comment = document.createElement('p');
    comment.textContent = input.value;
    input.nextElementSibling.appendChild(comment);
    input.value = '';
  }
}
