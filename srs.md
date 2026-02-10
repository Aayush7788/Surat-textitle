# Software Requirements Specification

## Surat-Link: Textile Labor Marketplace

##### Version: 1.

##### Date: February 10, 2026

##### Status: Draft

##### Prepared by: [Your Organization]


## Document Control

Version Date Author Changes
1.0 2026-02-10 Development Team Initial Release


## Table of Contents

1. Introduction
2. Overall Description
3. System Features and Requirements
4. External Interface Requirements
5. Non-Functional Requirements
6. System Architecture
7. Data Requirements
8. Security Requirements
9. Quality Attributes
10. Constraints and Assumptions
11. Appendices


## 1. INTRODUCTION

### 1.1 Purpose

This Software Requirements Specification (SRS) document provides a comprehensive description of
the Surat-Link platform - a direct marketplace connecting textile businessmen with skilled workers in
Surat's textile industry. This document is intended for:

- Development teams (frontend, backend, mobile)
- Quality assurance engineers
- Project managers and stakeholders
- System architects
- Third-party integrators

### 1.2 Scope

Product Name: Surat-Link (Textile Labor Marketplace)

Product Vision: Create a direct, transparent connection between textile businessmen and workers,
eliminating information asymmetry and enabling instant job matching.

Core Capabilities:

- Real-time work posting by businessmen
- Location-based work discovery for workers
- One-click job acceptance ('Yes' response)
- Automatic contact detail exchange upon acceptance
- Trust-based rating system
- WhatsApp integration for notifications

Out of Scope (Version 1.0):

- Payroll management
- Attendance tracking
- Fabric procurement
- Machine maintenance


- Training programs
- Labor law compliance tracking

### 1.3 Document Conventions

```
Convention Meaning
SHALL/MUST Mandatory requirement
SHOULD Recommended requirement
MAY Optional requirement
[FR-XXX] Functional Requirement ID
[NFR-XXX] Non-Functional Requirement ID
```

## 2. OVERALL DESCRIPTION

### 2.1 Product Perspective

Market Context:
Surat processes 40% of India's textile production with 500,000+ workers. Current job finding relies on:

- Word-of-mouth and personal networks
- Phone calls to known businessmen
- Physical visits to factories
- No visibility into available opportunities
- Trust issues between businessmen and unknown workers

### 2.2 Product Functions (High-Level)

User Management: Dual-role authentication and profile management
Work Posting: Businessmen post job requirements with detailed specifications
Work Discovery: Workers find relevant opportunities based on location and skills
Direct Connection: One-click 'Yes' response triggers automatic contact exchange
Trust & Reputation: Bidirectional rating system after job completion
Communication: In-app messaging + WhatsApp notifications
Analytics Dashboard: Job posting insights for businessmen

### 2.3 User Classes and Characteristics

#### 2.3.1 Businessman (Manufacturer/Factory Owner)

Technical Proficiency: Low-Medium (comfortable with web forms)
Access: Web dashboard via desktop/tablet
Frequency: Daily during production planning
Primary Goals:

- Fill urgent worker requirements quickly


- Find reliable, skilled workers
- Reduce machine idle time
- Build a network of trusted workers

#### 2.3.2 Worker

Technical Proficiency: Low (primarily mobile users, WhatsApp-native)
Access: Mobile app (Android/iOS)
Frequency: Multiple times daily (job hunting)
Primary Goals:

- Find consistent work opportunities
- Discover better-paying jobs
- Work in nearby locations (reduce commute)
- Build reputation for stable employment


## 3. SYSTEM FEATURES AND REQUIREMENTS

### 3.1 User Management

#### 3.1.1 Businessman Registration [FR-001]

Description: Businessmen SHALL register via web portal with business verification.

Functional Requirements:
[FR-001-1] System SHALL provide registration form with fields: Full Name, Business Name, GST
Number (optional), Email, Mobile Number, Factory Address, Cluster Location, Business Type
[FR-001-2] System SHALL send OTP to mobile number for verification
[FR-001-3] System SHOULD verify GST number via Government API if provided
[FR-001-4] System SHALL create businessman profile upon successful verification
[FR-001-5] System SHALL auto-reject suspicious registrations (duplicate GST, flagged phone
numbers)
Priority: HIGH

#### 3.1.2 Worker Registration [FR-002]

Description: Workers SHALL register via mobile app with skill profile.

