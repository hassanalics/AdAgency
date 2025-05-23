# tasks.py
from __future__ import annotations
from celery import shared_task # type: ignore[import-untyped]
from .models import Brand
from django.db.models import QuerySet


@shared_task # type: ignore
def reset_all_daily_spends() -> None:
    brands: QuerySet[Brand] = Brand.objects.all() # type: ignore
    for brand in brands:
        brand.reset_daily_spend()


@shared_task # type: ignore
def reset_all_monthly_spends() -> None:
    brands: QuerySet[Brand] = Brand.objects.all() # type: ignore
    for brand in brands:
        brand.reset_monthly_spend()