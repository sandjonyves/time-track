#!/bin/sh

# Affiche ce qu'on fait
echo "Making migrations..."
python manage.py makemigrations --noinput

echo "Applying migrations..."
python manage.py migrate --noinput

# Démarre le serveur
echo "Starting server..."
exec gunicorn backend.wsgi:application --bind 0.0.0.0:8000
