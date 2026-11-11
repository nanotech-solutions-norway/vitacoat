# VitaCoat — /Button select: Pending Decision and Approval Register
**Prepared:** 11/11/2026 · 09:06 Europe/Madrid
**Classification:** PENDING_REVIEW / DECISION-READY SELECTION; NO INFERRED APPROVAL
**Owning work ID:** `VITA-IMPROVEMENTS-20261031-01`
**Current production:** `main@de4bba618f421cca7023ceb2aa9b60e854960228`
**Current review branch:** `vc-nonlighthouse-content-review-20261109` (working SHA before this register `b3003cba9430d7180a00f44812e1cc0807b88f8a`)
**Applicable protocol:** APPROVED `ai-memory-ops/prompts/button_selection_confirmation_rule.md`, approved global command register /Button alias; `vitacoat/docs/production-handoff.md` remains the release authority.
**Owner instruction (09.11.2026):** Keep GitHub plan, **do not proceed with Lighthouse**. Only new explicit confirmation can revoke this hold; never relax existing thresholds or bypass required tests.

## Verified background / present state
- Open [Issue #40](https://github.com/nanotech-solutions-norway/vitacoat/issues/40): P0 Lighthouse TBT investigation paused, not resolved.
- Open [Issue #43](https://github.com/nanotech-solutions-norway/vitacoat/issues/43): finished-coating claim evidence, historical Citrox provenance and biocidal classification requires qualified owner decisions.
- Open [Issue #44](https://github.com/nanotech-solutions-norway/vitacoat/issues/44): Formspree provider delivery and controller DPA/retention rights not yet verified; code-level synthetic checks are not a provider receipt.
- Existing staging includes neutral bilingual About SVG drafts, source-only copy corrections and technical/regulatory review packs. Bilingual source diff and branch-only GitHub reads passed; there are zero workflow runs triggered from this branch. Do not infer actual SVG render, physical-device validation, qualified report approval, active provider account or publication rights.
- Open [PR #22](https://github.com/nanotech-solutions-norway/vitacoat/pull/22) from Sept is conflicting (`mergeable_state=dirty`), contains obsolete Phase-8 baseline work now materially represented by current scripts/workflows; exact overlap and safe closure require explicit decision, never auto-merge. PRs [#8](https://github.com/nanotech-solutions-norway/vitacoat/pull/8), [#9](https://github.com/nanotech-solutions-norway/vitacoat/pull/9), [#10](https://github.com/nanotech-solutions-norway/vitacoat/pull/10), [#11](https://github.com/nanotech-solutions-norway/vitacoat/pull/11), [#12](https://github.com/nanotech-solutions-norway/vitacoat/pull/12) are open, September Dependabot pin-upgrade proposals. Current `main` uses older pinned versions; do not merge without separate version/security/CI validation.
- Google Drive project-memory folder holds May 2026 source pointers that returned zero text; GitHub approved rules and current project repository evidence are authoritative for this session, Drive redacted mirror remains `MIRROR_PENDING`.

## Process decisions (/Button selection)
All controls should default to the safe preparation/hold option. A selection is **not authorization** until the owner invokes one final Confirm & Execute action, listing exact project, work IDs, targets, effects, source SHA, dependencies and STOP conditions. The confirmed instruction still does not replace required professional/regulator/processor review or provider access.

### P1 — VC-IMP-03, About NO/EN graphics
**Owner:** VitaCoat brand/technical design owner · **Tier:** A0/A1 review, A2 public release gated · **Target:** `about/index.html`, `en/about/index.html`, `assets/img/vitacoat-about-review-{no,en}.svg` on branch.
- **A (recommended):** Request structured owner visual review of staged neutral NO/EN diagrams and prepare acceptance feedback. No automatic visual sign-off, PR or production merge.
- **B:** Request revised design/copy with specific comments, keeping current source in review.
- **C:** Hold visual source proposal.
**Blocker:** no signed visual owner acceptance; physical iOS/Android/browser rendering unverified. **Workaround:** review source on GitHub and later inspect rendered previews on actual devices once appropriate tooling is authorized.

### P2 — VC-PR01/02, current formulation and BPR claims
**Owner:** qualified VitaCoat product and EU/EEA/Norway regulatory reviewers · **Tier:** A0 review; A2/A3 regulated claim/publication gated · **Target:** [Issue #43](https://github.com/nanotech-solutions-norway/vitacoat/issues/43), existing claim matrix.
- **A (recommended):** Assign/prepare exact formulation, method/report and BPR Article 3/58 evidence questions; no approval inferred.
- **B:** Prepare alternative strictly claim-neutral text for technical reviewer assessment, still no public publication.
- **C:** Hold current public claim changes and await verified evidence.
**Blocker:** current finished-coating formulation bridge, signed lab rights and legal classification absent. **Workaround:** keep claims strictly within accepted evidence, preserve original reports, request qualified written opinion.

### P3 — VC-PR03/04, Formspree and data-controller readiness
**Owner:** NTSN controller + Formspree authorized account owner · **Tier:** A0 read-only, potential external test A2 if separately authorized · **Target:** [Issue #44](https://github.com/nanotech-solutions-norway/vitacoat/issues/44), NO/EN contact form endpoint and provider account.
- **A (recommended):** Perform read-only provider account ownership, DPA, transfer, retention and inbox-routing review if access is connected; no POST or setting change.
- **B:** Prepare bounded single synthetic non-personal live submission approval pack; do not submit until provider rights, controller approval, exact scope, test address and inbox verification are all confirmed.
- **C:** Hold provider-side verification and preserve existing synthetic code evidence.
**Blocker:** Formspree connector/account rights not accessible; normal source scripts cannot confirm inbox or lawful processing. **Workaround:** controller checks the Formspree dashboard/DPA and passes only redacted status for audit; do not share customer data or secret IDs.

### P4 — VC-IMP-06, device and visual acceptance
**Owner:** design QA owner and a person with physical test devices · **Tier:** A0/A1 review · **Target:** pending bilingual About draft and current 50-route site.
- **A (recommended):** Prepare device-specific acceptance sheet and screenshot matrix for iOS Safari/Android Chrome and 360,390,768,1440 desktop widths; no claim of completed physical testing.
- **B:** Request owner-coordinated device signoff once screenshots/manual results are provided; do not infer it now.
- **C:** Hold physical-device testing.
**Blocker:** no independent physical device or rendered screenshot evidence in this connected tool session. **Workaround:** manual device testing with documented viewport, version and screenshot readback.

### P5 — VC-BACKLOG-01, obsolete pull requests and dependency pins
**Owner:** GitHub repository maintainer · **Tier:** A0 review; A1 close-only if explicitly selected · **Target:** PR #22 and PRs #8–#12.
- **A (recommended):** Reconcile each PR against current code/workflow/action versions; propose close/supersede or independent upgrade PR only after evidence and owner review. Do not merge or trigger CI.
- **B:** Close obsolete PR #22 without merging only after exact-head readback confirms it remains dirty and superseded; leave Dependabot #8–#12 open for newer targeted upgrade review.
- **C:** Hold PR housekeeping.
**Blocker:** PR #22 conflict and unqualified Dependabot upgrades; standard PR CI would launch paused Lighthouse. **Workaround:** compare pinned action versions and prepare a separate upgrade proposal; do not bypass QA gates.

### P6 — VC-IMP-00/Issue #40, release-test policy
**Owner:** GitHub release owner · **Tier:** A0 HOLD (current authority) / A2 reactivation separately gated · **Target:** existing `.github/workflows/production-quality.yml` and Issue #40.
- **A (recommended):** Maintain Lighthouse HOLD: no PR creation, runner changes, CI bypass or production deployment.
- **B:** Request a **separate new authorization** to resume full original PR CI, including Lighthouse and existing performance/category budgets; no instant merge or runner changes.
**Blocker:** user's explicit pause on 09.11.2026. **Workaround:** keep branch-only documentation and test preparation until owner decides.

## Confirmation safety and progress contract
Exactly one final `Confirm & Execute Selected Actions` submits a consolidated operator instruction listing chosen A/B/C for P1–P6. Do not treat a UI selection alone as authorization. For each chosen action, re-read provider state and write ledger before side effect, then verify after. If any prerequisite unavailable: mark BLOCKED with manual steps, no retry of ambiguous writes. Do not assume professional/formulation DPA signoff from owner confirmation.

**Verified process completion:** not objectively quantifiable from this preparation register; per-process baseline and total `N/A% — unverified`. Existing branch-only preparation is complete for its review-specific scope, not the full project. **Owner approvals pending.**


## Owner decision update — 11.11.2026: #43 approved for owner review; #44 on hold

**Authoritative scope:** Direct owner message: “#43 is reviewed and approved. #44 will remain on hold.” GitHub issue bodies and append-only comment records re-read independently; no changes to main or production.

- **Issue #43 — OWNER_REVIEW_APPROVED, technical release gate NOT_VERIFIED:** Owner explicitly confirms the review has been approved. This supersedes the older *owner decision pending* status for the package and avoids asking the owner to re-approve the same decision. The issue's original closure requirements for qualified signed current finished-formulation-to-report evidence, EU/EEA/Norway BPR classification, exact permitted NO/EN public claims, source publication rights and controlled release acceptance are **not evidenced in the accessible GitHub issue**, therefore issue remains OPEN and scientific/regulatory publication is not independently authorized. [GitHub owner approval and evidence-status record](https://github.com/nanotech-solutions-norway/vitacoat/issues/43#issuecomment-6790919986).
- **Issue #44 — ON_HOLD_BY_OWNER / OPEN:** No Formspree account/DPA/retention/routing verification or live test, no submission, no provider changes. Existing source audit remains read-only historical evidence; do not advance this stream until fresh explicit user authorization and independent controller/provider rights. [GitHub hold record](https://github.com/nanotech-solutions-norway/vitacoat/issues/44#issuecomment-6790921378).
- **Issue #40 — Lighthouse remains PAUSED / OPEN.** No PR, CI, release, runner, billing or published-site changes authorized. Normal acceptance budgets stay unchanged.

**Execution verification:** Current `main@de4bba618f421cca7023ceb2aa9b60e854960228` unchanged; this addendum is unmerged branch-only. Approval refers to the owner's review decision, not a self-certified legal/regulatory outcome, and may require private controlled evidence identifiers rather than disclosure of confidential formulation documents in a public repository. Work ID `VITA-IMPROVEMENTS-20261031-01`, canonical GitHub ledger E110–E111.
