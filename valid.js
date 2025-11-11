document.addEventListener('submit', function(e) {
  const form = e.target.closest('form');
  if (!form) return;

  const emailFields = form.querySelectorAll('input[type="email"]:not([exclude-valid="true"])');
  let isValid = true;

  emailFields.forEach((field) => {
    const value = field.value.trim();

    const atCount = (value.match(/@/g) || []).length;
    const emailPattern = /^[^\s@]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (
      atCount !== 1 ||              
      !emailPattern.test(value)        
    ) {
      isValid = false;
      field.classList.add('email-invalid');
      field.setCustomValidity('Please enter a valid email address.');
    } else {
      field.classList.remove('email-invalid');
      field.setCustomValidity('');
    }
  });

  if (!isValid) {
    e.preventDefault();
    alert('Please correct the invalid email fields before submitting.');
  }
});
