from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from models import Todo
from serializers import TodoSerializer
from rest_framework.response import response
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def list_todos(request)
todos=Todod.objects all()
serializer=TodoSerializer(todos,many=True)
return response(serializer.data)

@api_view(['POST'])
def add_todo(request)
serializer=TodoSerializer(data=request.data)
if serializer,is_valid():
    serializer.save()
    return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)
