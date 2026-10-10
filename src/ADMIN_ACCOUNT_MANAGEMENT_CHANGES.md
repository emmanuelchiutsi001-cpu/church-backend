ADMIN ACCOUNT MANAGEMENT CHANGES

Added:
- AdminManagementController.java
  - GET /api/system-admin/admins
  - PUT /api/system-admin/admins/{id}/suspend
  - PUT /api/system-admin/admins/{id}/reactivate
  - DELETE /api/system-admin/admins/{id}

Security and behavior:
- SecurityConfig restricts /api/system-admin/** to ROLE_SYSTEM_ADMIN.
- Only users whose database role is exactly ROLE_ADMIN can be suspended, reactivated, or deleted.
- AppUser now has a suspended status field. It is nullable in the database mapping to reduce risk when updating an existing SQLite database; null is treated as not suspended.
- Login refuses suspended accounts.
- JwtRequestFilter checks current database approval, suspension, and role on each authenticated request, so existing JWTs stop working when an admin is suspended.
- Deletion is refused with HTTP 409 if the admin still owns a subdivision. This preserves subdivision data and avoids a foreign-key failure.

Integration notes:
- This archive contains the src tree only, matching the uploaded archive; it does not include pom.xml/build.gradle, frontend files, or the database.
- Back up church.db before starting the updated backend. Hibernate ddl-auto=update is enabled in the current configuration.
- I could not run a full Maven/Gradle build because no build descriptor was included in the uploaded src archive.
