from rest_framework import serializers
from models import Article

class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.Field(source='author.username')
    api_url = serializers.SerializerMethodField('get_api_link')

    class Meta:
        model = Article
        fields = ('id', 'title', 'description', 'is_published', 'is_featured', 'can_comment', 'created_on',
                  'updated_on', 'revision_log','author', 'count', 'api_url')
        read_only_fields = ('id', 'created_on')

    def get_api_link(self, obj):
        if obj and obj.id:
            return "#/articles/%s" % obj.id
        else:
            pass


