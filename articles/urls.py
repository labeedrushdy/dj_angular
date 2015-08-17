from django.conf.urls import patterns, url
from django.contrib import admin

from articles import views

admin.autodiscover()


urlpatterns = patterns('',
                       url(r'^$', views.ArticleList.as_view(), name='article-list'),
                       url(r'^(?P<pk>[0-9]+)/$', views.ArticleDetail.as_view(), name='article-detail'),

)