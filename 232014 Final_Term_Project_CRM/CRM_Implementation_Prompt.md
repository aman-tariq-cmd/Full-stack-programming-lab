# Implementation Prompt
## Project: CRM System — Customer Relationship Management
### Air University | Full Stack Programming Lab | BSSE VI-B | Spring 2026

---

## Project Context

You are implementing a full-stack **Customer Relationship Management (CRM) System** from scratch. The Figma design has already been completed and approved. Your job is to translate that design into a fully functional, production-ready application.

Implement the system following all specifications below. Do not deviate from the defined stack. Every module must be completed in the order listed.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Authentication | JWT (JSON Web Tokens), bcryptjs |
| PDF Generation | jsPDF or pdfmake (client-side) |
| Notifications | react-hot-toast |
| HTTP Client | Axios |
| Icons | Lucide React |

---

## Project Structure

```
Full-Stack-Programming-Lab/
└── Final_Term_Project_CRM/
    ├── client/                         # Next.js frontend
    │   ├── app/
    │   │   ├── (auth)/
    │   │   │   ├── login/page.jsx
    │   │   │   └── register/page.jsx
    │   │   ├── dashboard/
    │   │   │   ├── page.jsx
    │   │   │   ├── customers/
    │   │   │   │   ├── page.jsx
    │   │   │   │   ├── add/page.jsx
    │   │   │   │   └── [id]/
    │   │   │   │       ├── page.jsx
    │   │   │   │       └── edit/page.jsx
    │   │   │   ├── invoices/
    │   │   │   │   ├── page.jsx
    │   │   │   │   └── generate/page.jsx
    │   │   │   └── layout.jsx          # Protected layout with sidebar
    │   │   └── layout.jsx              # Root layout
    │   ├── components/
    │   │   ├── ui/                     # Reusable UI primitives
    │   │   ├── layout/                 # Sidebar, Navbar
    │   │   ├── customers/              # Customer-specific components
    │   │   ├── invoices/               # Invoice components
    │   │   ├── chatbot/                # Chatbot component
    │   │   └── notifications/          # Notification panel
    │   ├── lib/
    │   │   ├── axios.js                # Axios instance with interceptors
    │   │   └── auth.js                 # Token helpers
    │   └── middleware.js               # Next.js route protection middleware
    │
    └── server/                         # Express backend
        ├── config/
        │   └── db.js                   # MongoDB connection
        ├── controllers/
        │   ├── authController.js
        │   ├── customerController.js
        │   └── invoiceController.js
        ├── middleware/
        │   └── authMiddleware.js       # JWT verification middleware
        ├── models/
        │   ├── User.js
        │   ├── Customer.js
        │   └── Invoice.js
        ├── routes/
        │   ├── authRoutes.js
        │   ├── customerRoutes.js
        │   └── invoiceRoutes.js
        └── server.js
```

---

## Module I: Authentication System

### Backend

**Model — `server/models/User.js`**

Define a Mongoose schema with:
- `name`: String, required, trimmed
- `email`: String, required, unique, lowercase, trimmed
- `password`: String, required, minlength 6
- `createdAt`: Date, default `Date.now`

Before saving, hash the password using `bcryptjs` with salt rounds of 10 inside a `pre('save')` hook.

Add an instance method `matchPassword(enteredPassword)` that uses `bcrypt.compare` and returns a boolean.

**Controller — `server/controllers/authController.js`**

Implement two exported async functions:

`registerUser(req, res)`:
- Extract `name`, `email`, `password` from `req.body`
- Check if a user with that email already exists; if so, return `400` with `{ message: "User already exists" }`
- Create the user via `User.create(...)`
- Generate a JWT signed with `process.env.JWT_SECRET`, expiry `7d`
- Return `201` with `{ _id, name, email, token }`

`loginUser(req, res)`:
- Extract `email`, `password` from `req.body`
- Find user by email; if not found or password does not match, return `401` with `{ message: "Invalid credentials" }`
- Generate a JWT (same as above)
- Return `200` with `{ _id, name, email, token }`

