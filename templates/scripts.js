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
    
    console.log('Document loaded, initializing event listeners.');

    const openModal = (formToShow) => {
        console.log(`Opening modal for ${formToShow}`);
        modal.style.display = 'block';
        if (formToShow === 'login') {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        }
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
                    // Optionally, redirect to another page
                    // window.location.href = 'index.html#home';
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
            event.preventDefault();
            console.log('Login form submitted');

            // Log the current modal content
            console.log('Current modal content:', modal.innerHTML);
    
            const emailInput = document.getElementById('email-login'); // Ensure correct ID
            const passwordInput = document.getElementById('password-login'); // Ensure correct ID

            // Check if the elements exist
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
                    // Handle successful login (e.g., save token, redirect to dashboard)
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
});
