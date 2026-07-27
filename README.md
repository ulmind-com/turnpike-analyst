# Turnpike Analyst Enterprise Platform Backend

Production-ready, high-performance RESTful API backend for the **Turnpike Analyst** enterprise portal built with Python 3.11+, FastAPI, and MongoDB (via Motor for asynchronous execution).

## Features & Coverage
- **Layered Enterprise Architecture**: Clean decoupling across Core Security/Config, DB Lifecycle, Domain Enums, Pydantic v2 Schemas, Async Motor CRUD layers, and FastAPI Routers.
- **Robust JWT Authentication**: OAuth2 Password Bearer token flow with Passlib (Bcrypt hashing) and token rotation (`/api/v1/auth/refresh-token`).
- **Comprehensive Services Catalog (15 Categories)**: Covering Applications, Artificial & Augmented Intelligence, Business Process, Cloud, Consulting, Cybersecurity, Data Analytics, Design Experience, Digital Content Services, Engineering, Infrastructure, Sustainability, Talent Cloud, and specialized Sub-Services (ECM Migrations, Cognitive Capture, Managed Support, BPM/RPA, CRM/ERP integration, SEO, Custom Engineering).
- **Proprietary Tools & Demo Scheduling**: Complete pricing tiers and specifications for **JAMES WEBB Server** (high-speed ECM migrations) and **Agent P8 AI Toolkit** (autonomous IBM watsonx AI workers for FileNet P8), with automated 8-hour reply SLA tracking.
- **Enterprise Lead Capture & Consultations**: Appointment routing across Technical Team, Management Team, and Help Desk departments with status workflows (`PENDING`, `IN_PROGRESS`, `RESOLVED`, `CANCELLED`).
- **Training & Instructor Platform**: Course curricula for ECM, OCP (OpenShift), Cloud DevOps, and AI/ML mastery, alongside an instructor application recruitment funnel.
- **CMS Blogging & Newsletters**: Paginated blog publishing with tag filtering across ICC, Kofax, Hyland, and AI Innovation categories, plus newsletter subscription administration.

---

## Quickstart & Operational Guidelines

### 1. Environment & Dependencies
Ensure Python 3.11+ is installed. Install locked project dependencies:
```bash
pip install -r requirements.txt
```

### 2. Configuration & MongoDB
By default, the application reads connection variables from `.env`:
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=turnpike_analyst
SECRET_KEY=b9c40212f43a9f0293a38805f4581fef1bc391f63b8600d84a3c10e6e73f40d1
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```
Ensure your local MongoDB instance is operational on port 27017 or adjust the connection URI accordingly.

### 3. Database Initialization & Seeding
Execute the async seeding script to establish collection unique indices and insert default platform data:
```bash
python -m scripts.seed_data
```
This initializes:
- **Default Admin Account**: `admin@turnpikeanalyst.com` / `AdminPass123!`
- **Default Consultant Account**: `consultant@turnpikeanalyst.com` / `ConsultantPass123!`
- **All 16+ Enterprise Service Dropdowns & Sub-Services**
- **Proprietary Products**: JAMES WEBB Server & Agent P8 models and tier offerings
- **Sample Training Courses & CMS Articles**

### 4. Running the Uvicorn Server
Launch the application server with hot reloading:
```bash
uvicorn app.main:app --reload
```

### 5. API Documentation
Once the server is running at `http://127.0.0.1:8000`:
- **Interactive Swagger UI**: Visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to explore all endpoints, authenticate via OAuth2 Bearer tokens, and execute requests.
- **ReDoc Documentation**: Visit [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc) for comprehensive specification formatting.
