# AI-Free TRUSTED-V Platform

TRUSTED-V will retain its secure RISC-V platform, products, marketplace, partner information, account access, and administration without any AI-powered experiences.
Solution Builder and every other AI entry point will be removed so users encounter a focused, non-AI platform throughout.

## Who it’s for

- Embedded engineers exploring TRUSTED-V products, secure Rust capabilities, hardware, and services.
- Platform administrators managing the non-AI platform content and operational records.
- Prospective partners and customers evaluating the RISC-V platform.

## Core features and experience

- Remove the Solution Builder page, its navigation links, calls to action, project-generation controls, and related saved-generation experiences.
- Remove the AI chat experience and all visible references to AI assistants, AI project guidance, model selection, or provider configuration.
- Remove administrator-facing AI model settings and the existing OpenAI/Gemini model controls.
- Remove inactive and active AI generation endpoints, provider-specific error messages, and AI-only stored data that is no longer needed.
- Remove all AI provider packages and server configuration that exist only for these removed features.
- Keep authentication, products, marketplace, platform architecture, services, contact flows, standard project/account features, and the existing non-AI visual language unchanged.
- Replace any now-empty navigation or page destinations with sensible existing platform destinations so visitors do not reach dead ends.

## User flow

1. A signed-in visitor navigates the platform without seeing Solution Builder, AI chat, model selection, or AI configuration controls.
2. The visitor can continue to explore products, platform information, marketplace content, services, and contact options as before.
3. Administrators manage the same non-AI platform records without AI provider settings or model controls.
4. Requests to retired AI-only routes return a clear unavailable response rather than exposing implementation details.

## UI/UX feel

- Preserve the established TRUSTED-V editorial semiconductor visual language, navigation structure, typography, and responsive behavior.
- Avoid gaps in navigation, broken links, empty dashboard areas, or obsolete AI language.
- Keep the removal invisible to unaffected workflows: no provider branding, technical migration notices, or replacement model interfaces.

## Implementation phases

### Phase 1 — AI feature and integration removal (build now)
- Remove Solution Builder, AI chat, model picker, AI settings, associated navigation/routes, and AI-specific calls to action.
- Retire AI generation and chat endpoints; preserve clear, safe unavailable responses for any remaining legacy requests.
- Remove Gemini, OpenAI, and managed AI runtime dependencies and their live server configuration references when they are no longer used.
- Verify that sign-in, navigation, non-AI platform pages, marketplace, services, and admin functions continue to work without AI-related console or server errors.

### Phase 2 — Content and information-architecture review (not built now)
- Review all public product copy for AI claims and update positioning only where the business direction requires it.
- Consider a non-AI project-planning resource or documentation path if users later need structured project guidance.

### Phase 3 — Future capability decisions (not built now)
- Decide whether a future builder should return as a fully deterministic, template-based configuration tool.
- Define separate requirements and governance before introducing any new AI or external-generation capability.

## Assumptions

- “Remove all AI features and integrations” includes Solution Builder, the AI chat experience, Gemini, OpenAI, the managed AI library, model selection, and admin model settings.
- Existing generated project records may remain as historical account data, but no AI generation or download flow will be presented as an active capability.
- All non-AI RISC-V platform pages, account access, marketplace content, services, contact flows, and non-AI administration should remain available.
- Retired AI-only URLs should fail safely rather than redirecting users into an unrelated workflow.