document.addEventListener('submit', function(e) {
  const form = e.target.closest('form');
  if (!form) return;

  const emailFields = form.querySelectorAll('input[type="email"]:not([exclude-valid="true"])');
  let isValid = true;

  emailFields.forEach((field) => {
    const value = field.value.trim();
    const atCount = (value.match(/@/g) || []).length;
    const emailPattern = /^[^\s@]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    // Remove any existing error message
    const existingError = field.parentNode.querySelector('.email-error-msg');
    if (existingError) existingError.remove();

    if (atCount !== 1 || !emailPattern.test(value)) {
      isValid = false;
      field.classList.add('email-invalid');
      field.setCustomValidity('Please enter a valid email address.');

      // Insert inline error message below the field
      const error = document.createElement('span');
      error.className = 'email-error-msg';
      error.style.cssText = 'color:red;font-size:0.85em;display:block;margin-top:4px;';
      error.textContent = 'Please enter a valid email address.';
      field.parentNode.insertBefore(error, field.nextSibling);
    } else {
      field.classList.remove('email-invalid');
      field.setCustomValidity('');
    }
  });

  if (!isValid) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
});
