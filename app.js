let currentUser = null;

function login() {
  const user = document.getElementById("username").value;
  if (user.trim()) {
    currentUser = user;
    localStorage.setItem("user", user);
    showBlog();
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem("user");
  location.reload();
}

function showBlog() {
  document.getElementById("auth").style.display = "none";
  document.getElementById("blog").style.display = "block";
  document.getElementById("user-display").innerText = "Welcome, " + currentUser;
  document.getElementById("logout-btn").style.display = "inline-block";
  showPosts();
}

function createPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  if (title && content) {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.unshift({ user: currentUser, title, content, date: new Date().toLocaleString() });
    localStorage.setItem("posts", JSON.stringify(posts));
    showPosts();
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
  }
}

function showPosts() {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  const container = document.getElementById("posts");
  container.innerHTML = "";
  posts.forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>By ${post.user} on ${post.date}</small>
      ${post.user === currentUser ? `<button onclick="deletePost(${index})">Delete</button>` : ""}
    `;
    container.appendChild(div);
  });
}

function deletePost(index) {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
  showPosts();
}

// Load user if exists
if (localStorage.getItem("user")) {
  currentUser = localStorage.getItem("user");
  showBlog();
}