Functional Requirements:
[FR-002-1] System SHALL allow mobile OTP-based registration
[FR-002-2] System SHALL collect: Full Name, Mobile Number, WhatsApp Number, Current Location,
Skills, Experience Level, Languages Known
[FR-002-3] System SHALL allow profile photo upload (optional)
[FR-002-4] System SHALL create worker profile immediately (low-friction onboarding)
[FR-002-5] System MAY verify worker via businessman referral in future
Priority: HIGH


### 3.2 Work Posting (Businessman)

#### 3.2.1 Create Work Post [FR-003]

Description: Businessmen SHALL post work requirements with detailed specifications.

Work Post Fields:

```
Field Type Validation Example
Work Title Text Max 100 chars Water-Jet Operators Needed
Machine Type Dropdown Required Rapier/Water-Jet/Air-Jet
Fabric Type Dropdown Required Saree/Dress Material/Suiting
Number of Workers Integer 1-50 3
Rate per Meter Currency INR, min n0.50 n3.
Shift Timing Radio Day/Night/Both Day (8 AM - 6 PM)
Work Duration Date Range Min 1 day 2026-02-15 to 2026-03-
Experience Required Dropdown 0-1/1-3/3-5/5+ years 1-3 years
```
Additional Requirements:
[FR-003-2] System SHALL calculate estimated daily earning
[FR-003-3] System SHALL allow attaching fabric sample image (max 5MB)
[FR-003-4] System SHALL auto-expire posts after 7 days if no workers respond
[FR-003-5] System SHALL allow editing posts until first worker responds
Priority: HIGH
Business Rule [BR-001]: Rate must align with market standards (n1.50 - n10.00/meter)


### 3.3 Work Discovery (Worker)

#### 3.3.1 Browse Work Opportunities [FR-005]

Description: Workers SHALL discover work posts via location and skill-based feed.

Post Ranking Algorithm:

1. Posts matching worker's exact skills (within 5 km)
2. Posts in worker's preferred clusters
3. Recent posts (posted < 24 hours)
4. Highest paying posts
5. Posts from highly-rated businessmen

Filter Options:

