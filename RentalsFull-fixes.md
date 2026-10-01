# RentalsFull — Fix List

Repo: https://github.com/shuddy05/RentalsFull

## 🔴 Critical

1. **Unauthenticated property write routes** (`server/routes/propertiesRouter.js`)
   - `POST /api/properties` and `PUT /api/properties/:id` have no `auth`/`isAdmin` middleware — anyone can create or overwrite listings.
   - Fix: remove the unauthenticated `POST`/`PUT` routes (keep only `GET /` and `GET /:id` public), or add `auth, isAdmin` matching `adminRouter.js`. Delete the now-redundant `createProperty`/`updateProperty` in `propertiesController.js` if the admin versions are the ones actually used.

## 🟠 Broken admin functionality

2. **Wrong API path in "Unlist/Activate" toggle** (`client/src/Pages/admin/AdminProperties.jsx`)
   - `api.patch("/admin/properties/${id}", ...)` is missing the `/api` prefix used everywhere else (`/api/admin/properties`). Fix the path so the PATCH actually hits the server route.

3. **Missing "Edit Property" route** (`client/src/App.jsx` + `client/src/Pages/admin/EditProperty.jsx`)
   - `AdminProperties.jsx` navigates to `/admin/properties/edit/:id`, but no such route is registered in `App.jsx`, and `EditProperty.jsx` is an empty stub (`<div>EditProperty</div>`).
   - Fix: add the route in `App.jsx`, and build `EditProperty.jsx` as a real form (pre-filled from `GET /api/admin/properties/:id` or existing property data, submitting via `PATCH /api/admin/properties/:id`).

4. **"Add New Property" form is not wired up** (`client/src/Pages/admin/AddNewProperty.jsx`)
   - No `useState`, no `onChange`/`onSubmit` handlers, image upload button does nothing, submit buttons don't call the API.
   - Fix: add controlled form state for all fields (title, description, type, price, location, address, rooms, bath, squareArea, parking, features/amenities, images), wire "Publish Property" to `POST /api/admin/properties` and "Save as Draft" to the same endpoint with `availability: "Draft"`.
   - Also fix duplicate `id="checkbox"` on the four amenity checkboxes (each needs a unique id, or drop the ids and use `<label>` wrapping instead).

5. **Placeholder admin pages** (`ListingRequests.jsx`, `TourRequests.jsx`, `UserManagement.jsx`, `AdminAcountSettings.jsx`)
   - All four are one-line stubs but are already linked in the admin nav/routes.
   - Fix: build these out, or temporarily hide their nav links/routes until they're implemented, so the admin panel doesn't expose dead pages.

## 🟡 Client-side route guard gap

6. **`ProtectedRoute` is imported but never used** (`client/src/App.jsx`)
   - `/saved-properties` and `/account` sit under `RootLayout` with no auth guard, so logged-out users can load them (and hit failing 401 API calls) instead of being redirected to `/login`.
   - Fix: wrap those two routes with `<ProtectedRoute>`, the same way `/admin` is wrapped with `<AdminRoute>`.

## Smaller items (fix opportunistically)

7. **CORS wide open** (`server/server.js`) — `app.use(cors())` has no origin allowlist. Restrict to the actual frontend origin(s) (Vercel URL, localhost for dev).
8. **JWT stored in `localStorage`** (`axiosConfig.js`, `AuthContext.jsx`) — vulnerable to theft via XSS. Consider moving to an httpOnly cookie when there's time to revisit auth (bigger change, not urgent).
9. **Duplicate `updateProperty` logic** in both `propertiesController.js` (unauthenticated) and `adminController.js` (protected) — consolidate into one, callable only via the protected admin path, once #1 is fixed.
10. **`rooms`, `bath`, `squareArea`, `parking` are typed as `String`** in `models/properties.js` — switch to `Number` so filtering/sorting (e.g. "3+ bedrooms") doesn't require string parsing later.
11. **`auth` middleware doesn't null-check the fetched user** (`server/middleware/middleware.js`) — `User.findById(payload.userId).select("role")` can return `null` if the user was deleted after the token was issued; `user.role` then throws inside the try block. It's caught by the outer catch so behavior is still safe (401), but add an explicit `if (!user) return res.status(401)...` for a clearer error path.
12. **Leftover `console.log`/`console.error` debug statements** in `savedProperties.js`, `AdminRoute.jsx`, `AdminProperties.jsx`, `BookmarkButton.jsx` — strip before a production build.
13. **`client/src/assets/images` is 8.8MB** — the bulk of repo size. Compress/optimize these, or move to Cloudinary/a CDN, especially since the Add Property form already implies real image uploads are intended.

---

# Prompt for Antigravity CLI

Copy everything below into Antigravity CLI, pointed at the `RentalsFull` repo, to execute the fixes.