**Middleware — `server/middleware/authMiddleware.js`**

Export `protect` async middleware:
- Read the `Authorization` header; expect format `Bearer <token>`
- If missing or malformed, return `401 { message: "Not authorized, no token" }`
- Verify the token using `jwt.verify` and `process.env.JWT_SECRET`
- Attach the decoded user (minus password) to `req.user`
- If verification fails, return `401 { message: "Not authorized, token failed" }`

**Routes — `server/routes/authRoutes.js`**

```
POST /api/auth/register  → registerUser
POST /api/auth/login     → loginUser
```

### Frontend

**Registration Page — `client/app/(auth)/register/page.jsx`**

- Client component
- Controlled form with fields: Full Name, Email, Password, Confirm Password
- Validate on submit:
  - All fields required
  - Email must be valid format
  - Password minimum 6 characters
  - Passwords must match
- On valid submit, call `POST /api/auth/register` via Axios
- On success: store token in `localStorage` as `crm_token`, redirect to `/dashboard`
- On error: display the server error message inline below the form
- Show loading spinner on the button while request is in flight

**Login Page — `client/app/(auth)/login/page.jsx`**

- Same pattern as registration
- Fields: Email, Password
- On success: store token, redirect to `/dashboard`
- On error: show "Invalid email or password" inline

**Route Protection — `client/middleware.js`**

Use Next.js middleware to:
- Redirect unauthenticated users away from `/dashboard/*` routes to `/login`
- Redirect authenticated users away from `/login` and `/register` to `/dashboard`
- Read the token from `localStorage` is not available in middleware; instead use a cookie. Store the token in both `localStorage` AND an `HttpOnly`-safe cookie named `crm_token` on login/register. The middleware reads the cookie.

**Axios Instance — `client/lib/axios.js`**

Create an Axios instance with `baseURL: process.env.NEXT_PUBLIC_API_URL`. Add a request interceptor that reads the token from `localStorage` and attaches it as `Authorization: Bearer <token>` to every outgoing request.

---

## Module II: Customer Management System

### Backend

**Model — `server/models/Customer.js`**

Mongoose schema fields:
- `name`: String, required, trimmed
- `email`: String, required, trimmed
- `phone`: String, required
- `company`: String, trimmed
- `address`: String, trimmed
- `status`: String, enum `['Lead', 'Active', 'Inactive']`, default `'Lead'`
- `notes`: String
- `createdBy`: ObjectId ref `'User'`, required (to scope customers per user)
- `createdAt`: Date, default `Date.now`
- `updatedAt`: Date, default `Date.now`

**Controller — `server/controllers/customerController.js`**

Implement these exported async functions, all behind the `protect` middleware. All queries must scope to `req.user._id` using `createdBy` field.

`getCustomers(req, res)`:
- Support optional query params: `search` (name contains, case-insensitive) and `status` (exact match)
- Return `200` with array of customers, sorted by `createdAt` descending

`createCustomer(req, res)`:
- Validate required fields server-side: `name`, `email`, `phone`, `status`
- Create customer with `createdBy: req.user._id`
- Return `201` with the created customer object

`getCustomerById(req, res)`:
- Find by `req.params.id` and `createdBy: req.user._id`
- If not found, return `404 { message: "Customer not found" }`
- Return `200` with customer object

`updateCustomer(req, res)`:
- Find by id and `createdBy`; if not found return `404`
- Update all provided fields; also set `updatedAt: Date.now()`
- Return `200` with updated customer

`deleteCustomer(req, res)`:
- Find by id and `createdBy`; if not found return `404`
- Delete with `.deleteOne()`
- Return `200 { message: "Customer removed" }`

**Routes — `server/routes/customerRoutes.js`**

All routes protected with `protect` middleware:
```
GET    /api/customers          → getCustomers
POST   /api/customers          → createCustomer
GET    /api/customers/:id      → getCustomerById
PUT    /api/customers/:id      → updateCustomer
DELETE /api/customers/:id      → deleteCustomer
```

