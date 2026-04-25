document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('form.contact-form[data-formspree="true"]').forEach(function (form) {
    var successUrl = form.getAttribute('data-success-url') || '/thank-you/';
    var submitButton = form.querySelector('button[type="submit"]');
    var lang = form.getAttribute('data-lang') || document.documentElement.lang || 'en';
    var status = document.createElement('p');
    status.className = 'small-note form-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var originalText = submitButton ? submitButton.textContent : '';
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = lang.startsWith('no') ? 'Sender…' : 'Sending…';
      }
      status.textContent = lang.startsWith('no') ? 'Sender henvendelsen…' : 'Sending your inquiry…';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          window.location.href = successUrl;
          return;
        }
        return response.json().then(function (data) {
          var errorText = data && data.errors ? data.errors.map(function (error) { return error.message; }).join(' ') : '';
          throw new Error(errorText || 'Form submission failed.');
        });
      }).catch(function () {
        status.textContent = lang.startsWith('no')
          ? 'Skjemaet kunne ikke sendes. Send e-post direkte til info@vitacoat.no.'
          : 'The form could not be sent. Please email info@vitacoat.no directly.';
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      });
    });
  });
});
