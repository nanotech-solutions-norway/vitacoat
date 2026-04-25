document.addEventListener('DOMContentLoaded', function () {
  var primaryEmail = 'info@vitacoat.no';

  document.querySelectorAll('a[href^="mailto:technical@vitacoat.no"], a[href^="mailto:documents@vitacoat.no"]').forEach(function (link) {
    var inFooter = link.closest('.site-footer');
    if (inFooter) {
      var li = link.closest('li');
      if (li) li.remove();
      else link.remove();
      return;
    }
    link.setAttribute('href', 'mailto:' + primaryEmail);
    if ((link.textContent || '').includes('@vitacoat.no')) link.textContent = primaryEmail;
  });

  document.querySelectorAll('.site-footer').forEach(function (footer) {
    footer.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
      var li = link.closest('li');
      if (li) li.remove();
      else link.remove();
    });
  });
});
