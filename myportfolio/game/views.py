from django.shortcuts import render
from django.http import JsonResponse
from .models import HighScore

def save_score(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        score = int(request.POST.get('score'))
        if username:
            HighScore.objects.update_or_create(username=username, defaults={'score': score})
            return JsonResponse({'message': 'Score saved successfully!'})
    return JsonResponse({'message': 'Failed to save score'}, status=400)

def get_scores(request):
    top_scores = HighScore.objects.order_by('-score')[:3]
    scores = [{'username': score.username, 'score': score.score} for score in top_scores]
    return JsonResponse(scores, safe=False)

def get_score_for_user(request):
    username = request.GET.get('username')
    score = HighScore.objects.filter(username=username).first()
    if score:
        return JsonResponse({'username': score.username, 'score': score.score})
    return JsonResponse({'username': username, 'score': 0})
