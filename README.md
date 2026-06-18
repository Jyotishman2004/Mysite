# React + Vite Portfolio

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Developer & Architectural Notes

### ⚠️ Intentional Mock Links
* **GITHUB and TWITTER Links**: The social links for GITHUB and TWITTER in `Footer.jsx` and `Contact.jsx` are **intentionally** configured to link to `/404` (using React Router `<Link to="/404">`). **Do not change them to external profile links**, as keeping them pointing to the system malfunction/404 page is part of the custom mockup/aesthetic design of the website. Only LinkedIn should point to an external profile.

---

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
