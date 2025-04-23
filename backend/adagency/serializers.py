from rest_framework import serializers
from .models import Brand, Campaign


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["name", "daily_budget", "monthly_budget", "daily_spend", "monthly_spend"]