from rest_framework import serializers
from .models import Brand, Campaign


class CampaignSerializer(serializers.ModelSerializer[Campaign]):
    class Meta:
        model = Campaign # type: ignore
        fields = '__all__'


class BrandSerializer(serializers.ModelSerializer[Brand]):
    class Meta:
        model = Brand # type: ignore
        fields = ["id", "name", "daily_budget", "monthly_budget", "daily_spend", "monthly_spend"]