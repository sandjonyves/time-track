# DevSecurity Time Tracker

Un projet de suivi du temps (time tracking) avec un backend **Django REST Framework** et un frontend **React**.

---

##  Fonctionnalités

- Authentification avec **JWT (stocké dans cookies HTTPOnly)**  
- Gestion des utilisateurs (inscription, connexion, déconnexion)  
- Gestion des tâches avec filtres et suivi du temps  
- Frontend moderne avec **React + Vite**  
- Backend  avec **Django REST Framework + PostgreSQL**  
- Déploiement continu et orchestration avec **Docker & docker-compose**

---

##  Installation

### 1. Cloner le projet
```bash
git clone https://github.com/sandjonyves/time-track.git
cd time-track
```

### 2. Lancer avec Docker
```bash
docker-compose up --build
```

Le backend démarre sur :  
👉 [http://localhost:8000](http://localhost:8000)  

Le frontend démarre sur :  
👉 [http://localhost:5173](http://localhost:5173)  

---

##  Variables d’environnement

Créer un fichier `.env` dans le dossier `backend/` avec :  
```env
POSTGRES_DB=db_timeTrack
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

---

##  Commandes utiles

---

##  Tests

### Backend (Django + pytest)
```bash
docker-compose exec backend pyhon manage.py runserver

```

### Frontend (React + Vitest + Playwright)
```bash
cd frontend
docker-compose exec frontend npm test
```
 ---
