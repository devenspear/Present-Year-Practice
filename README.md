# Present Year Practice

A 12-month transformational journey web application inspired by mortality awareness, mindfulness, and the profound question: **"If this were your last year, how would you live?"**

## Overview

Present Year Practice guides individuals through a structured yet flexible path toward living with greater presence, purpose, and peace. Each month focuses on a different theme—from embracing mortality to living fully—building upon the previous to create lasting change.

## Live Demo

**[https://pyp.deven.network](https://pyp.deven.network)**

(also available at [https://present-year-practice.vercel.app](https://present-year-practice.vercel.app))

## Features

### Current Features

- **12-Month Module System** - Structured journey with weekly practices and reflections
- **Dashboard** - Daily inspiration quotes, progress tracking, streak counters
- **Journal** - Write entries with mood tracking, tags, and privacy settings
- **Legacy Vault** - Store letters and memories for loved ones
- **Forgiveness Letter Builder** - Guided 4-step process for writing forgiveness letters
- **Service Projects** - Track volunteer work with task lists and reflections
- **Meeting Toolkit** - Timer, talking stick queue, agenda templates for group sessions
- **Onboarding Flow** - Path selection (Individual/Group/Hybrid), goal setting
- **Calendar Integration** - ICS file generation for events
- **Export Options** - Journal export to TXT/PDF

### Design

- Warm, life-coach inspired color palette (earth tones, sage, terracotta)
- Light mode only for a calm, reflective experience
- Serif typography for headings
- Soft shadows and rounded corners
- Nature-inspired logo

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **State**: Local Storage (client-side persistence)
- **Language**: TypeScript

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Outstanding Features (Roadmap)

### High Priority - Core Functionality

- [ ] **Mark Practice Complete** - Dashboard button needs functionality to track daily practice completion
- [ ] **Download Workbook PDFs** - Create actual PDF workbooks for each month (`/pdfs/month1-workbook.pdf`, etc.)
- [ ] **Audio/Video Assets** - Implement guided meditations and videos referenced in modules
- [ ] **Add to Calendar Integration** - Connect "Add to Calendar" buttons to actual calendar APIs

### Medium Priority - User Experience

- [ ] **Module Detail Page Styling** - Update `/modules/[month]` to match new design system
- [ ] **Streak Tracking Logic** - Implement presence streak increment based on user activity
- [ ] **Custom Meeting Agenda Builder** - Allow users to create custom meeting structures
- [ ] **Contact Form Backend** - Connect contact form to email service
- [ ] **Pricing/Payment Integration** - Add Stripe or similar for paid tiers

### Lower Priority - Enhancements

- [ ] **Push Notifications** - Implement actual reminder notifications at user's chosen time
- [ ] **Group/Cohort Features** - Community features for group path users
- [ ] **Facilitator Guide PDF** - Create downloadable guide for meeting facilitators
- [ ] **Print Check-in Sheet** - Generate printable check-in sheets for in-person meetings
- [ ] **Safety Guidelines Content** - Add comprehensive safety guidelines page

### Backend/Infrastructure

- [ ] **User Authentication** - Replace localStorage with proper auth (NextAuth, Clerk, etc.)
- [ ] **Cloud Database** - Migrate from localStorage to cloud storage (Supabase, Firebase, etc.)
- [ ] **PDF Export Improvements** - Better formatting and styling for exported documents
- [ ] **Analytics** - Track user engagement and progress metrics

---

## 12-Month Journey Themes

| Month | Theme | Focus |
|-------|-------|-------|
| 1 | Embrace Mortality | Name fears; set intentions |
| 2 | Live Present | Develop presence habits |
| 3 | Letting Go | Declutter life |
| 4 | Forgiveness | Reduce resentments |
| 5 | Relationships | Strengthen bonds |
| 6 | Gratitude | Savor daily life |
| 7 | Legacy | Define impact |
| 8 | Face Fears | Build courage |
| 9 | Spirituality | Connect deeper |
| 10 | Acceptance | Surrender & peace |
| 11 | Prepare Practically | End-of-life basics |
| 12 | Live Fully | Integrate & celebrate |

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR for any improvements.
