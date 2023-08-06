from django.urls import path
from .views import generate_question, submit_answer, login_view, signup_view, insert_data, getprofileData, getprofileDatadelete

urlpatterns = [
    path('api/login/', login_view),
    path('api/signup/', signup_view),
    path('api/inserttoprofile/', insert_data),
    path('api/getprofile/', getprofileData),
    path('api/getprofiledelete/', getprofileDatadelete),

    path('api/generate/', generate_question, name='generate_question'),
    path('api/submit/', submit_answer, name='submit_answer'),
]
