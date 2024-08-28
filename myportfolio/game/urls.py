from django.urls import path
from . import views

urlpatterns = [
    path('save_score/', views.save_score, name='save_score'),
    path('get_scores/', views.get_scores, name='get_scores'),
    path('get_score_for_user/', views.get_score_for_user, name='get_score_for_user'),
]