### Data Seeding

Create a script `server/seed.js` that:
- Connects to MongoDB
- Creates one test user (email: `admin@crm.com`, password: `admin123`)
- Inserts exactly 15 customer records with varied names, emails, phone numbers, companies, statuses (mix of Lead / Active / Inactive), and realistic addresses
- Logs success and disconnects

Run with: `node server/seed.js`

### Frontend

**Customer List Page — `client/app/dashboard/customers/page.jsx`**

- On mount, fetch all customers via `GET /api/customers`
- Render a full-width table with columns: #, Name, Email, Phone, Company, Status, Date Added, Actions
- Status column renders a color-coded badge (Lead = yellow, Active = green, Inactive = gray)
- Actions column has Edit (pencil icon, navigates to edit page) and Delete (trash icon, triggers confirm modal)
- Search bar above table: controlled input that calls `GET /api/customers?search=<value>` with 300ms debounce
- Status filter dropdown: calls `GET /api/customers?status=<value>` on change
- Both search and filter can be combined: `GET /api/customers?search=<value>&status=<value>`
- Results update without page reload
- Delete flow: clicking trash icon opens a confirmation modal ("Are you sure you want to delete this customer?"); on confirm, call `DELETE /api/customers/:id`, show success toast, remove row from list

**Add Customer Page — `client/app/dashboard/customers/add/page.jsx`**

- Controlled form with fields: Full Name*, Email*, Phone*, Company, Address, Status* (select), Notes
- Client-side validation before submit
- On success: show success toast, redirect to `/dashboard/customers`
- On error: show error toast with server message

**Edit Customer Page — `client/app/dashboard/customers/[id]/edit/page.jsx`**

- On mount, fetch customer by id and pre-populate all form fields
- Same validation as add form
- On success: show "Customer updated" toast, redirect to `/dashboard/customers`

**Customer Detail Page — `client/app/dashboard/customers/[id]/page.jsx`**

- Fetch and display all customer fields
- Show Edit button (navigates to edit page) and Delete button (with confirm modal)
- Show invoice history for this customer (fetched from `/api/invoices?customerId=<id>`)

---

## Module III: Search and Filter System

This module is integrated into the Customer List Page (Module II). Ensure the following additional requirements are met:

- Search by customer name must be **case-insensitive** on the backend using a regex: `{ name: { $regex: search, $options: 'i' } }`
- Status filter must use exact match: `{ status: status }`
- When both are active, combine them with a MongoDB `$and` query
- The frontend must show a "No customers found" empty state with a clear message when the filtered result is empty
- The filter and search state must be preserved in the URL as query parameters (e.g., `/dashboard/customers?search=john&status=Active`) so the page is shareable and bookmarkable
- Apply all 15 seeded records in demo/testing

---

## Module IV: Next.js Frontend Application

### Layout — `client/app/dashboard/layout.jsx`

This is the protected shell layout. It must:
- Check for a valid token on mount; if missing, redirect to `/login`
- Render the Sidebar on the left (fixed, 240px)
- Render a top header bar with: page title (dynamic), notification bell icon, user avatar + name
- Render `{children}` in the main content area
- Wrap children with the toast notification provider

### Sidebar — `client/components/layout/Sidebar.jsx`

Navigation items (with Lucide icons):
- Dashboard → `/dashboard`
- Customers → `/dashboard/customers`
- Invoices → `/dashboard/invoices`
- Notifications → highlight bell with badge count
- Chatbot → opens chatbot drawer

Highlight the active route using Next.js `usePathname()`. Bottom section shows logged-in user name and a Logout button that clears the token from `localStorage` and cookie, then redirects to `/login`.

### Dashboard Home — `client/app/dashboard/page.jsx`

On mount, fetch customer list and compute:
- Total Customers (count of all)
- Active Customers (count where status = 'Active')
- Leads (count where status = 'Lead')
- Inactive (count where status = 'Inactive')

Render 4 stat cards with these values. Below, render a "Recent Customers" table showing the 5 most recently added customers. Include two quick-action buttons: "Add Customer" and "Generate Invoice".

