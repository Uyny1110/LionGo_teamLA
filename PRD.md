# Product Requirements Document: Lion Smart Itinerary Manager

## 1. Executive Summary
The **Lion Smart Itinerary Manager** is a B2C web application designed to bridge the gap between digital DIY travel planning and Lion Travel's premium offline agency services. By leveraging a "Phygital" strategy, the app allows users to curate trips using Lion's extensive inventory, collaborate with travel companions, and seamlessly transition their draft itineraries into professional bookings handled by sales agents.

## 2. Detailed Feature Specifications

### 2.1 Authentication (Order Auth Code)
*   **User Story**: As a customer, I want to log in using a specific code provided by my booking confirmation or marketing campaign so that I can access my personalized trip dashboard.
*   **Logic**:
    *   Input: Alphanumeric code (e.g., "LION-2024-X9Y").
    *   System Validation: Check against ERP Mock.
    *   Success: Load `TripContext` (Destination: Kyoto, Dates: 2024-11-10 to 2024-11-15).
*   **UI**: Minimalist centered card, branded background.

### 2.2 Discovery Module
*   **User Story**: As a planner, I want to browse travel components (Hotels, Spots, Transport) categorized by type and tags.
*   **UI**: 2-tier navigation (Tabs for Category -> Pills for Tags).
*   **Data**: `id`, `name`, `type`, `price`, `image`, `tags`, `lat`, `lng`.

### 2.3 Itinerary Management
*   **User Story**: As a user, I want to add items to a timeline and see the route calculated.
*   **Functionality**: Add/Remove items, Reorder (Up/Down), Map visualization (Mocked).

### 2.4 Dynamic Budgeting
*   **User Story**: As I plan, I want to see the estimated total cost update in real-time.
*   **Logic**: `Total = Sum(Item.price * Headcount)`.

### 2.5 AI Support Agent (Gemini Powered)
*   **User Story**: I want to ask questions about weather or packing and get instant answers.
*   **Tech**: Google Gemini API (`gemini-2.5-flash`).
*   **Features**: General QA, Smart Packing List generation.

### 2.6 Submission & Sales Handoff (O2O)
*   **User Story**: When I am happy with the plan, I want to submit it to a Lion agent for booking.
*   **State Transition**: `DRAFT` -> `SUBMITTED`.
*   **Logic**: Locks editing, triggers notification to Sales Dashboard (Simulated).

## 3. Database Schema Logic (Itinerary Lifecycle)
1.  **DRAFT**: Editable by user. Budget is indicative.
2.  **SUBMITTED**: Locked for user. Visible to Agent.
3.  **PROCESSING**: Agent is verifying availability.
4.  **CONFIRMED**: Payment received. E-Vouchers generated.
5.  **COMPLETED**: Trip ended.

## 4. Prioritization Matrix
*   **P0 (MVP)**: Auth, Discovery, Itinerary Builder, Budgeting, Submission.
*   **P1**: AI Agent, Collaborative Sync (WebSocket), Weather Alerts.
*   **P2**: Split the Bill, Footprint Video, Souvenir Pre-order.

## 5. Technical Stack
*   **Frontend**: React 18, TypeScript, Tailwind CSS.
*   **AI**: Google GenAI SDK (`@google/genai`).
*   **Maps**: Google Maps JS API (Mocked for prototype).
*   **State**: React Context API.

## 6. Success Metrics
*   **Conversion Rate**: % of "Draft" itineraries that reach "Submitted" status.
*   **Agent Efficiency**: Reduction in time spent per custom quote.
*   **User Engagement**: Average session time during planning phase.
