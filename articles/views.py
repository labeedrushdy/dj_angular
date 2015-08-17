from rest_framework import generics
from rest_framework import permissions
from django.db.models import Q
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.admin.views.decorators import staff_member_required
from django.http import HttpResponseRedirect

from models import Article
from serializers import ArticleSerializer


def article_index(request):
    template_name = 'articleIndex.html'
    response = render_to_response(template_name, context_instance=RequestContext(request))

    return response

class ArticleList(generics.ListCreateAPIView):
    model = Article
    serializer_class = ArticleSerializer
    permission_classes = (permissions.DjangoModelPermissionsOrAnonReadOnly,)
    paginate_by = 10

    def get_queryset(self):
        queryset = Article.objects.filter(is_published__exact=True).order_by('-created_on')
        query = self.request.QUERY_PARAMS.get('q', None)
        if query is not None:
            queryset = queryset.filter(Q(title__icontains=query) | Q(description__icontains=query)).distinct()
        return queryset

    def pre_save(self, obj):
        obj.author = self.request.user


class ArticleDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Article
    serializer_class = ArticleSerializer
    permission_classes = (permissions.DjangoModelPermissionsOrAnonReadOnly,)

    def get_queryset(self):
        pk = self.kwargs.get(self.pk_url_kwarg, None)
        queryset = Article.objects.filter(is_published__exact=True).filter(pk=pk)
        for single_node in queryset:
            single_node.count +=1
            single_node.save()
        return queryset



@staff_member_required
def djadmin(request):
    template_name="appAdmin.html"
    return render_to_response(template_name,
                              context_instance=RequestContext(request))


def admin_template(request, template_name):
    if request.user.is_authenticated() and request.user.is_staff:
        return render_to_response(template_name + '.html', {}, context_instance=RequestContext(request))
    else:
        return HttpResponseRedirect("/djadmin/")