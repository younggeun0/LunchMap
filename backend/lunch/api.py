from django.shortcuts import render

from lunch.models import Restaurant, Review
from rest_framework import serializers, viewsets

class ReviewSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Review
        fields = '__all__'

class RestaurantSerializer(serializers.ModelSerializer):
    review_set = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = '__all__'

class RestaurantViewSet(viewsets.ModelViewSet):    
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer