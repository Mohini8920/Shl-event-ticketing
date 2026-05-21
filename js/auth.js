/* ============================================
   SHL AUTHENTICATION JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // --- Quick Sandbox Logins ---
  const quickLoginDelegateBtn = document.getElementById('quickLoginDelegateBtn');
  const quickLoginAdminBtn = document.getElementById('quickLoginAdminBtn');

  if (quickLoginDelegateBtn) {
    quickLoginDelegateBtn.addEventListener('click', () => {
      document.getElementById('logEmail').value = 'aarav.patel@gmail.com';
      document.getElementById('logPassword').value = 'password123';
      
      Toast.show('Sandbox Credentials', 'Delegate quick login fields populated.', 'info');
    });
  }

  if (quickLoginAdminBtn) {
    quickLoginAdminBtn.addEventListener('click', () => {
      document.getElementById('logEmail').value = 'admin@socialhouselearning.com';
      document.getElementById('logPassword').value = 'admin123';
      
      Toast.show('Sandbox Credentials', 'Admin/Organizer fields populated.', 'info');
    });
  }

  // --- Login Form Submit ---
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('logEmail').value.trim();
      const password = document.getElementById('logPassword').value;

      if (!FormValidator.validate(loginForm)) {
        Toast.show('Incomplete Form', 'Please fix any errors to sign in.', 'warning');
        return;
      }

      // Simulation checks
      if (email === 'admin@socialhouselearning.com' && password === 'admin123') {
        Toast.show('Access Approved', 'Signing in as organizer...', 'success');
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 1500);
      } else if (email === 'aarav.patel@gmail.com' && password === 'password123') {
        Toast.show('Access Approved', 'Signing in as delegate...', 'success');
        
        // Make sure user data is initialized in local storage
        if (!localStorage.getItem('shl_current_user')) {
          localStorage.setItem('shl_current_user', JSON.stringify(SHL_DATA.currentUser));
        }

        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1500);
      } else {
        Toast.show('Access Denied', 'Invalid credentials. Try using sandbox options.', 'error');
      }
    });
  }

  // --- Register Form Submit ---
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!FormValidator.validate(registerForm)) {
        Toast.show('Incomplete Form', 'Please fill in all required fields.', 'warning');
        return;
      }

      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const institution = document.getElementById('regInstitution').value.trim();

      // Create new delegate object profile in local storage
      const newUser = {
        name,
        email,
        phone,
        institution,
        tickets: [],
        payments: [],
        notifications: [
          {
            id: Date.now(),
            text: 'Account created successfully! Welcome to Social House Learning.',
            time: 'Just now',
            read: false,
            type: 'info'
          }
        ]
      };

      localStorage.setItem('shl_current_user', JSON.stringify(newUser));

      Toast.show('Account Registered', 'Welcome to SHL! Redirecting to events list...', 'success');
      setTimeout(() => {
        window.location.href = 'events.html';
      }, 1800);
    });
  }
});
