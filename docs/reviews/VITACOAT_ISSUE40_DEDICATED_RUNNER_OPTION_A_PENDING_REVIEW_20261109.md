# VitaCoat — Issue #40: Dedicated Lighthouse Runner, Option A
**Prepared:** 09/11/2026 · 08:52 · Europe/Madrid
**Status:** PENDING_REVIEW / COSTED ENGINEERING PROPOSAL / NO EXECUTION AUTHORITY
**Owning work ID:** `VITA-IMPROVEMENTS-20261031-01`
**Incident:** https://github.com/nanotech-solutions-norway/vitacoat/issues/40
**Authority:** `docs/production-handoff.md`; `ai-memory-ops/memory/global_rules.yaml` APPROVED; `ai-memory-ops/protocols/operational_event_logging_rollback_CURRENT.md` APPROVED.
**Source revision:** `main@3dffbc7ef4a67b78c585e52442322e41f1b79e91`
**Owner restriction:** No charges, account changes, runner provisioning, CI deployment, production code/Pages change, secrets, or DNS changes without fresh, explicit authorization.

## 1. Decision and observations
Current VitaCoat repo is PUBLIC and `owner.type=User` (personal GitHub account `nanotech-solutions-norway`), with repository-level `admin=true`. It is NOT currently an eligible organization repository for GitHub-managed larger runners. The connected GitHub action reads repository metadata and code, but its `fetch` endpoint rejects account runner/billing endpoints; therefore current subscription, available billing balance/credits, credit card, current bill, actual runner inventory, organization owner rights and quote/checkout tax are **NOT_VERIFIED**. Repository-level admin does not confer billing authority.

Current standard public Linux GitHub-hosted runner: 4 virtual CPUs, 16 GB RAM; standard Actions compute use on PUBLIC GitHub repo is free. GitHub-hosted larger runners require an organization on GitHub Team or Enterprise Cloud. Current list prices for Linux x64 larger runners (USD, per minute, rounded upward separately per job): 4 vCPU/16GB $0.012, 8 vCPU/32GB $0.022, 16 vCPU/64GB $0.042. Team entry list price $4/user/month. Larger runners are metered in public repositories too; GitHub notes eligible GitHub Team/Enterprise included compute value may offset some usage, depending on account usage. The final account-specific invoice is not accessible here; VAT/FX, subscription/seat count, consumed credits and other metered Actions/storage may affect it.

Root cause not conclusively established: prior `main` cold NO mobile Lighthouse TBT first sample 516.5 ms and 259.2 ms > 200 ms, later 0 ms; Issue #40. English-first PR #41 isolated order sensitivity, closed NOT MERGED. Ubuntu 24.04 pin-only PR #42 passed once at TBT 194 ms then failed repeat at 253 ms, closed NOT MERGED. Neither altered `main`.

GoogleChrome Lighthouse's official variability guidance calls for at least two **dedicated** CPU cores (four recommended), 4–8GB RAM and avoidance of burstable/shared-core instances; parallel Lighthouse runs on the same host distort results. An 8-vCPU GitHub larger runner improves provisioning capacity but is a managed VM, **not proof** of exclusive physical CPU cores or repeatable first-sample TBT; actual qualification is mandatory.

## 2. Route evaluation and preferred architecture
**A1 — RECOMMENDED gated feasibility pilot:** Create a separate GitHub Team ORGANIZATION and PRIVATE `vitacoat-lighthouse-qa` repository, retaining the existing public VitaCoat production repo, GitHub Pages, custom domain and DNS untouched. Restrict a GitHub-managed larger runner (8 vCPU, 32 GB RAM, Linux x64/Ubuntu 24.04 image if available at setup) to a dedicated group accessible only to that QA repository and the approved manually dispatched workflow. The QA workflow reads only a human-approved, immutable source SHA from public VitaCoat and runs Lighthouse on its own localhost static build; no live contact submissions, writes to production, public PR-triggered jobs, or secrets. Advantages: avoids risky transfer of production Pages repository, isolates runner permissions, optional independent assessment. Limitation: results are evidence only until a separately authorized cross-repo release-status integration is designed and verified.

**A2 — NOT RECOMMENDED without separate migration approval:** Transfer production repository to an eligible Team organization and use its larger runner directly. This requires a repo-owner/organization-owner/billing authorization and creates GitHub Pages/default URL, webhook, permissions, status and custom-domain review work. GitHub explicitly does NOT redirect Pages URLs for transfers. Such a transfer is outside the user's present approval.

**A3 — NOT RECOMMENDED for current public repo:** Attach a persistent self-hosted runner directly to `vitacoat`. GitHub's security guidance strongly discourages self-hosted runners on public repositories because untrusted PR code can compromise the host. A hardened, ephemeral VM in a private QA-only repository is an alternative after provider-specific cloud quote and separate security approval; software being free on GitHub does NOT mean physical/cloud capacity has zero cost.

