// 1. ЗБЕРЕЖЕННЯ ІНФОРМАЦІЇ ПРО БРАУЗЕР
const info = {
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  cookies: navigator.cookieEnabled,
};
localStorage.setItem('systemInfo', JSON.stringify(info));

// Додати до футера
window.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('footer');
  const data = JSON.parse(localStorage.getItem('systemInfo'));
  for (const key in data) {
    const p = document.createElement('p');
    p.textContent = `${key}: ${data[key]}`;
    footer.appendChild(p);
  }
});

// 2. ОТРИМАННЯ КОМЕНТАРІВ (Варіанті 29)
fetch("https://jsonplaceholder.typicode.com/posts/29/comments")
  .then(res => res.json())
  .then(comments => {
    const div = document.getElementById('comments');
    comments.forEach(comment => {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${comment.name}</strong>: ${comment.body}`;
      div.appendChild(p);
    });
  });

// 3. ПОКАЗ МОДАЛЬНОЇ ФОРМИ ЧЕРЕЗ 1 ХВИЛИНУ
setTimeout(() => {
  document.getElementById('modal').style.display = 'block';
}, 60000);

// 4. ЗМІНА ТЕМИ САЙТУ
const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');

function setTheme(theme) {
  themeStyle.href = `${theme}.css`;
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener('click', () => {
  const current = localStorage.getItem("theme") || "light";
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
});

// Автоматичне встановлення теми за часом
const hour = new Date().getHours();
if (hour >= 7 && hour < 21) {
  setTheme("light");
} else {
  setTheme("dark");
}