- Machine Type (matching worker's skills)
- Distance (2 km / 5 km / 10 km / 15 km)
- Rate Range (slider: n1 - n10/meter)
- Shift Preference (Day/Night/Flexible)
- Experience Level
- Work Duration (1-7 days / 1-4 weeks / 1+ months)

Work Card Display Elements:

- Business Name with Rating (H 4.2/5.0)
- Machine Type + Fabric Type
- Rate per Meter (prominently displayed)
- Number of Workers Needed
- Distance from Worker (e.g., '2.3 km away')
- Work Duration
- Time Posted (e.g., '2 hours ago')
- Prominent [YES] button
Priority: HIGH


### 3.4 Work Acceptance Flow

#### 3.4.1 Worker Response [FR-007]

Description: Workers SHALL respond to work posts with one-click 'Yes' action.

Response Flow:
Step 1: Worker clicks 'YES' button
Step 2: System shows confirmation dialog with contact preview
Step 3: Worker confirms interest
Step 4: System creates response record
Step 5: System shares contact details bidirectionally
Step 6: System sends simultaneous notifications to both parties
Step 7: Both users receive contact information

Contact Details Shared:

```
To Businessman To Worker
Worker Full Name Business Name
Mobile Number Businessman Name
WhatsApp Number Mobile Number
Skills and Experience WhatsApp Number
Overall Rating Factory Address with Map
Profile Photo Overall Rating
```
Priority: HIGH
Business Rule [BR-002]: Contact exchange is permanent and cannot be revoked once shared


## 4. EXTERNAL INTERFACE REQUIREMENTS

### 4.1 User Interfaces

#### 4.1.1 Web Application (Businessman)

Dashboard Layout:

- Top Navigation: Logo, Post Work, My Posts, Workers, Profile
- Main Content: Work post cards in grid (3 columns desktop, 2 tablet, 1 mobile)
- Sidebar: Notifications, Quick Stats, Recent Responses

Accessibility:

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatible (ARIA labels)
- High contrast mode

#### 4.1.2 Mobile Application (Worker)

Bottom Navigation:

- Work (home feed)
- My Responses
- Messages
- Profile

Offline Mode:

- Cache last 100 viewed posts
- Show 'Offline - Showing Cached Posts' banner
- Queue 'Yes' responses for sending when online
- Auto-sync when connection restored


### 4.3 Software Interfaces

```
Interface Purpose Integration Method
SMS Gateway
(Twilio/MSG91)
```
```
OTP delivery for authentication REST API
```
```
GST Verification API Verify businessman GST numbers Government API
Google Maps API Geocoding, distance calculation,
embedded maps
```
```
JavaScript SDK
```
```
WhatsApp Business API Notifications and alerts (Phase 2) REST API
Payment Gateway
(Razorpay)
```
```
Payment processing (Phase 3) REST API
```

## 5. NON-FUNCTIONAL REQUIREMENTS

### 5.1 Performance Requirements

[NFR-001] Response Time: API response < 500ms (90th percentile), Work feed load < 1 second, 'Yes'
response submission < 2 seconds
[NFR-002] Throughput: Support 1,000 concurrent users (Phase 1), Scale to 10,000 (Phase 2), Handle
50,000 work posts/month, Process 200,000 'Yes' responses/month
[NFR-003] Database Queries: Work listing query < 200ms, Worker search < 300ms, Rating
calculation < 100ms

### 5.2 Safety Requirements

[NFR-004] Data Backup: Automated backups every 6 hours, 90-day retention, Point-in-time recovery
(within 5 minutes)
[NFR-005] Failover: Database replication (primary + 2 replicas), Auto-failover if primary fails (< 30
seconds)
[NFR-006] Error Handling: Graceful degradation, User-friendly error messages, Auto-retry for
transient failures

### 5.3 Security Requirements

[NFR-007] Authentication: JWT-based session management, Token expiry: 7 days (web), 30 days
(mobile), OTP expiry: 10 minutes
[NFR-008] Authorization: Role-based access control (Businessman vs Worker), Workers cannot
create posts, Businessmen cannot respond to posts
[NFR-009] Data Encryption: In-transit: TLS 1.3, At-rest: AES-256 for PII
[NFR-010] Privacy: Contact details only shared after 'Yes' response, Phone numbers masked in public
views
[NFR-011] Rate Limiting: Max 100 API requests/minute per user, Max 5 OTP requests/hour per
phone, Max 50 'Yes' responses per day per worker


### 5.4 Software Quality Attributes

#### 5.4.1 Reliability

[NFR-013] Uptime: 99.5% uptime (monthly), Max 4 hours downtime/month
[NFR-014] MTBF: Server crashes < 1 per month, App crashes < 0.1% of sessions
[NFR-015] MTTR: Critical bugs < 2 hours, High priority < 24 hours, Medium priority < 1 week

#### 5.4.3 Maintainability

[NFR-018] Code Quality: Unit test coverage ≥ 70%, Integration test coverage ≥ 50%, ESLint/Prettier
for formatting
[NFR-019] Documentation: API documentation (Swagger), Inline code comments, README files,
Deployment runbook

#### 5.4.4 Scalability

[NFR-021] Horizontal Scaling: Stateless API design, Load balancer (NGINX/AWS ALB), Auto-scaling
groups
[NFR-022] Database Scaling: MongoDB sharding for > 1M posts, Read replicas for analytics

#### 5.4.5 Usability

[NFR-023] Onboarding: Businessman completes first post < 5 minutes, Worker completes registration
< 2 minutes
[NFR-024] Localization: Support Gujarati (primary), Hindi, English. Date format: DD/MM/YYYY,
Currency: n (INR)
[NFR-025] Help & Support: In-app FAQ, WhatsApp support, Response time < 24 hours


## 6. SYSTEM ARCHITECTURE

### 6.1 Architectural Overview

Architecture Style: Monolithic (Phase 1) → Microservices (Phase 3)

Rationale: Monolithic for faster MVP development, simpler deployment and debugging. Migrate to
microservices at 10,000+ active users.

### 6.3 Technology Stack

```
Layer Technology Justification
Frontend (Web) React 18 + Vite Fast dev experience, modern hooks
Frontend (Mobile) React Native + Expo Code reuse, rapid prototyping
Backend Node.js 18 + Express JavaScript full-stack, large ecosystem
Database MongoDB 6.0 Flexible schema, handles denormalization
Caching Redis 7.0 Fast session storage, post feed caching
File Storage AWS S3 / Cloudinary Scalable image hosting
Real-time Socket.io WebSocket for live updates
Authentication JWT + bcrypt Industry standard, stateless
Maps Google Maps API Accurate geocoding
Push Notifications Firebase Cloud Messaging Cross-platform, reliable
Testing Jest + React Testing Library Unit + integration tests
Deployment Docker + AWS ECS/Fargate Containerized, auto-scaling
Monitoring Sentry + Datadog Production observability
```

### 6.4 API Design Standards

Base URL: https://api.suratlink.com/v

Method Endpoint Description Auth
POST /auth/register User registration No
POST /auth/login User login (OTP) No
POST /auth/verify-otp Verify OTP and get token No
GET /profile Get own profile Yes
PUT /profile Update profile Yes
POST /work-posts Create work post Yes (B)
GET /work-posts List work posts (with filters) Yes
GET /work-posts/:id Get work post details Yes
POST /work-posts/:id/respond Worker says 'Yes' Yes (W)
GET /work-posts/:id/responses Get interested workers Yes (B)
POST /ratings Submit rating Yes
GET /ratings/:user_id Get user's ratings Yes
Note: (B) = Businessman only, (W) = Worker only


## 7. DATA REQUIREMENTS

### 7.1 Logical Data Model

#### 7.1.1 Users Collection

Key Fields:

- _id: ObjectId
- role: 'businessman' | 'worker'
- phone: String (unique)
- email: String (optional)
- name: String
- business_name: String (for businessmen)
- gst_number: String (optional)
- skills: Array (for workers)
- location: Object {address, cluster, coordinates}
- rating: Object {overall, count, breakdown}
- verification: Object {gst_verified, badges}
- created_at, updated_at: ISODate

#### 7.1.2 Work Posts Collection

Key Fields:

- _id: ObjectId
- businessman_id: ObjectId (reference to users)
- title: String
- machine_type: String
- fabric_type: String
- worker_count: Integer
- rate_per_meter: Decimal
- shift: String
- duration: Object {start_date, end_date}


- location: Object {cluster, coordinates}
- status: 'active' | 'filled' | 'expired' | 'closed'
- views_count, response_count: Integer
- created_at, updated_at, expires_at: ISODate

#### 7.1.3 Responses Collection

Key Fields:

- _id: ObjectId
- post_id: ObjectId (reference to work_posts)
- worker_id: ObjectId (reference to users)
- businessman_id: ObjectId
- worker_contact: Object {name, phone, whatsapp, skills, rating}
- businessman_contact: Object {name, business_name, phone, address}
- status: 'contacted' | 'working' | 'completed'
- responded_at: ISODate


### 7.2 Data Dictionary

```
Entity Attribute Type Constraints Description
User phone String Unique, Regex pattern Primary identifier
User gst_number String Optional, 15-char format GST verification
User role Enum businessman | worker User type
Work Post rate_per_meter Decimal Min: 1.50, Max: 10.00 Rate in INR
Work Post worker_count Integer Min: 1, Max: 50 Workers needed
Work Post status Enum active, filled, expired, closedPost lifecycle
Rating scores Object Each criterion: 1-5 Rating breakdown
```
### 7.4 Data Retention Policy

[DATA-001] Work Posts: Active posts retained indefinitely, Filled/Expired posts retained for 1 year,
Archived after 1 year
[DATA-002] User Data: Active users retained indefinitely, Inactive users (no login for 2 years) soft
deleted with 30-day recovery
[DATA-003] Responses: All responses retained for 2 years (connections history)
[DATA-004] Ratings: Retained indefinitely (core trust data)
[DATA-005] Messages: Retained for 60 days after connection, then auto-deleted (GDPR)
[DATA-006] Images: Profile photos retained while account active, Fabric samples retained for 90 days
post-expiry


## 8. SECURITY REQUIREMENTS

### 8.1 Authentication Flow

OTP-Based Authentication:

1. User enters phone number
2. System sends 6-digit OTP via SMS (10-minute expiry)
3. User enters OTP
4. System verifies OTP
5. System issues JWT token (7-day expiry for web, 30-day for mobile)
6. Token stored securely (httpOnly cookie for web, secure storage for mobile)

OTP Security Measures:

- Max 5 attempts per phone per hour
- After 5 failed attempts: 1-hour lockout
- Rate limiting on OTP generation endpoint

### 8.2 Authorization Matrix

```
Resource Businessman Worker Admin
Create Work Post 3 7 3
View Work Posts 3 3 3
Respond to Post ('Yes') 7 3 7
View Responses 3 (own posts) 7 3
Rate User 3 3 3
View Contact Details 3 (after connection) 3 (after connection) 3
Export Data 3 (own) 3 (own) 3 (all)
```

### 8.3 Data Privacy (GDPR/DPDPA Compliance)

[SEC-001] Consent: Explicit consent for phone number usage (registration form), Consent for
WhatsApp notifications (opt-in checkbox), Consent for location access
[SEC-002] Right to Access: Users can download their data (JSON export via API)
[SEC-003] Right to Deletion: Users can request account deletion, Contact details in existing
connections anonymized, 30-day grace period before permanent deletion
[SEC-004] Data Minimization: Collect only essential data, No device fingerprinting, No tracking pixels
[SEC-005] Contact Detail Protection: Phone numbers never exposed in public API responses,
Shared only after explicit 'Yes' response, Cannot be scraped or bulk-exported

### 8.4 Security Testing

[SEC-006] Annual third-party security audit
[SEC-007] Quarterly vulnerability scans (OWASP Top 10)


## 9. QUALITY ATTRIBUTES

### 9.1 Testability

Unit Tests: All service functions (70% coverage minimum), Jest framework
Integration Tests: API endpoints (happy path + error cases), Critical flows tested
End-to-End Tests: Cypress for web app, Detox for mobile app
Performance Tests: Load testing with 1,000 concurrent users (Apache JMeter / k6)

### 9.2 Monitoring and Logging

[MON-001] Error Tracking: Sentry for frontend + backend errors, Alert on > 20 errors/minute
[MON-002] Performance Monitoring: Datadog APM for API response times, Alert on p95 latency > 1
second
[MON-003] Uptime Monitoring: Pingdom / UptimeRobot for endpoint health, Alert on downtime > 5
minutes
[MON-004] Logs: Structured JSON logs (Winston library), 30-day retention in Elasticsearch, PII
redaction in logs
[MON-005] Business Metrics: Daily active users (DAU), Posts created per day, Response rate,
Connection rate, Rating completion rate


## 10. CONSTRAINTS AND ASSUMPTIONS

### 10.1 Technical Constraints

[CON-001] WhatsApp Business API requires Facebook Business verification (3-6 weeks), Costs
n0.40-1.00 per notification
[CON-002] GST Verification API free tier: 500 calls/day, Paid tier required for high-volume
[CON-003] Mobile app size must be < 15 MB (worker network constraints)
[CON-004] Budget: Phase 1 development n15-20 lakh, Monthly operational cost n30,000-50,000
[CON-005] Google Maps API costs: $5 per 1,000 requests (geocoding + distance matrix)

### 10.2 Assumptions

[ASM-001] User Device: Workers have smartphones (Android 8+ or iOS 13+), Businessmen have
desktop/laptop or tablet
[ASM-002] Market: Surat textile industry operates 6 days/week, Average work duration 15-30 days,
Workers willing to commute up to 15 km
[ASM-003] User Behavior: Workers check app 2-3 times daily, Businessmen check web dashboard
1-2 times daily, Both parties will rate after work completion
[ASM-004] Trust Building: Initial cold start problem (no ratings), Takes 3-6 months to build trust
network


## 11. APPENDICES

### Appendix B: Glossary

```
Term Definition
Businessman Factory owner or manager who posts work requirements
Worker Skilled textile laborer seeking work opportunities
Cluster Industrial zone in Surat (e.g., Pandesara, Sachin, Udhna)
Work Post Job requirement posted by businessman
Response Worker's 'Yes' action indicating interest
Connection Established link between businessman and worker after response
Rate per Meter Payment per meter of fabric produced (INR)
Rapier Loom Weaving machine using rapier rods
Water-Jet Loom High-speed weaving machine using water jets
GST Goods and Services Tax (Indian business tax ID)
OTP One-Time Password for authentication
GIDC Gujarat Industrial Development Corporation
```

### Appendix C: Acronyms

```
Acronym Full Form
SRS Software Requirements Specification
MERN MongoDB, Express, React, Node.js
API Application Programming Interface
JWT JSON Web Token
OTP One-Time Password
GST Goods and Services Tax
SMS Short Message Service
PWA Progressive Web App
WCAG Web Content Accessibility Guidelines
GDPR General Data Protection Regulation
DPDPA Digital Personal Data Protection Act (India)
AWS Amazon Web Services
CDN Content Delivery Network
TLS Transport Layer Security
```

## Document Approval

```
Role Name Signature Date
Product Owner [Name] _____________ ______
Technical Lead [Name] _____________ ______
QA Manager [Name] _____________ ______
Business Stakeholder [Name] _____________ ______
```
### --- END OF DOCUMENT ---


