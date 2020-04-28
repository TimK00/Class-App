(() => {
  const isAuth = getStorage('isAuth');
  if (!isAuth) {
    logout();
    alert('Log in to view your articles.');
    window.location.href = '/login.html';
  }
})();