### API Integration

All API calls must use the Axios instance defined in `client/lib/axios.js`. Never use raw `fetch` for API calls. Handle errors globally: if a response returns `401`, automatically clear the token and redirect to `/login`.

---

## Module V: Invoice Generation System

### Backend

**Model — `server/models/Invoice.js`**

```
invoiceNumber: String, unique (auto-generated: INV-2026-XXXX)
customer: ObjectId ref 'Customer', required
createdBy: ObjectId ref 'User', required
services: [
  {
    description: String, required
    quantity: Number, required
    unitPrice: Number, required
    total: Number (computed: quantity * unitPrice)
  }
]
subtotal: Number
tax: Number (default 0)
totalAmount: Number
date: Date, default Date.now
dueDate: Date
notes: String
createdAt: Date, default Date.now
```

**Controller — `server/controllers/invoiceController.js`**

`createInvoice(req, res)`:
- Validate: `customer`, `services` (array, min 1 item) required
- Auto-generate `invoiceNumber` using a counter or timestamp: `INV-2026-${Date.now().toString().slice(-4)}`
- Compute `total` for each service item and overall `subtotal` and `totalAmount`
- Save and return `201` with invoice

`getInvoices(req, res)`:
- Support optional query param `customerId`
- Return all invoices for `req.user._id`, populated with customer name

`getInvoiceById(req, res)`:
- Return full invoice with customer populated

**Routes — `server/routes/invoiceRoutes.js`**
```
GET  /api/invoices         → getInvoices
POST /api/invoices         → createInvoice
GET  /api/invoices/:id     → getInvoiceById
```

### Frontend

**Invoice Generation Page — `client/app/dashboard/invoices/generate/page.jsx`**

- Step 1: Customer selector (searchable dropdown populated from `/api/customers`)
- Step 2: Services table — dynamic rows with inputs: Description, Qty, Unit Price; Total auto-computed per row
  - "Add Row" button appends a new empty row
  - "Remove" button on each row (disabled if only 1 row)
- Step 3: Summary — auto-computed Subtotal, Tax input (percentage), Total
- Additional fields: Due Date, Notes
- "Preview" button shows the invoice preview panel
- "Download PDF" button: use `jsPDF` to generate and download the invoice as a PDF file client-side
- "Save Invoice" button: POST to `/api/invoices`, show success toast

**Invoice Preview Component**

Render a styled document card showing:
- Invoice number (top right)
- Bill To: customer name, email
- Invoice date, due date
- Services table with all line items
- Summary: Subtotal, Tax, Total (bold)

---

## Module VI: Notification System

Use `react-hot-toast` for all in-app notifications.

**Setup:** Wrap the dashboard layout with `<Toaster position="top-right" />`.

**Usage conventions across the application:**
- Customer created: `toast.success('Customer added successfully')`
- Customer updated: `toast.success('Customer updated')`
- Customer deleted: `toast.success('Customer deleted')`
- Invoice generated: `toast.success('Invoice saved')`
- Any API error: `toast.error(error.response?.data?.message || 'Something went wrong')`
- Form validation failure: `toast.error('Please fill all required fields')`

Create a `client/components/notifications/NotificationPanel.jsx` component. This is a slide-in panel (triggered by the bell icon in the header) that maintains a local list of recent toast events. Store notifications in a React Context (`NotificationContext`) so the panel can read them. Each entry shows: type icon, message, timestamp. Include a "Clear All" button.

---

## Module VII: Chatbot System

**Important:** This chatbot is purely rule-based. No external AI API must be used. No calls to OpenAI, Anthropic, Gemini, or any other AI service.

**Component — `client/components/chatbot/Chatbot.jsx`**

Implement as a floating chat drawer fixed to the bottom-right of the screen. The chat bubble button is always visible on dashboard pages.

**State:**
- `isOpen`: boolean, controls visibility
- `messages`: array of `{ role: 'user' | 'bot', text: string, timestamp: Date }`
- `input`: controlled input string

