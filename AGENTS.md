<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Clinic contact details live in src/lib/clinic.ts and services/blog posts in src/lib/content.ts; pages render from these so content edits never touch layout.
- Shared site chrome (header, footer, page hero, booking form) lives in src/components/site.tsx and is mounted in __root; scroll-reveal is CSS (.reveal) driven by one IntersectionObserver to keep pages light.
- Smile Advisor calls the AI gateway only from a server function (src/lib/advisor.functions.ts -> advisor.server.ts) and validates returned slugs against content.ts so it can never link to non-existent pages.
- Text on light surfaces uses accent-strong / deep gold tokens; `.bg-ink` descendants auto-switch to light gold via CSS so contrast holds without per-component overrides. The site root uses `bg-site`, not `bg-ink`, to avoid triggering that switch globally.
- 3D (React Three Fiber) scene elements in src/components/teeth3d.tsx are built with React.createElement, not JSX: the dev-only TanStack source-tagging plugin adds a data-tsd-source prop to every JSX element, which crashes three.js objects.
