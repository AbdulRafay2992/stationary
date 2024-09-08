from adminpanel.views import index
from django.contrib import admin #Imports Django's default administrative interface.
from django.urls import path, re_path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from .schema import schema
from django.conf.urls.static import static
from stationary import settings
from adminpanel import views

urlpatterns = [
    path("admin/", admin.site.urls),
    #Following allows your application to receive and respond to GraphQL queries at this endpoint.
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
    path('', index, name='index'),
    path("image/", csrf_exempt(views.product_image)),
    
    re_path(r'^.*/$', index, name='index'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
