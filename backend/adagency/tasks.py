# tasks.py
from celery import shared_task
from .models import Brand


@shared_task
def reset_all_daily_spends():
    for brand in Brand.objects.all():
        brand.reset_daily_spend()


@shared_task
def reset_all_monthly_spends():
    for brand in Brand.objects.all():
        brand.reset_monthly_spend()