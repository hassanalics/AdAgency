from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Brand, Campaign
from .serializers import BrandSerializer, CampaignSerializer
from decimal import Decimal


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

    @action(detail=True, methods=['get'])
    def campaigns(self, request, pk=None):
        brand = self.get_object()
        serializer = CampaignSerializer(brand.campaigns.all(), many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['put'])
    def record_spend(self, request, pk=None):
        brand = self.get_object()
        amount = Decimal(request.data.get('amount', 0))
        brand.record_spend(amount)
        return Response({'status': 'Spend recorded'})

    @action(detail=True, methods=['put'])
    def reset_daily(self, request, pk=None):
        brand = self.get_object()
        print("hello")
        brand.reset_daily_spend()
        return Response({'status': 'Daily spend reset'})

    @action(detail=True, methods=['put'])
    def reset_monthly(self, request, pk=None):
        brand = self.get_object()
        brand.reset_monthly_spend()
        return Response({'status': 'Monthly spend reset'})