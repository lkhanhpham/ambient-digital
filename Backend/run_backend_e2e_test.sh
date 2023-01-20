#!/bin/bash

echo "" && echo "run migrations"
python manage.py migrate

echo "" && echo "run collectstatic"
python manage.py collectstatic --no-input --clear

echo "" && echo "Starting gunicorn process on 0.0.0.0:8000"
exec gunicorn ambientDigital.wsgi:application --bind 0.0.0.0:8000         # Start Gunicorn processes
