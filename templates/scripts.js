document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const getStartedBtn = document.getElementById('get-started-btn');
    const modal = document.getElementById('auth-modal');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');

    const openModal = (formToShow) => {
        modal.style.display = 'block';
        loginForm.style.display = formToShow === 'login' ? 'block' : 'none';
        signupForm.style.display = formToShow === 'signup' ? 'block' : 'none';
    };

    loginBtn.addEventListener('click', () => openModal('login'));
    signupBtn.addEventListener('click', () => openModal('signup'));
    getStartedBtn.addEventListener('click', () => openModal('login'));

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    showSignupLink.addEventListener('click', (event) => {
        event.preventDefault();
        openModal('signup');
    });

    showLoginLink.addEventListener('click', (event) => {
        event.preventDefault();
        openModal('login');
    });
});
