from rest_framework.views import APIView
from rest_framework.response import Response

class TodoListView(APIView):
    def get(self, request):
        # return list of todos
        return Response({"message": "Success"})