```
You are working in the RentalsFull repo (client = React/Vite frontend, server = Express/Mongoose backend). Work through the following fixes in order. After each fix, run the relevant part of the app (or at minimum lint/build) to confirm nothing broke, then move to the next item. Do not change unrelated code or refactor beyond what's needed for each fix.

1. SECURITY (do this first): In server/routes/propertiesRouter.js, the POST / and PUT /:id routes have no auth middleware, meaning anyone can create or overwrite property listings without logging in. Remove the unauthenticated POST and PUT routes entirely, keeping only GET / and GET /:id public (read-only). Then check propertiesController.js — if createProperty and updateProperty there are now unused, remove them, since equivalent authenticated versions already exist in adminController.js guarded by auth + isAdmin in adminRouter.js.

2. In client/src/Pages/admin/AdminProperties.jsx, the handleToggleAvailability function calls api.patch(`/admin/properties/${id}`, ...) — this is missing the `/api` prefix used by every other admin call in this file (e.g. `/api/admin/properties`). Fix the path to `/api/admin/properties/${id}` so the availability toggle actually reaches the server.

3. Add a working "Edit Property" flow:
   - In client/src/App.jsx, add a route `admin/properties/edit/:id` under the existing `/admin` route block, rendering an EditProperty component.
   - Replace the stub in client/src/Pages/admin/EditProperty.jsx with a real form: on mount, fetch the property (reuse GET /api/admin/properties and find by id, or add a GET /api/admin/properties/:id endpoint on the server if one doesn't exist), pre-fill a form matching the property schema (title, description, type, status, price, location, rooms, bath, squareArea, parking, features, images, availability), and submit changes via PATCH /api/admin/properties/:id. Match the visual style already used in AddNewProperty.jsx and AdminProperties.jsx (Tailwind classes, #7065F0 accent color).

4. Wire up client/src/Pages/admin/AddNewProperty.jsx, which currently renders a static form with no state or submit handling:
   - Add controlled React state for every field: title, description, type, price, location, address, rooms (bedrooms), bath, squareArea, parking, features/amenities (array from the checkboxes), and images.
   - Fix the duplicate id="checkbox" attributes on the four amenity checkboxes — give each a unique id (e.g. wifi, parkingSpace, power, other) and match each label's htmlFor to it.
   - Wire the "Choose File" button and drag-and-drop area to a real file input (accept image/jpeg, image/png, max 5MB per the existing copy), and store selected images in state for upload.
   - Wire "Publish Property" to submit via POST /api/admin/properties with availability implicitly "Available" (or omitted, since that's the model default), and "Save as Draft" to submit the same payload with availability: "Draft".
   - Add basic client-side validation (required fields matching the Property mongoose schema: title, location, price, status, type, rooms, bath, description, features, squareArea, parking, images) and surface errors near each field or in a summary banner.
   - On successful submit, navigate back to /admin/properties.

5. In client/src/App.jsx, ProtectedRoute is imported but never applied to any route. Wrap the /saved-properties and /account routes (currently bare under RootLayout) with <ProtectedRoute> the same way /admin is wrapped with <AdminRoute>, so logged-out users are redirected to /login instead of hitting failing API calls on those pages.

6. In server/server.js, replace the unrestricted `app.use(cors())` with a configured CORS instance that only allows the deployed frontend origin(s) — read from an environment variable (e.g. CLIENT_URL) with a sane localhost fallback for development, e.g.:
   const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173").split(",");
   app.use(cors({ origin: allowedOrigins, credentials: true }));
   Add CLIENT_URL to the .env.example / README env var list if one exists.

7. In server/models/properties.js, change the `rooms`, `bath`, `squareArea`, and `parking` fields from `String` to `Number`. Update any frontend code that renders or submits these fields (AddNewProperty.jsx, EditProperty.jsx, PropertyCard.jsx, DetailedProperties.jsx, and any filter logic in Properties.jsx) to treat them as numbers instead of strings, including any `toLocaleString()`/parsing adjustments needed.

8. In server/middleware/middleware.js, the auth function does `const user = await User.findById(payload.userId).select("role")` without checking if `user` is null before reading `user.role`. Add an explicit check: if `!user`, return `res.status(401).json({ message: "User not found" })` before constructing `req.user`.

9. Remove leftover debug console.log/console.error statements (not real error handling — the ones that are just print-debugging) from server/controllers/savedProperties.js, client/src/Components/AdminRoute.jsx, client/src/Pages/admin/AdminProperties.jsx, and client/src/Components/BookmarkButton.jsx. Keep genuine error logging (e.g. inside catch blocks that report failures), remove only the stray debug prints.

After all fixes: run the client build (npm run build in client/) and confirm the server starts cleanly (npm run dev in server/, or at minimum a syntax/lint check) to verify nothing broke. Summarize what changed per file at the end.
```
