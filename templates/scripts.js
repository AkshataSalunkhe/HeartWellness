document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const getStartedBtn = document.getElementById('get-started-btn');
    const modal = document.getElementById('auth-modal');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    const authButtons = document.querySelector('.auth-buttons');
    const userDisplayName = document.createElement('span');

    console.log('Document loaded, initializing event listeners.');

    const openModal = (formToShow) => {
        console.log(`Opening modal for ${formToShow}`);
        modal.style.display = 'block';
        if (formToShow === 'login') {
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('signup-form').style.display = 'none';
        } else {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('signup-form').style.display = 'block';
        }
    };

    const displayUser = (name) => {
        userDisplayName.textContent = `Welcome, ${name}`;
        authButtons.innerHTML = '';
        authButtons.appendChild(userDisplayName);
    };

    if (loginBtn) {
        loginBtn.addEventListener('click', () => openModal('login'));
    }
    if (signupBtn) {
        signupBtn.addEventListener('click', () => openModal('signup'));
    }
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => openModal('login'));
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('Closing modal');
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            console.log('Window click detected, closing modal');
            modal.style.display = 'none';
        }
    });

    if (showSignupLink) {
        showSignupLink.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('Show signup link clicked');
            openModal('signup');
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('Show login link clicked');
            openModal('login');
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('Signup form submitted');
            const name = document.getElementById('name').value;
            const email = document.getElementById('email-signup').value;
            const password = document.getElementById('password-signup').value;
            const phone = document.getElementById('phone').value;

            console.log('Submitting signup form with data:', { name, email, password, phone });

            try {
                const response = await fetch('http://localhost:3000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password, phone })
                });

                const data = await response.json();
                if (response.ok) {
                    alert('Signup successful!');
                    window.location.href = 'index.html#home';
                } else {
                    alert(`Signup failed: ${data.message}`);
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert('An error occurred during signup');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the form from submitting the traditional way
            console.log('Login form submitted');

            const emailInput = document.getElementById('email-login');
            const passwordInput = document.getElementById('password-login');

            if (!emailInput || !passwordInput) {
                console.error('Email or Password input not found');
                alert('Email or Password input not found');
                return;
            }

            const email = emailInput.value;
            const password = passwordInput.value;

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                if (response.ok) {
                    alert('Login successful');
                    console.log('Token received:', data.token);
                    console.log('User name:', data.userName);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userName', data.userName); // Store user's name
                    displayUser(data.userName); // Update UI with user's name
                    // Redirect after showing the alert and console log
                    setTimeout(() => {
                        window.location.href = 'index.html#home';
                    }, 1000);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred during login');
            }
        });
    }

    // Adding event listener for navigation links with smooth scrolling
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href').split('#')[1];
            if (targetId) {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    event.preventDefault();
                    window.location.href = link.getAttribute('href');
                }
            }
        });
    });
    console.log('Event listeners initialized.');

    // Check if user is logged in on page load
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    if (token && userName) {
        displayUser(userName);
    }
});
