from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin
admin.autodiscover()
from articles.views import admin_template

urlpatterns = patterns('',
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
                       url(r'^$', 'articles.views.article_index', name="article-index"),
                       url(r'^articles/', include('articles.urls')),
                       url(r'^templates/(?P<template_name>\w+)', admin_template, name="admin-template"),
                       url(r'^djadmin/$', 'articles.views.djadmin', name="djadmin"),
                       )

urlpatterns += staticfiles_urlpatterns()