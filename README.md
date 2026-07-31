# Zytex Courses – Complete E-Learning Platform

Hinglish UI • UPI (FamPay) Payment • SEO Friendly • Role-based Auth

**UPI ID:** `7379126375@fam`  
**QR Code:** Already included in `frontend/public/upi-qr.png`

---

## Features

- Email/Password Signup & Login
- Roles: Admin / Instructor / Student
- Clean URLs (`/course/course-name`)
- SEO meta tags ready
- Free + Paid courses
- UPI QR + Transaction ID verification flow (no Razorpay)
- Student progress tracking
- Admin panel to verify payments
- Dummy data for 3 courses

---

## Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | Next.js 14 (App Router) + Tailwind |
| Backend   | Node.js + Express       |
| Database  | MongoDB + Mongoose     |
| Auth      | JWT + bcrypt            |

---

## Quick Start (Local)

### 1. Prerequisites
- Node.js 18+
- MongoDB running locally (or MongoDB Atlas URI)

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env if needed (MongoDB URI etc.)

npm install
npm run seed          # Creates admin + 3 sample courses
npm run dev           # http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev           # http://localhost:3000
```

### Demo Logins

| Role       | Email                 | Password       |
|------------|-----------------------|----------------|
| Admin      | admin@zytex.com       | admin123       |
| Instructor | instructor@zytex.com  | instructor123  |
| Student    | student@zytex.com     | student123     |

---

## Payment Flow (UPI)

1. Student clicks **Enroll Now** on paid course
2. QR code + UPI ID `7379126375@fam` shown
3. Student pays via any UPI app
4. Student pastes **UPI Transaction ID**
5. Admin goes to `/admin` → verifies payment
6. Course automatically unlocked for student

---

## Project Structure

```
zytex-courses/
├── backend/
│   ├── models/          User, Course, Payment
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── seed.js
│   └── server.js
├── frontend/
│   ├── app/
│   │   ├── page.js              Home
│   │   ├── courses/             All courses
│   │   ├── course/[slug]/      Course detail + payment
│   │   ├── auth/login & signup
│   │   ├── dashboard/           My Learning
│   │   └── admin/               Payment verification
│   ├── components/
│   ├── lib/
│   └── public/upi-qr.png        ← Your FamPay QR
└── README.md
```

---

## Deploy

### Backend (Railway / Render)
1. Push code to GitHub
2. Create new Web Service
3. Root directory: `backend`
4. Add environment variables from `.env.example`
5. Start command: `npm start`

### Frontend (Vercel)
1. Import GitHub repo
2. Root directory: `frontend`
3. Environment variable:  
   `NEXT_PUBLIC_API_URL=https://your-backend-url/api`
4. Deploy

### Database
Use **MongoDB Atlas** free tier and put the connection string in backend `.env`.

---

## Adding Your Own Courses & Videos

1. Login as Admin or Instructor
2. Use Postman / Thunder Client to `POST /api/courses`  
   (or build a simple admin form later)
3. For videos: upload to Cloudinary / YouTube / Bunny.net and put the URL in `lessons[].videoUrl`

---

## Notes

- Google OAuth is prepared in backend package but not fully wired (easy to add later).
- Video player is basic – you can replace with Video.js or Plyr.
- All student-facing text is in simple friendly Hinglish.

Made with ❤️ for Zytex Courses
