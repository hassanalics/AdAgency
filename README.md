# Ad Agency Manager

This Django project manages advertising budgets for multiple brands and their campaigns, ensuring budgets are respected and campaigns are paused/reactivated accordingly.

---

## 🚀 Features

- Set and track **daily/monthly budgets** for each brand
- Automatically turn off campaigns when budgets are exceeded
- **Reset budgets** daily/monthly via scheduled tasks (Celery Beat)
- Support for **dayparting**: campaigns run only at defined hours
- REST API using Django REST Framework

---

## 🏗️ Technologies

- React
- Django
- Django REST Framework
- Celery
- RabbitMQ (for task queue)
- Docker & docker-compose

---

## 🧠 Data Models

### Brand
| Field | Type |
|-------|------|
| name | string |
| daily_budget | decimal |
| monthly_budget | decimal |
| daily_spend | decimal |
| monthly_spend | decimal |

### Campaign
| Field | Type |
|-------|------|
| brand | ForeignKey to Brand |
| name | string |
| is_active | boolean |
| start_hour | integer (0–23) |
| end_hour | integer (0–23) |

---

## 🧪 How to Run

### 1. Clone and Build Docker Containers
```bash
git clone https://github.com/hassanalics/AdAgency.git
cd AdAgency
```

### 2. Run Frontend
```bash
cd frontend && docker-compose up --build
```
- visit http://localhost

### 3. Run Backend
- open new terminal
```bash
cd backend && docker-compose up --build
```
- visit http://localhost:8000/admin

- Note: if you are unable to visit above url, please stop all backend conatiners and re-run 
```bash
docker-compose up --build
```

### 4. Create Admin SuperUser
```bash
docker exec -it <container_name> bash
```
conatianer_name is backend
```bash
python manage.py createsuperuser
```
- follow instruction to create super user
- now again visit http://localhost:8000/admin and enter credentials

