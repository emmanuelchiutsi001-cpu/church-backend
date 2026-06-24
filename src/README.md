# Church Management System Backend

A secure, high-performance, and scalable backend engine built with **Java Spring Boot** and **SQLite**. This system is specifically architected to provide zero-friction public read access for regular church visitors while heavily guarding administrative tools using stateless **JWT (JSON Web Tokens)** and cryptographically hashed credentials.

---

## 🏛️ Completed Architecture & Milestones

We have successfully engineered and verified the entire backend core:
1. **Database Layer:** Configured an embedded, lightweight SQLite database ecosystem (`church.db`) handled via Spring Data JPA.
2. **Security & Guard System:** Engineered a stateless `JwtRequestFilter` that intercepts traffic and validates JWT signatures in-memory before reaching database layers.
3. **Data Protection:** Implemented **BCrypt Hashing** for passwords to ensure user data is completely safe from theft or database leaks.
4. **External Configuration:** Extracted master credentials from the source code into environment variable mappings (`application.properties`) to keep Git repositories entirely secure.
5. **CORS Alignment:** Implemented a robust Cross-Origin Resource Sharing (`WebConfig`) setup to allow seamless connections from JavaScript frontends.
6. **Global Error Handling:** Created a centralized exception handler to translate Java stack traces into clean JSON objects for the frontend UI.

---

## 🔑 Default Master Credentials (Local Development)
When the application boots up, a Master System Admin account is automatically seeded into the database if it doesn't already exist:
* **Username:** `mj_sysadmin`
* **Password:** `MasterSecret2026!`

*Note: In production environments, override these defaults by setting the `SYS_ADMIN_USER` and `SYS_ADMIN_PASSWORD` system environment variables.*

---

## 📋 API Endpoint Documentation

### Authentication & Admin Management
| Endpoint | HTTP Method | Access Level | Description / Request Payload |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Public | Submits a request for a new admin profile. <br>`{"username": "admin1", "password": "securePassword"}` |
| `/api/auth/login` | `POST` | Public | Verifies credentials and issues a token. <br>`{"username": "...", "password": "..."}` <br>**Returns:** `{"token": "JWT_STRING"}` |
| `/api/auth/pending` | `GET` | System Admin | Retrieves a list of all admin accounts currently awaiting approval. |
| `/api/auth/approve/{id}` | `PUT` | System Admin | Activates and approves a pending admin account using its ID. |

### Church Members Directory
| Endpoint | HTTP Method | Access Level | Description / Request Payload |
| :--- | :--- | :--- | :--- |
| `/api/members` | `GET` | Public | Fetches the complete list of church members. |
| `/api/members` | `POST` | Admin / SysAdmin | Saves a new member record to the system. |

### Events & Announcements
| Endpoint | HTTP Method | Access Level | Description / Request Payload |
| :--- | :--- | :--- | :--- |
| `/api/events` | `GET` | Public | Fetches all upcoming church events and announcements. |
| `/api/events` | `POST` | Admin / SysAdmin | Publishes a new event. <br>`{"title": "Youth Conference", "location": "Main Hall", "eventDate": "2026-07-15"}` |
| `/api/events/{id}` | `DELETE` | Admin / SysAdmin | Removes an announcement from the registry. |

### Attendance Metrics
| Endpoint | HTTP Method | Access Level | Description / Request Payload |
| :--- | :--- | :--- | :--- |
| `/api/attendance` | `GET` | Admin / SysAdmin | Retrieves historically logged attendance figures. |
| `/api/attendance` | `POST` | Admin / SysAdmin | Logs weekly metrics. <br>`{"adultCount": 120, "childrenCount": 45, "remarks": "Sunday Service"}` |

---

## 🚀 Future Roadmap: Frontend Integration

Now that the backend is complete, the next phase involves building the user interface using **JavaScript**. The frontend must handle the following workflows:

1. **Token Persistence:** Upon successful login to `/api/auth/login`, store the string token safely in `localStorage` or `sessionStorage`.
2. **Authorized Fetching:** Attach the token to the HTTP headers for any administrative actions:
   ```javascript
   headers: {
     "Authorization": `Bearer ${localStorage.getItem("token")}`,
     "Content-Type": "application/json"
   }