## 3. Verifiable price and bounded cost scenario
Published tariffs as of 09.11.2026 (USD; *not* an account invoice):

| Runner | Hardware | Per billed minute | 10-min job | 20 × 15-min jobs |
|---|---|---:|---:|---:|
| Standard public GitHub-hosted | Linux x64, 4 vCPU /16GB | $0 for public repo | $0 | $0 |
| Larger Linux 4-vCPU | 4 vCPU /16GB | $0.012 | $0.12 | $3.60 |
| **Larger Linux 8-vCPU (pilot choice)** | 8 vCPU /32GB | **$0.022** | **$0.22** | **$6.60** |
| Larger Linux 16-vCPU | 16 vCPU /64GB | $0.042 | $0.42 | $12.60 |

20 × 10 minutes on 8-core = $4.40, 20 × 15 minutes = $6.60, 20 × 20 minutes = $8.80 at list price. Add **at least** one Team seat at $4/month if a NEW Team org is required (pricing and billing period to confirm in checkout): one seat + 20 × 15-min 8-core runs = **$10.60 nominal list cost** before tax, other subscription commitments or included-compute offsets. GitHub charges larger runner usage only while jobs execute; unused configured runner incurs no runner-minute charge. Actual account cost remains NOT_VERIFIED because billing/credits, whether an eligible existing Team organization already exists, payment rights and runner provisioning rights are unavailable through the connector. Storage and additional test retries may add cost; each partial job minute is rounded up.

**Proposed initial spending envelope for separate approval:** one Team seat **up to $4/month list** plus GitHub Actions metered pilot maximum **$10 total** (hard-stop budget scoped to the new private QA repository and, where possible, SKU). Do not enable charges until exact organization, billing owner, tax and hard-stop behavior are checked on account. If the provider cannot enforce a hard cap on this SKU/account, STOP and return for owner decision rather than rely only on email alerts. Do not create overlapping org-wide budgets that might disable production Actions elsewhere.

## 4. Exact gated implementation plan (NONE of these actions is authorized yet)
**G0 — account/eligibility and cost preconditions, READ ONLY:** Authorized owner signs into GitHub Settings > Billing & licensing / Budgets and alerts; confirms personal owner vs an existing Team org, eligible organization admins, billed plan and seat count, payment method, included compute balance and historical Actions metered use. Confirm availability of 8-core Linux x64 runner, image and group controls in that org. Confirm supported 8-core label; use provider's actual label, never invent one. Read the checkout estimate with tax. Record only a redacted confirmation of budget and authority, not card data. If no eligible org, require explicit permission to subscribe/create organization, with its exact name/seat and hard limit.

**G1 — organization and runner (charge/provisioning approval required):** In the eligible GitHub Team organization, create private QA repository (proposed name `vitacoat-lighthouse-qa`); no changes to original repo or domain. Create group `vitacoat-lighthouse-only`, repository access **Selected repositories** = QA repo only, workflow access **Selected workflows** = `ORG/vitacoat-lighthouse-qa/.github/workflows/lighthouse-verify.yml@refs/heads/main`. Create GitHub larger Linux x64 8-core runner, 32GB, Ubuntu 24.04 if offered, maximum concurrency **1**; confirm displayed group, label, image, capacity, quota and online/available status in GitHub UI. Record exact provider-generated runner name and labels after setup. No static IP or private networking requested. Require explicit monthly **hard stop** and owner-visible spending alerts.

**G2 — isolated QA workflow (separate implementation authorization):** Private QA repository workflow triggers `workflow_dispatch` only; no `push`, `pull_request`, `pull_request_target`, `workflow_run` or scheduled triggers on its larger runner. `permissions: contents: read`, no persistent credentials, no production deployment token/secrets, no write-scoped GitHub App token. Inputs: immutable approved `source_sha`, required source repository literal `nanotech-solutions-norway/vitacoat` (read-only), fixed Lighthouse 13.6.0, Node 24, Python Pillow 11.3.0. Before fetching/executing site code, verify requested SHA equals an owner-approved SHA and is reachable from the approved source main; otherwise fail closed. Checkout the **exact** SHA, build `_site` using existing `.github/scripts/build_site.py` and `enhance_release.py`, serve on 127.0.0.1:8000, run existing `lighthouse_gate.py` preserving NO-first mobile x3, EN mobile, contact/downloads, all desktops and unchanged budgets. Serial single Lighthouse process per VM, no pre-warm, metric substitution, discarded first samples, lower thresholds, or median gating. Report source sha, run attempt, actual runner ID/OS/CPU/RAM, CPU benchmarkIndex, version, first-sample TBT/LCP, all raw budgets, full failure details. Retain artifacts 14 days and evidence summaries in the canonical workstream ledger. **No deployment**.

