# Software Requirement Specification (SRS)
## Project: Surat-Link (Textile Labor OS)

### 1. Introduction
**Purpose:** Connect Surat textile manufacturers with labor contractors (Thekedars).
**Core Problem:** Information asymmetry. Manufacturers have idle machines; Contractors have idle labor.

### 2. User Personas
*   **Manufacturer (Admin/Web):** Posts requirements (e.g., "Need 50 Water-Jet Loom Workers").
*   **Contractor (Mobile/WhatsApp):** Bids on requirements. Manages workforce.
*   **Worker (Passenger):** Passive entity managed by the Contractor.

### 3. Functional Requirements
#### 3.1 Authentication
*   **Manufacturer:** Email/Phone OTP (GST Verification optional).
*   **Contractor:** Mobile OTP.

#### 3.2 Job Posting (Manufacturer)
*   **Fields:** Machine Type (Rapier/Water-Jet), Fabric Type (Saree/Dress), Rate per Meter (Taka), Shift (Day/Night).
*   **Location:** Cluster Mapping (Pandesara, Sachin, Udhna).

#### 3.3 Bidding System (Contractor)
*   **View:** List of active jobs in nearby clusters.
*   **Action:** "Apply" with available headcount.

#### 3.4 Verification (Trust Layer)
*   **Rating System:** Manufacturers rate Contractors on "Punctuality" and "Quality".

### 4. Technical Architecture (MERN)
*   **Frontend:** React (Admin Dashboard) + React Native (Contractor App).
*   **Backend:** Node.js + Express.
*   **Database:** MongoDB.
    *   `Users` (Role: Manufacturer/Contractor)
    *   `Jobs` (Status: Open/Closed)
    *   `Bids` (Status: Pending/Accepted)

### 5. Roadmap
*   **Phase 1:** Web Portal for Manufacturers.
*   **Phase 2:** WhatsApp Bot for Contractors (to remove app friction).
*   **Phase 3:** Payment Escrow.
