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
    const logoutBtn = document.createElement('button');

    console.log('Document loaded, initializing event listeners.');

    logoutBtn.textContent = 'Logout';
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        window.location.assign('index.html#home');
    });

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
        authButtons.appendChild(logoutBtn);
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
                    alert('Login successful');
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userName', data.userName);
                    displayUser(data.userName);
                    window.location.assign('index.html#home');
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
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userName', data.userName);
                    displayUser(data.userName);
                    window.location.assign('index.html#home');
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

    // Prediction page content

    const predictionForm = document.getElementById('predictionForm');

    if (predictionForm) {
        predictionForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(predictionForm);
            const inputData = {};
            formData.forEach((value, key) => {
                inputData[key] = value;
            });

            try {
                const response = await fetch('http://localhost:5000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(inputData)
                });

                const data = await response.json();
                if (response.ok) {
                    const predictionMessage = data.prediction === 0 
                        ? "<strong style='color: green;'>You are healthy with no heart disease.</strong>" 
                        : "<strong style='color: red;'>You need to take care, there are symptoms of heart disease.</strong>";
                    document.getElementById('predictionResult').innerHTML = predictionMessage;
                } else {
                    document.getElementById('predictionResult').textContent = `Error: ${data.error}`;
                }
            } catch (error) {
                document.getElementById('predictionResult').textContent = `An error occurred during prediction: ${error.message}`;
            }
        });
    }

    
});