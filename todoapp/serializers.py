from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer, StringRelatedField

from .models import Category, TODO


class CategoryModelSerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class TODOModelSerializer(ModelSerializer):
    category = CategoryModelSerializer()

    class Meta:
        model = TODO
        fields = '__all__'


class CreateTODOModelSerializer(ModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, *args, **kwargs):
        user = super().create(*args, **kwargs)
        p = user.password
        user.set_password(p)
        user.save()
        return user
