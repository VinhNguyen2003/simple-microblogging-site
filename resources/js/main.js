document.addEventListener("DOMContentLoaded", () => {
    setInterval(updateLikeCounts, 1000);
});

function goToPost(postId) {
    window.location.href = `/post/${postId}`;
}

async function likePost(postId) {
    try {
        const likeButton = document.getElementById(`like-btn-${postId}`);
        const likeCountElement = document.getElementById(`like-count-${postId}`);

        const response = await fetch(`/like-post/${postId}`, { method: 'POST' });
        if (response.ok) {
            let currentCount = parseInt(likeCountElement.innerText) || 0;
            if (likeButton.dataset.liked === 'true') {
                currentCount--;
                likeButton.dataset.liked = 'false';
            } else {
                currentCount++;
                likeButton.dataset.liked = 'true';
            }
            likeCountElement.innerText = currentCount;
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

async function updateLikeCounts() {
    try {
        const response = await fetch('/api/like-counts');
        const likeCounts = await response.json();

        for (const postId in likeCounts) {
            const likeCountElement = document.getElementById(`like-count-${postId}`);
            if (likeCountElement) {
                likeCountElement.innerText = likeCounts[postId];
            }
        }
    } catch (err) {
        console.error(err);
    }
}