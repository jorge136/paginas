// scripts.js

const commentForm = document.getElementById('comment-form');
const commentsContainer = document.getElementById('comments-container');

// Cargar comentarios desde el backend
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/comments')
        .then(response => response.json())
        .then(comments => {
            comments.forEach(comment => {
                addComment(comment.text);
            });
        });
});

// Función para añadir un comentario al contenedor
function addComment(commentText) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    const commentParagraph = document.createElement('p');
    commentParagraph.textContent = commentText;
    commentDiv.appendChild(commentParagraph);
    commentsContainer.appendChild(commentDiv);
}

// Manejar el envío del formulario
commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const commentText = document.getElementById('comment').value;
    if (commentText.trim() !== '') {
        fetch('http://localhost:5000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment: commentText })
        })
        .then(response => response.json())
        .then(data => {
            addComment(data.comment);
            document.getElementById('comment').value = '';
        });
    }
});
