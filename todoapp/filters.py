from django_filters.rest_framework import FilterSet, CharFilter, DateFromToRangeFilter

from todoapp.models import Category, TODO


class CategoryFilter(FilterSet):
    name = CharFilter(lookup_expr='contains')

    class Meta:
        model = Category
        fields = ['name']


class TODOFilter(FilterSet):
    created_at = DateFromToRangeFilter()

    class Meta:
        model = TODO
        fields = ['category', 'created_at']
