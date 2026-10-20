# Archdiocese of Harare Deanery API

All classes use package `com.church.church_backend` and the existing Spring Boot/JPA setup.

## Access control

- `GET` endpoints for deaneries, parishes, priests, Mass times and deanery events are public for the website.
- `POST`, `PUT`, `PATCH` and `DELETE` management operations are restricted by `SecurityConfig` to `ROLE_SYSTEM_ADMIN`.
- Send the existing JWT in `Authorization: Bearer <token>` for management requests.
- These controllers use the existing entities and repositories; they do not introduce a second authentication system.

## Deaneries — `/api/deaneries`

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/deaneries` | List deaneries alphabetically, including `parishCount` (cache header: 24 hours) |
| GET | `/api/deaneries/{id}` | Deanery detail, its parishes, dean and vice-dean |
| POST | `/api/deaneries` | Create a deanery; slug generated automatically |
| PUT | `/api/deaneries/{id}` | Update a deanery |
| DELETE | `/api/deaneries/{id}` | Delete only when no parishes remain |
| GET | `/api/deaneries/{id}/parishes` | List parishes belonging to a deanery |
| GET | `/api/deaneries/{id}/stats` | Parish, priest and Catholic counts |
| PUT | `/api/deaneries/{id}/assign-dean` | Assign a dean using `{ "dean_id": 4 }` |
| GET | `/api/deaneries/{id}/events` | List events for a deanery |
| POST | `/api/deaneries/{id}/events` | Create an event for a deanery |

Example create body:
```json
{
  "name": "Gweru Deanery",
  "description": "Deanery description",
  "territory": "Gweru and surrounding areas",
  "deanId": null,
  "viceDeanId": null,
  "archdioceseId": 1,
  "status": "ACTIVE"
}
```

## Parishes — `/api/parishes`

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/parishes` | List all parishes; optional `?deanery_id=1` and/or `?search=St%20Mary` |
| GET | `/api/parishes/{id}` | Parish details |
| POST | `/api/parishes` | Create a parish; slug generated automatically |
| PUT | `/api/parishes/{id}` | Update parish details |
| DELETE | `/api/parishes/{id}` | Delete parish and its Mass times; priest records are retained |
| GET | `/api/parishes/{id}/mass-times` | List Mass times for a parish |

Example create body:
```json
{
  "deaneryId": 1,
  "name": "St Mary's Parish",
  "parishPriestId": null,
  "assistantPriestId": null,
  "address": "Gweru, Zimbabwe",
  "latitude": -19.45,
  "longitude": 29.82,
  "phone": "+263...",
  "email": "parish@example.org",
  "yearEstablished": 1950,
  "imageUrl": null,
  "facebookPageUrl": null,
  "catholicCount": 0
}
```

## Priests — `/api/priests`

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/priests` | List priests; optional `?deanery_id=1`, `?parish_id=2`, `?search=John` |
| GET | `/api/priests/{id}` | Get one priest |
| POST | `/api/priests` | Create priest |
| PUT | `/api/priests/{id}` | Update priest |
| DELETE | `/api/priests/{id}` | Delete priest and clear references to that priest |

Example body:
```json
{
  "name": "John Doe",
  "title": "Rev. Fr.",
  "photoUrl": null,
  "role": "Parish Priest",
  "deaneryId": 1,
  "parishId": 2,
  "phone": "+263...",
  "email": "priest@example.org",
  "bio": "Short biography"
}
```

## Mass times — `/api/mass-times`

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/mass-times` | List all Mass times; optional `?parish_id=2` |
| GET | `/api/mass-times/{id}` | Get one Mass time |
| POST | `/api/parishes/{parishId}/mass-times` | Add Mass time to a parish |
| PUT | `/api/mass-times/{id}` | Update Mass time |
| DELETE | `/api/mass-times/{id}` | Delete Mass time |

Example body for `POST /api/parishes/2/mass-times`:
```json
{
  "day": "Sunday",
  "time": "09:00",
  "language": "English",
  "type": "Sunday Mass"
}
```

## Deanery events — `/api/deanery-events`

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/deanery-events` | List all events; optional `?deanery_id=1` |
| GET | `/api/deanery-events/{id}` | Get one event |
| POST | `/api/deaneries/{id}/events` | Create event within a deanery |
| PUT | `/api/deanery-events/{id}` | Update event |
| DELETE | `/api/deanery-events/{id}` | Delete event |

Example body:
```json
{
  "title": "Deanery Youth Gathering",
  "date": "2026-11-15",
  "location": "Gweru",
  "description": "Annual youth gathering"
}
```

## Frontend examples

```js
// Public read
const response = await fetch('http://localhost:8080/api/deaneries');
const deaneries = await response.json();

// Superadmin write
const token = localStorage.getItem('token');
const response = await fetch('http://localhost:8080/api/parishes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ name: 'St Mary\'s Parish', deaneryId: 1 })
});
```

## Notes

- A `404` means the requested record was not found; `400` indicates invalid input; `409` means a deanery cannot be deleted while it still contains parishes.
- `totalCatholics` is calculated from the `catholicCount` values stored on parish records. Enter verified counts; the API does not estimate them.
- The source archive supplied for this update did not include the root `pom.xml`/Gradle build file, so this source-only archive has not been verified by a full Maven/Gradle build. Keep the project's existing build file and dependencies unchanged.
