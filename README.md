# Job Tracker

A full-stack job application tracking tool built with Laravel and Vue.js.
Helps developers and job seekers manage and monitor their job applications
in one place.

---

## Tech Stack

**Backend**
- PHP 8 / Laravel 11
- MySQL / MariaDB
- RESTful API

## Features

### Current
- Create, view, update and delete job applications
- Track application status (Applied, Interview, Offer, Rejected)
- RESTful API with validation and error handling
- Shaped API responses via API Resources

### Planned
- User authentication (Laravel Sanctum)
- Filter and search applications
- Pagination
- Dashboard with application statistics
- Responsive UI with Tailwind CSS

---

## Getting Started

### Prerequisites
- PHP 8+
- Composer
- Node.js & npm
- MySQL / MariaDB

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications` | List all applications |
| POST | `/api/applications` | Create an application |
| GET | `/api/applications/{id}` | Get a single application |
| PUT | `/api/applications/{id}` | Update an application |
| DELETE | `/api/applications/{id}` | Delete an application |

---

## Seeding

To reset and reseed the database with fake data:
```bash
php artisan migrate:fresh --seed
```
This creates 1 user and 10 sample applications.

---