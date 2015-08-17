from django.db import models


class Article(models.Model):
    title = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    is_published = models.BooleanField(default=False, blank=True)
    is_featured = models.BooleanField(default=False, blank=True)
    can_comment = models.BooleanField(default=False, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    revision_log = models.TextField(blank=True, null=True)
    author = models.ForeignKey('auth.User', related_name='articles')
    count = models.IntegerField(default=0)


    def __unicode__(self):
        return self.title
