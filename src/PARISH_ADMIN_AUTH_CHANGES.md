# Parish-linked administrator registration and login

This patch updates the existing `src` tree only. Keep your existing project `pom.xml`, database configuration, React app, and other project files unchanged.

## Rules now enforced by the backend

- Registration accepts `username`, `password`, and `parishName`.
- `parishName` must match an existing parish in the database (case-insensitive, whitespace-trimmed).
- The registration form can load available parishes from `GET /api/auth/parishes`; it returns only parishes without a currently assigned admin.
- One regular admin account can be assigned to a parish, and the database mapping uses a unique nullable `users.parish_id` column.
- A new account is still pending System Administrator approval, preserving the existing approval flow.
- A regular admin cannot log in unless approved, active, and linked to an existing parish.
- Successful login returns the JWT and `parishId`/`parishName` in the response.
- `ROLE_SYSTEM_ADMIN` does not require a parish assignment.
- System admin can assign an existing regular-admin account to a parish through `PUT /api/system-admin/admins/{id}/parish`.
- The system-admin admin list includes each admin's parish ID and name.
- Creating/updating a parish rejects a duplicate parish name (case-insensitive).
- Deleting a parish clears its admin's parish assignment, so the account cannot continue logging into a deleted parish.

## API examples

### Get available parishes for the registration dropdown

`GET /api/auth/parishes`

Example response:

```json
[
  { "id": 3, "name": "St Mary's Parish", "deaneryId": 1 },
  { "id": 5, "name": "St Peter's Parish", "deaneryId": 2 }
]
```

### Register a parish administrator

`POST /api/auth/register`

```json
{
  "username": "parishadmin01",
  "password": "use-a-strong-password",
  "parishName": "St Mary's Parish"
}
```

The backend rejects a missing parish, a parish that does not exist, an already-used username, or a parish that already has an admin. The registration stays pending until a system admin approves it.

### Login

`POST /api/auth/login`

```json
{
  "username": "parishadmin01",
  "password": "use-the-same-password"
}
```

Successful response contains:

```json
{
  "token": "<JWT>",
  "username": "parishadmin01",
  "role": "ROLE_ADMIN",
  "parishId": 3,
  "parishName": "St Mary's Parish"
}
```

The existing React login code can continue reading `token`; it should additionally store `parishId` and `parishName` to display the parish in the admin portal.

### Assign an existing admin to a parish (System Admin only)

`PUT /api/system-admin/admins/12/parish`

```json
{ "parishId": 3 }
```

Requires the System Admin's JWT. It rejects nonexistent parishes and parishes already assigned to a different admin.

## Important integration notes

1. `spring.jpa.hibernate.ddl-auto=update` is already enabled in the supplied `application.properties`; Hibernate should add `parish_id` to the existing SQLite `users` table. Back up `church.db` before running the updated source.
2. Existing regular admins without a parish assignment will now be denied login until the System Administrator assigns them to an existing parish, or they are removed and re-registered with a parish. The seeded System Administrator account is unaffected.
3. Public GET access for deaneries/parishes/priests/Mass Times remains as it was. Writes to those resources remain restricted to `ROLE_SYSTEM_ADMIN`.
4. This patch updates authentication and registration data. Gallery, news, events, attendance, and other content endpoints still need separate parish-scoping enforcement before they can be considered isolated between parishes.
5. The uploaded archive contained only `src`, not the root build files. Run your normal Maven build and test the registration/login flows in your full project before deploying.
