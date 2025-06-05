// login.js
fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard'; // redirige
    } else {
      alert('Login fallido');
    }
  });
