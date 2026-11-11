# VitaCoat — Formspree Read-Only Account, DPA, Retention and Routing Gate
**Prepared:** 11/11/2026 ·  09:14 Europe/Madrid
**State:** BLOCKED_ACCOUNT_ACCESS / PREPARATION_COMPLETE / NO LIVE SUBMISSIONS
**Work ID:** VITA-IMPROVEMENTS-20261031-01 · **Selected:** P3-A
**Target:** [Issue #44](https://github.com/nanotech-solutions-norway/vitacoat/issues/44), `/contact/` and `/en/contact/` source files, authorized Formspree account if available.

## Connection and access result
- GitHub source read is available. NO and EN contact forms use the **same Formspree endpoint** (form ID intentionally redacted here), contain name/email/company/topic/message input, localized privacy notices and distinct thank-you routes; the frontend JavaScript only redirects after HTTP `response.ok`, handles retry and suppresses concurrent submits.
- `.github/scripts/formspree_synthetic.py` is a **mock HTTP-interception test** and supplies no evidence of Formspree delivery, dashboard owner, inbox or actual retention.
- A direct Formspree connector/action is **not present** among available connected tools; plugin directory search for "Formspree" returned **no matching plugin**. No signed-in Formspree dashboard session or organization rights were demonstrated by GitHub admin or connected Google Drive. Therefore actual account owner, subscription plan, quota balance, retention, DPA, route, spam actions, target mailbox and live receipt remain **NOT_VERIFIED**.
- No live form POST, provider API call, provider configuration changes, submission export, inbox reading, email forwarding or customer-data access was performed.

## Vendor documentation vs account-level facts
| Public Formspree documentation | Consequence for the account verification | NTSN actual state |
|---|---|---|
| [Account limits](https://help.formspree.io/articles/account-management/account-limits): Free plan has 30 days submission history; paid plans can retain longer | Verify actual NTSN plan and configured retention rather than assuming vendor default | NOT_VERIFIED |
| [Over-limit submissions (updated 30 Sep 2026)](https://help.formspree.io/articles/form-and-project-settings/over-limit-submissions): on reaching monthly limit, forms continue to receive/storage but notifications and plugins are suspended until reprocessing | A browser success or provider stored submission may **not** indicate inbox notification. Verify quota, Over Limit folder and routing separately | NOT_VERIFIED |
| [Form Rules](https://help.formspree.io/articles/advanced-features/form-rules): Business plan custom conditions can override default target email | Check Rules/Workflow screen for actual recipient and any conditional drop, spam flag or redirect | NOT_VERIFIED |
| [Building an HTML Form](https://help.formspree.io/articles/building-your-form/building-an-html-form/): dashboard stores submissions and can route notifications/integrations | Account owner's evidence required for the actual endpoint/form | NOT_VERIFIED |

These are vendor-wide statements, not verification of an executed NTSN DPA or lawful transfers, retention schedule and processor acceptance.

## Read-only actions for authorized Formspree account owner — NO CHANGES, NO CUSTOMER-DATA SHARING
1. Sign in to the expected Formspree workspace using its own authorized authentication. Confirm exact form project/name and endpoint suffix privately, not in an open GitHub issue. Record redacted `ACCOUNT_MATCH = YES/NO` and date.
2. Read account plan, monthly submission quota and **Over Limit** status; report only status flags, not submissions, email addresses or customer messages.
3. Read the **form's routing/notification/Workflow/Rules** setup, number of active recipient targets, and whether default target is overridden. Redact actual inbox identity in public GitHub. Check spam/honeypot and retry/notification suppression settings.
4. Locate current signed/accepted processor DPA, subprocessors, international transfer mechanisms (if applicable), retention/deletion schedule, account access control and contact-form controller wording. Record document version/date and authorized business owner; do not upload confidential contracts into public repository.
5. Report a minimal attestation: `form_owner_match=[Y/N]`, `routing_reviewed=[Y/N]`, `quota_ok=[Y/N]`, `over_limit=[Y/N]`, `DPA_checked=[Y/N]`, `retention_approved=[Y/N]`, `privacy_owner=[role]`, `date/time`, evidence pointers in private controlled register.
6. **STOP** before sending synthetic form requests; such a live test is P3-B under a separate owner/controller authority and after explicit provider rights validation.

## Independent readback and failure conditions
Only a provider dashboard or duly authorized signed controller evidence can justify `ACCOUNT_VERIFIED`, `DPA_REVIEWED`, `RETENTION_VERIFIED` and `ROUTING_VERIFIED`. Source `fetch` and public help pages cannot. If form routing is wrong, quota over limit, DPA unsigned or authorization unknown, mark BLOCKED and prepare separate controller-reviewed change request. Do not claim any live delivery success. No private customer information belongs in the canonical work-ID ledger.
