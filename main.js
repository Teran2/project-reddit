function generateRandomFiveDigitNumber() {
  return Math.floor(Math.random() * 90000) + 10000;
  // The + 10000 ensures it always outputs a 5 digit number.
}

function createPost(name, message) {
  var postContainer = document.createElement('div');
  postContainer.className = 'postContainer';
  var post = document.createElement('div');
  post.className = 'post';

  var postInput = document.createElement('p');
  postInput.innerHTML = message + ' - Posted By: ' + name;

  var commentsLink = document.createElement('a');
  commentsLink.href = '#';
  commentsLink.textContent = 'Comments';
  commentsLink.style.marginRight = '10px';

  var commentsContainer = document.createElement('div');
  commentsContainer.style.display = 'none';

  var commentsList = document.createElement('div');
  commentsList.className = 'commentsList';
  commentsContainer.appendChild(commentsList);

  var commentForm = createCommentForm();
  commentsContainer.appendChild(commentForm);

  commentsLink.addEventListener('click', function(event) {
    event.preventDefault();
    // This prevents the default action of the user agent(Browser in this case).
    commentsContainer.style.display =
    commentsContainer.style.display === 'none' ? 'block' : 'none';
    // if 'none' then execute 'block', otherwise 'none'.
  });

  var removeLink = document.createElement('a');
  removeLink.href = '#';
  removeLink.textContent = 'Remove';
  removeLink.style.marginRight = '10px'; // Adds space between this and the text.

  removeLink.addEventListener('click', function(event) {
    event.preventDefault();
    postContainer.remove();
  });

  post.appendChild(removeLink);
  post.appendChild(commentsLink);
  post.appendChild(postInput);

  postContainer.appendChild(post);
  postContainer.appendChild(commentsContainer);

  return postContainer;
}

function createCommentForm() {
  var form = document.createElement('form');
  form.style.marginTop = '10px';

  var uniqueId = generateRandomFiveDigitNumber();
  var nameInputId = 'comment-name-' + uniqueId;
  var commentTextareaId = 'comment-text-' + uniqueId;

  var nameDiv = document.createElement('div');
  nameDiv.className = 'form-group';
  var nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = nameInputId;
  nameInput.className = 'form-control';
  nameInput.placeholder = 'Your-Name';
  nameDiv.appendChild(nameInput);

  var commentTextDiv = document.createElement('div');
  commentTextDiv.className = 'form-group';
  var commentTextarea = document.createElement('textarea');
  commentTextarea.id = commentTextareaId;
  commentTextarea.className = 'form-control';
  commentTextarea.placeholder = 'Comment Text';
  commentTextDiv.appendChild(commentTextarea);

  var submitButton = document.createElement('button');
  submitButton.className = 'btn btn-primary';
  submitButton.textContent = 'Submit Comment';
  submitButton.style.marginBottom = '10px';
  form.appendChild(commentTextDiv);
  form.appendChild(nameDiv);
  form.appendChild(submitButton);

  submitButton.addEventListener('click', function(event) {
    event.preventDefault();

  var commentText = document.getElementById(commentTextareaId).value;
  var commentName = document.getElementById(nameInputId).value;

  var newComment = document.createElement('div');
  var removeCommentLink = document.createElement('a');
  removeCommentLink.href = '#';
  removeCommentLink.textContent = 'Remove';
  removeCommentLink.style.marginRight = '10px';

  removeCommentLink.addEventListener('click', function(event) {
    event.preventDefault();
    newComment.remove();
  });

  var commentInput = document.createElement('p');
  commentInput.innerHTML = commentText + ' - Comment By: ' + commentName;
  newComment.appendChild(removeCommentLink);
  newComment.appendChild(commentInput);

  var commentsList = form.parentNode.querySelector('.commentsList');
  commentsList.appendChild(newComment);

  document.getElementById(commentTextareaId).value = '';
  document.getElementById(nameInputId).value = '';
  });

  return form;
}

var postContainer = document.querySelector('.posts');

var postForm = document.querySelector('form');
var postSubmitButton = postForm.querySelector('#submit-post');

postSubmitButton.addEventListener('click', function(event) {
  event.preventDefault();
  var message = document.getElementById('post-text').value;
  var name = document.getElementById('your-name').value;

  var newPost = createPost(name, message);
  postContainer.appendChild(newPost);

  document.getElementById('post-text').value = '';
  document.getElementById('your-name').value = '';
});