**Bot Logic — pure switch/if-else, no external API:**

On receiving a user message, normalize it to lowercase and match against these commands:

| User Input Contains | Bot Response |
|---|---|
| `show customers` or `list customers` | Fetch from `/api/customers` and return: "Here are your customers: [Name1, Name2, ...]" |
| `add customer` or `new customer` | "Navigating to Add Customer..." then call `router.push('/dashboard/customers/add')` |
| `generate invoice` or `new invoice` | "Opening Invoice Generator..." then call `router.push('/dashboard/invoices/generate')` |
| `help` or `commands` | Return a formatted list of all available commands |
| `hello` or `hi` | "Hello! I'm your CRM Assistant. Type 'help' to see what I can do." |
| anything else | "I don't understand that command. Type 'help' to see available commands." |

**UI:**
- Messages displayed in a scrollable chat window
- User messages aligned right (blue bubble)
- Bot messages aligned left (white bubble with border)
- Quick command chip buttons above input bar: "Show Customers", "Add Customer", "Generate Invoice", "Help"
- Pressing a chip populates the input and auto-submits
- Auto-scroll to the latest message on every new message

---

## Module VIII: UI / Code Quality

### Code Standards

- Use `async/await` consistently; no `.then().catch()` chains
- All API controller functions must be wrapped in `try/catch` with proper error responses
- No hardcoded strings for status values; define constants:
  ```javascript
  // server/constants/customerStatus.js
  export const CUSTOMER_STATUS = { LEAD: 'Lead', ACTIVE: 'Active', INACTIVE: 'Inactive' }
  ```
- All environment variables must be in `.env` files (never committed); provide `.env.example` for both client and server
- Backend `.env` variables: `MONGO_URI`, `JWT_SECRET`, `PORT`
- Frontend `.env.local` variables: `NEXT_PUBLIC_API_URL`

### Folder Naming Conventions

- React components: `PascalCase.jsx`
- Utility files: `camelCase.js`
- Route folders (Next.js App Router): `kebab-case`

### Component Requirements

Every component must:
- Be a single-responsibility functional component
- Have PropTypes defined (or TypeScript types if using TS)
- Handle its own loading state with a skeleton or spinner
- Handle its own error state with an inline message

### Responsive UI

- All pages must be usable on viewport widths from 375px to 1440px
- Use Tailwind CSS responsive prefixes (`sm:`, `md:`, `lg:`) throughout
- The sidebar must collapse to a mobile bottom nav bar on screens below `md` breakpoint
- Tables must convert to stacked card list on mobile

---

## Environment Setup & Run Instructions

Provide a `README.md` in `Final_Term_Project_CRM/` with:

1. Prerequisites: Node.js 18+, MongoDB (local or Atlas URI)
2. Clone instructions
3. Server setup:
   ```bash
   cd server
   npm install
   cp .env.example .env   # fill in values
   node seed.js           # seed 15 customers
   npm run dev
   ```
4. Client setup:
   ```bash
   cd client
   npm install
   cp .env.example .env.local   # fill in NEXT_PUBLIC_API_URL
   npm run dev
   ```
5. Default credentials after seeding: `admin@crm.com` / `admin123`
6. GitHub repo URL placeholder

---

## Submission Checklist

Before pushing to GitHub, verify:

- [ ] All 8 modules are implemented and functional
- [ ] Minimum 15 customers exist in the database (via seed script)
- [ ] JWT authentication protects all dashboard routes
- [ ] Search + filter works on all 15 records without page reload
- [ ] Invoice PDF downloads correctly in the browser
- [ ] Chatbot responds to all 5 defined commands (no AI API used)
- [ ] Toast notifications fire on every create / update / delete / error action
- [ ] Application is fully responsive at 375px mobile width
- [ ] No secrets or `.env` files are committed to GitHub
- [ ] `README.md` is complete with setup instructions and GitHub URL
- [ ] Word/PDF report is prepared with output screenshots and GitHub URL for GCR upload
