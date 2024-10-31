On the client side (e.g., in React), you can check if a user is authenticated before rendering certain routes. If the user doesn’t have a valid token, you can redirect them to the login page, or prevent access to restricted pages (like an admin dashboard).

The route will only render the Component if a token exists.
If there’s no token, the user is redirected to the /login page.

This protects the UI from showing sensitive routes, like an admin dashboard, if the user isn’t authenticated.




Even if you prevent unauthorized users from accessing admin routes in the frontend, you must still protect the backend. Why? Because frontend checks can be easily bypassed by someone who knows how to manipulate network requests (e.g., using Postman or other tools to send requests directly to your backend).


Here’s how backend protection works:

Even if your frontend blocks access, someone could send a request directly to your API (admin routes).
Example: A malicious user could bypass the frontend entirely and still hit your protected admin route with a crafted HTTP request.

That’s why server-side protection (like using adminAuth middleware) is necessary. This ensures that only authenticated requests with valid tokens can interact with sensitive backend routes.