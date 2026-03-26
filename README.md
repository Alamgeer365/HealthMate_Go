# HealthMate Go

HealthMate Go is a full-stack healthcare booking platform built to streamline how patients discover doctors, book appointments, and manage follow-ups while giving admins and doctors their own operational dashboards.

This project is designed to show product thinking, full-stack execution, and practical system design in one repository. It is not just a UI clone. It includes authentication, multi-role workflows, appointment management, media uploads, AI-assisted support, and a symptom-checker flow.

## Why This Project Stands Out

- Built as a 3-app system: patient app, admin panel, and doctor dashboard
- Covers real operational flows instead of a single landing page demo
- Uses a clean role-based architecture across frontend and backend
- Integrates cloud media storage for doctor/profile images
- Includes AI-assisted website support via Gemini
- Adds a symptom-checker demo with safety disclaimers and escalation guidance
- Organized as a monorepo with separate deployable surfaces

## Product Overview

HealthMate Go solves a common healthcare workflow problem:

- Patients need a simple way to find doctors by specialty and reserve appointments
- Clinics need an internal panel to onboard doctors and monitor bookings
- Doctors need a focused workspace to manage availability, appointments, and profile details

The result is a practical healthcare operations platform with clear separation between consumer experience and internal tooling.

## Applications

### 1. Patient App

The `frontend` application provides the patient-facing experience:

- Browse doctors by specialty
- View doctor profiles and availability
- Register and log in securely
- Book and cancel appointments
- Manage personal profile data
- Review booked appointments
- Use an embedded AI support assistant
- Try a symptom-checker flow that recommends a relevant specialty

### 2. Admin Panel

The `admin` application is built for operational control:

- Admin authentication
- Add new doctors with image upload
- View all registered doctors
- Monitor all appointments
- Toggle doctor availability
- Access platform-level dashboard metrics

### 3. Doctor Dashboard

The same `admin` app also exposes doctor-specific routes and workflows:

- Doctor authentication
- View assigned appointments
- Mark appointments complete
- Cancel appointments when needed
- Update doctor profile information
- Track dashboard-level appointment activity

## Tech Stack

### Frontend

- React 18
- Vite
- React Router
- Axios
- Tailwind CSS
- React Toastify

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Bcrypt password hashing
- Multer file uploads
- Cloudinary media storage
- Gemini API integration

### Project Structure

```text
.
|-- admin/      # Admin + doctor dashboard
|-- backend/    # Express API, database models, auth, business logic
|-- frontend/   # Patient-facing booking app
|-- package.json
`-- README.md
```

## Core Features

### Authentication and Access Control

- User login and registration
- Admin login
- Doctor login
- Protected routes using JWT-based middleware
- Role-specific access boundaries in the API

### Appointment Lifecycle

- Browse doctors
- Select a doctor and book an appointment
- View all booked appointments as a patient
- Cancel appointments
- Monitor appointments in admin and doctor dashboards
- Mark appointments complete from the doctor side

### Doctor Management

- Add doctor profiles from the admin panel
- Upload profile images using Cloudinary
- Enable or disable doctor availability
- Maintain doctor profile details from doctor dashboard

### AI and Smart Support

- AI chatbot endpoint for customer-support-style website questions
- Prompting explicitly avoids medical advice
- Symptom checker demo maps selected symptoms to likely specialty guidance
- Safety disclaimer included for the symptom-check feature

## Architecture Notes

This repository demonstrates a practical product architecture:

- `frontend` handles patient acquisition and appointment actions
- `admin` centralizes internal operations for both admins and doctors
- `backend` exposes role-based REST APIs for all three surfaces
- MongoDB stores users, doctors, and appointments
- Cloudinary manages uploaded images
- Gemini powers the support chatbot

This separation is useful for startups because it mirrors how real products evolve: a customer-facing experience paired with internal operations tooling.

## API Surface

Main route groups:

- `/api/user`
- `/api/doctor`
- `/api/admin`
- `/api/chatbot`
- `/api/symptoms`
- `/api/health`

Example health check:

```http
GET /api/health
```

## Local Setup

### 1. Install dependencies

From the repository root:

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
npm --prefix admin install
```

### 2. Create environment files

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp admin/.env.example admin/.env
```

### 3. Configure environment variables

#### Backend

```env
PORT=4000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-admin-password
CLOUDINARY_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_SECRET_KEY=your-cloudinary-secret
GEMINI_API_KEY=your-gemini-api-key
CURRENCY=INR
```

#### Frontend

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=INR
VITE_CURRENCY_SYMBOL=INR
VITE_RAZORPAY_KEY_ID=your-razorpay-key
VITE_ENABLE_PAYMENTS=false
```

#### Admin

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=INR
```

### 4. Run the applications

Open three terminals:

```bash
npm run dev:backend
npm run dev:frontend
npm run dev:admin
```

Default local URLs:

- Patient app: `http://localhost:5173`
- Admin/Doctor app: `http://localhost:5174`
- API server: `http://localhost:4000`

## Scripts

From the root:

```bash
npm run dev:backend
npm run dev:frontend
npm run dev:admin
npm run build
npm run build:frontend
npm run build:admin
npm run start:backend
```

## Current Scope and Product Honesty

This README intentionally reflects the current codebase instead of overselling the project.

- Payment routes exist in concept but are commented out in the user routes
- The chatbot is configured for support-style responses, not clinical guidance
- The symptom checker is a rule-based demo and should not be treated as diagnosis software
- Production readiness would still require audit logging, stronger validation, test coverage, and healthcare compliance work depending on target market

## What This Project Demonstrates

For hiring teams or startup founders reviewing the repo, this project shows:

- End-to-end feature ownership across frontend, backend, and dashboards
- Ability to structure a multi-role product instead of a single-user demo
- Practical API design and stateful business flows
- Integration of third-party services like Cloudinary and Gemini
- Awareness of product boundaries, feature gating, and safety disclaimers

## Recommended Next Upgrades

Strong next improvements if this project is pushed toward production:

- Add automated tests for booking, auth, and role permissions
- Add deployment links and screenshots/GIF demos
- Add audit logs and activity history
- Add slot management and schedule conflict prevention
- Replace the demo symptom flow with a clinically reviewed triage process
- Add CI/CD and containerized deployment

## License

This project is licensed under the [MIT License](./LICENSE).
