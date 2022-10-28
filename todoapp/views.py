from django.contrib.auth.models import User
from django_filters import rest_framework as filters
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from .filters import CategoryFilter, TODOFilter
from .models import TODO, Category
from .serializers import TODOModelSerializer, CategoryModelSerializer, UserModelSerializer, CreateTODOModelSerializer


class CategoryLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TODOModelViewSet(ModelViewSet):
    serializer_class = TODOModelSerializer
    pagination_class = TODOLimitOffsetPagination

    def get_queryset(self):
        user = self.request.query_params.get('user', '')
        return TODO.objects.filter(user=user)


class CategoryModelViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryModelSerializer
    pagination_class = CategoryLimitOffsetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CategoryFilter


class UserModelViewSet(CreateModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = 'username'
    permission_classes = [AllowAny]


class CreateTODOView(CreateModelMixin, GenericViewSet):
    queryset = TODO.objects.all()
    serializer_class = CreateTODOModelSerializer

