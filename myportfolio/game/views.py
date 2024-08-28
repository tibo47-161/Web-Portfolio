from django.http import JsonResponse
from .models import Highscore

def get_scores(request):
    # Holen der besten 3 Highscores
    highscores = Highscore.objects.all().order_by('-score')[:3]
    scores = [{'username': hs.username, 'score': hs.score} for hs in highscores]
    return JsonResponse(scores, safe=False)

def save_score(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        score = request.POST.get('score')
        Highscore.objects.create(username=username, score=score)
        return JsonResponse({'message': 'Highscore saved!'})
    return JsonResponse({'message': 'Invalid request'}, status=400)

def get_score_for_user(request):
    username = request.GET.get('username')
    if username:
        user_highscore = Highscore.objects.filter(username=username).order_by('-score').first()
        return JsonResponse({'username': username, 'score': user_highscore.score if user_highscore else 0})
    return JsonResponse({'message': 'Username not provided'}, status=400)