**G3 — independent qualification:** First perform **five separate cold-start runs** at the same SHA to detect obvious defects. If any first-sample TBT >200ms, stop and diagnose, not change the threshold. Then complete **at least 20 independent first-cold runs** (new job/runner allocation, several different sessions; not 20 warmed Lighthouse iterations). Require **zero** first-sample TBT >200ms, zero LCP >2500ms, CLS >0.1, or category score below existing 0.90/0.95 budgets. Preserve each failing artifact; track p50/p95 and benchmarkIndex for diagnostics only. **Advisory resilience target:** p95 cold TBT <=160ms (20% headroom), not a replacement for original <=200ms gate. Check reproducible runs across at least two independent runner/image sessions and multiple times; a sample of 20 cannot guarantee future determinism. Re-run existing 50-route and three-browser smoke on the original standard runners to ensure no site regression.

**G4 — separate release-gate integration (new approval, NOT included here):** Only after stable G3 results, design attested status reporting from QA repo to source PR without granting untrusted PR source code credentials. Consider a tightly scoped GitHub App/check-run integration or manual owner-reviewed evidence for initial adoption. Protect source branch required checks from missing/late statuses. Approve status-connection permission, exact source SHA handling, owner, expiry, rate/cost before authorizing implementation. Never replace existing required gate or publish/deploy directly as a side-effect of a private QA run.

**G5 — operational handoff:** Document actual billed usage against approved cap; record provider runner/group and source revision, reproducibility evidence, failure/rollback reference and accountable owner. Disable/remove unused larger runner and its access rights on trial completion if not separately approved for production use.

## 5. Security, change control, failure/rollback
- Private, owner-restricted QA runner group. Never put publicly submitted PR code, secrets or trusted publisher tokens onto a self-hosted runner. GitHub-managed runners preferred over public-repo self-hosted.
- No external customer material or personal form content in QA. No external live form submits; synthetic contact tests network intercepted if included, and run only on standard runners.
- No source modification to `main`, `.github/workflows/production-quality.yml`, GitHub Pages, custom domain or DNS from this plan. No new workflow triggered in billed org until G0/G1 approvals.
- If QA costs exceed approved cap or first-cold TBT repeatedly fails, disable the optional runner/workflow, retain redacted evidence, open PENDING_REVIEW on Issue #40. Any later corrective source change requires normal PR checks and production acceptance.
- Promotion/merge is prohibited until full relevant gates are green and the owner separately approves activation, runner billing and any account or release-policy change. No automatic charge or background check-in.

## 6. Provider-specific verification outstanding
- ACCOUNT_NOT_VERIFIED: currently paid plan, Team-org membership/ownership, invoice/tax/credit balances, card/quotas, runner provisioning rights and inventory. GitHub connector does not expose Actions runner/billing APIs; `fetch` calls to those paths returned INVALID_ARGUMENT (not allowed).
- DEDICATED_PHYSICAL_CPU_NOT_VERIFIED: larger runner represents 8-vCPU managed VM, not proof of dedicated physical cores or zero noisy neighbors.
- Runner label, image SKU, hard budget applicability and tax are verified only at owner billing/runner creation UI after explicit approval.
- Google Drive AI-Memory-Vault VitaCoat project files were last updated in May 2026 and the connector returned empty content; current governance sourced from APPROVED GitHub ai-memory-ops and `vitacoat` production handoff/Issue #40.
- PERSISTENCE: this unmerged proposal and canonical ledger pointer live on review-only branch; Issue #40 comment can mirror a redacted summary. Derived Drive mirror remains PENDING.

## 7. Source references
- GitHub managed larger runners eligibility: https://docs.github.com/en/actions/how-tos/manage-runners/larger-runners/manage-larger-runners
- Larger runner hardware: https://docs.github.com/en/actions/reference/runners/larger-runners
- Current GitHub runner tariffs: https://docs.github.com/en/billing/reference/actions-runner-pricing
- Standard public runner free: https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job
- Team pricing: https://github.com/pricing
- Cost hard-stop budgets: https://docs.github.com/en/billing/how-tos/set-up-budgets
- Secure self-hosted runner guidance: https://docs.github.com/en/actions/reference/security/secure-use
- Larger runner group workflow access: https://docs.github.com/en/actions/how-tos/manage-runners/larger-runners/control-access
- GitHub repository transfers (Pages caveat): https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository
- Lighthouse reproducibility: https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md
- VitaCoat issue evidence: https://github.com/nanotech-solutions-norway/vitacoat/issues/40
