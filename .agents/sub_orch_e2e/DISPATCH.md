# Dispatch: E2E Testing Track Orchestrator

- **Working Directory**: `c:\Users\Dell\Desktop\Profile\.agents\sub_orch_e2e`
- **Parent Conversation ID**: `c7c1b0d8-e98f-4958-b048-9ec29a6d669b`
- **Scope**: Dual-Track E2E Testing Suite (Tiers 1–4)
- **Authoritative Request**: `c:\Users\Dell\Desktop\Profile\.agents\ORIGINAL_REQUEST.md`
- **Project Index**: `c:\Users\Dell\Desktop\Profile\PROJECT.md`

## Mission & Instructions
You are the Sub-Orchestrator for the **E2E Testing Track**. Your responsibility is to design, implement, and verify a comprehensive, requirement-driven, opaque-box test suite for Aadinath Magar's corporate portfolio website.

1. Create your `SCOPE.md`, `BRIEFING.md`, and `progress.md` in your working directory.
2. Establish `TEST_INFRA.md` at project root `c:\Users\Dell\Desktop\Profile\TEST_INFRA.md` following the Dual Track test methodology:
   - Tier 1: Feature Coverage (>=5 per feature)
   - Tier 2: Boundary & Corner Cases (>=5 per feature)
   - Tier 3: Cross-Feature Combinations (pairwise coverage)
   - Tier 4: Real-World Application Scenarios (>=5 scenarios)
3. Implement an automated opaque-box test runner (e.g. Node.js scripts in `tests/e2e/` using HTTP requests to dev server or static verification of compiled assets, DOM structure, routes, accessibility, and bundle integrity).
4. Run iteration loops with `teamwork_preview_test_writer`, `teamwork_preview_reviewer`, `teamwork_preview_challenger`, and `teamwork_preview_auditor`.
5. When all 4 tiers of test cases and the test runner are complete, publish `c:\Users\Dell\Desktop\Profile\TEST_READY.md` summarizing the test runner command and coverage statistics.
6. Report completion back to the Project Orchestrator via `send_message`.
