from django.urls import path
from views import list_todos,add_todo

urlpatterns=[
    path('admin/', admin.site.urls),
    path('todo/',list_todos)
    path('todos/add',add_todo)
]