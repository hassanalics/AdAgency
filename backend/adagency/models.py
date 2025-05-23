from django.db import models
from django.utils import timezone
from decimal import Decimal


class Brand(models.Model):
    name = models.CharField(max_length=255)
    daily_budget = models.DecimalField(max_digits=10, decimal_places=2)
    monthly_budget = models.DecimalField(max_digits=12, decimal_places=2)
    daily_spend = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    monthly_spend = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)

    def record_spend(self, amount: Decimal) -> None:
        self.daily_spend += amount
        self.monthly_spend += amount
        self.save()
        self.evaluate_budget()

    def evaluate_budget(self) -> None:
        if self.daily_spend >= self.daily_budget or self.monthly_spend >= self.monthly_budget:
            self.campaigns.update(is_active=False)

    def reset_daily_spend(self) -> None:
        self.daily_spend = 0
        self.save()
        self.try_reactivate_campaigns()

    def reset_monthly_spend(self) -> None:
        self.monthly_spend = 0
        self.save()
        self.try_reactivate_campaigns()

    def try_reactivate_campaigns(self) -> None:
        if self.daily_spend < self.daily_budget and self.monthly_spend < self.monthly_budget:
            now_hour = timezone.now().hour
            for campaign in self.campaigns.all():
                if campaign.should_be_active_now(now_hour):
                    campaign.is_active = True
                    campaign.save()

    def __str__(self) -> str:
        return self.name


class Campaign(models.Model):
    brand = models.ForeignKey(Brand, related_name="campaigns", on_delete=models.CASCADE) # type: ignore
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    start_hour = models.PositiveSmallIntegerField(null=True, blank=True)
    end_hour = models.PositiveSmallIntegerField(null=True, blank=True)

    def should_be_active_now(self, current_hour: int | None=None) -> bool:
        if current_hour is None:
            current_hour = timezone.now().hour
        if self.start_hour is None or self.end_hour is None:
            return True
        return self.start_hour <= current_hour < self.end_hour
    
    def __str__(self) -> str:
        return self.name
