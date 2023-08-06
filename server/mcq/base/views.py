from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
import random
from .models import Question, Profile
from .serializers import QuestionSerializer, ProfileSerializer
from django.contrib.auth.models import User

import datetime

current_datetime = datetime.datetime.now()

formatted_datetime = current_datetime.strftime("%d-%m-%Y %I:%M:%S %p")


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def signup_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_409_CONFLICT)

    user = User.objects.create_user(username=username, password=password)
    if user:
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'Failed to create user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def generate_question(request):
    questions = Question.objects.all()
    if len(questions) < 5:
        return Response("Not enough questions in the database.", status=status.HTTP_400_BAD_REQUEST)
    random_questions = random.sample(list(questions), 5)
    serializer = QuestionSerializer(random_questions, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def submit_answer(request):
    user_answers = request.data.get('user_answers', [])
    questions = Question.objects.filter(
        id__in=[answer['question_id'] for answer in user_answers])
    score = 0
    for question in questions:
        answer = next((ans['selected_choice']
                      for ans in user_answers if ans['question_id'] == question.id), None)
        if answer and answer == question.correct_choice:
            score += 1
    return Response({'score': score, 'total_questions': len(questions)})


@api_view(['POST'])
def insert_data(request):
    username = request.data.get('usernameuser')
    question1 = request.data.get('question1')
    question2 = request.data.get('question2')
    question3 = request.data.get('question3')
    question4 = request.data.get('question4')
    question5 = request.data.get('question5')
    scoredata = request.data.get('scoredata')

    pro = Profile.objects.create(

        username=username,
        question1=question1,
        question2=question2,
        question3=question3,
        question4=question4,
        question5=question5,
        scoredata=scoredata,

        created_at=formatted_datetime

    )

    pro.save()

    return Response("Record Insert")


@api_view(['POST'])
def getprofileData(request):
    username = request.data.get('username')
    print(username)
    try:
        profile = Profile.objects.filter(username=username)
    except Profile.DoesNotExist:
        return Response({'message': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProfileSerializer(profile, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def getprofileDatadelete(request):
    quesid = request.data.get('quesid')
    print(quesid)
    try:
        profile = Profile.objects.filter(uuid=quesid).delete()
    except Profile.DoesNotExist:
        return Response({'message': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProfileSerializer(profile, many=True)
    return Response(serializer.data)
