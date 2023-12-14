from rest_framework import viewsets, renderers
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.core.serializers import serialize
from django.http import JsonResponse

from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    
    #get a list of all our User objects
    queryset = User.objects.all()
    serializer_class = UserSerializer

    print("Inside User view set...")

    #get a single User object
    @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
    def createUser(self, request, *args, **kwargs):
        print("!!! Inside createUser method !!!")
       
        print("Here is the request...<")
        print(request)
        print(">")

        # msg = request
        # print(msg.split())

        obj = get_object_or_404(User, pk="clover")
        data = serialize("json", [obj], fields=('username', 'password', 'coin'))
        return HttpResponse(data, content_type="application/json")
    

    #delete a single User object
    @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
    def deleteUser(self, request, *args, **kwargs):
        print("!!! Inside deleteUser method !!!")
       
        print(request.user.username)
        

        #this works to delete
        obj = get_object_or_404(User,username=self.kwargs['username'])
        #obj.delete()
        data = serialize("json", [obj], fields=('username', 'password', 'coin'))
        return HttpResponse(data, content_type="application/json")
        
        
#methods to do CRUD on data.
#Create a new user        
#test = User.objects.create(username='bwoi', password='big')
#
#Get the last user in the DB
#print(self.queryset.last())
#
#Delete a user 
#obj = get_object_or_404(User, pk=2)
#obj.delete()
#
#need to figure out how to update & create a new user
