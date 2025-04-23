# admin.py
from django.contrib import admin
from .models import Brand, Campaign


class CampaignInline(admin.TabularInline):
    model = Campaign
    extra = 1


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'daily_budget', 'monthly_budget', 'daily_spend', 'monthly_spend')
    inlines = [CampaignInline]


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'is_active', 'start_hour', 'end_hour')
    list_filter = ('brand', 'is_active')
