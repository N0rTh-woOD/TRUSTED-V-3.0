# Authentication Regression Checklist

- Confirm the sign-in gate sends unauthenticated visitors to `/login` for informational routes.
- Confirm both existing internal team credentials in `/app/memory/test_credentials.md` can sign in and land on the homepage.
- Confirm `/api/auth/me` accepts the issued bearer token for both accounts.
- Confirm direct `/admin/*` browser routes show the unavailable screen after sign-in and expose no management controls.
- Confirm former `/api/admin/*` requests return HTTP 410 with `This feature is no longer available` for either signed-in account.