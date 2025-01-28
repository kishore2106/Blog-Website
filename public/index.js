function deleteBlog(title) {
  if (confirm(`Are you sure you want to delete the blog titled "${title}"?`)) {
    fetch("/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
    .then((response) => response.text())
    .then((message) => {
      alert(message); // Show success or error message
      window.location.reload(); // Reload the page to reflect changes
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to delete the blog.");
    });
  }
}

function updateBlog() {
  const originalTitle = document.getElementById("originalTitle").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  fetch("/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ originalTitle, title, description }),
  })
  .then(response => response.text())
  .then(message => {
    alert(message);
    window.location.href = "/view"; // Redirect after update
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Failed to update the blog.");
  });
}