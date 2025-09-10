# apps/accounts/signals.py
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.utils import timezone
from apps.accounts.models import CustomUser
from apps.tasks.models import Task
from datetime import timedelta
from django.utils.text import slugify

@receiver(post_migrate)
def create_initial_users_and_tasks(sender, **kwargs):
    # Vérifie s'il y a déjà des utilisateurs
    if CustomUser.objects.exists():
        return

    # Crée deux utilisateurs
    user1 = CustomUser.objects.create_user(
            username=slugify("user1"),
            email="user1@example.com",
            password="password123"
        )
    user2 = CustomUser.objects.create_user(
            username=slugify("user2"),
            email="user2@example.com",
            password="password123"
    )
    # Fonction pour créer 10 tâches pour un utilisateur
    def create_tasks(user):
        now = timezone.now()
        for i in range(1, 11):
            start_time = now + timedelta(days=i, hours=i)
            end_time = start_time + timedelta(hours=1)
            Task.objects.create(
                user=user,
                description=f"Tâche {i} de {user.email}",
                start_time=start_time,
                end_time=end_time,
                start_date=start_time.date(),
                end_date=end_time.date()
            )

    create_tasks(user1)
    create_tasks(user2)
    print("✅ 2 utilisateurs et 10 tâches chacun créés automatiquement.")
