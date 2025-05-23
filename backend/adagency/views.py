from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.request import Request
from .models import Brand, Campaign
from .serializers import BrandSerializer, CampaignSerializer
from decimal import Decimal
from django.db.models import QuerySet
from typing import Any


class BrandViewSet(viewsets.ModelViewSet[Brand]):
    queryset: QuerySet[Brand] = Brand.objects.all() # type: ignore
    serializer_class: type[BrandSerializer] = BrandSerializer

    @action(detail=True, methods=['get']) # type: ignore
    def campaigns(self, request: Request, pk: int | None=None) -> Response:
        brand = self.get_object()
        serializer = CampaignSerializer(brand.campaigns.all(), many=True)
        return Response(serializer.data) # type: ignore[misc]

    @action(detail=True, methods=['put']) # type: ignore
    def record_spend(self, request: Request, pk: int | None=None) -> Response:
        brand = self.get_object()
        amount: Decimal = Decimal(request.data.get('amount', 0)) # type: ignore[misc]
        brand.record_spend(amount)
        return Response({'status': 'Spend recorded'}) # type: ignore[misc]

    @action(detail=True, methods=['put']) # type: ignore
    def reset_daily(self, request: Request, pk: int | None=None) -> Response:
        brand = self.get_object()
        print("hello")
        brand.reset_daily_spend()
        return Response({'status': 'Daily spend reset'}) # type: ignore[misc]

    @action(detail=True, methods=['put']) # type: ignore
    def reset_monthly(self, request: Request, pk: int | None=None) -> Response:
        brand = self.get_object()
        brand.reset_monthly_spend()
        return Response({'status': 'Monthly spend reset'}) # type: ignore[misc]