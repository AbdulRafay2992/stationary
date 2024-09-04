from adminpanel.views import index
from django.contrib import admin #Imports Django's default administrative interface.
from django.urls import path, re_path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from .schema import schema

urlpatterns = [
    path("admin/", admin.site.urls),
    #Following allows your application to receive and respond to GraphQL queries at this endpoint.
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
    path('', index, name='index'),
    re_path(r'^.*/$', index, name='index'),
]
