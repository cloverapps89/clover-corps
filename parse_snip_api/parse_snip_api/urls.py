from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, renderers
from user.views import UserViewSet

from trivia import views

router = routers.DefaultRouter()
router.register(r'questions', views.QuestionViewSet)
router.register( r'users', UserViewSet, basename='user')


urlpatterns = [
    path('', include(router.urls)),
    path('api/v1/', include(router.urls)),
    path('users/<str:pk>/', UserViewSet.createUser, name='createUser'), #<-- here is how we call our view method.
    path('admin/', admin.site.urls),
    *router.urls,
]
