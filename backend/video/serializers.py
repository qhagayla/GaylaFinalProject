from rest_framework import serializers
from .models import Video

class VideoSerializer(serializers.ModelSerializer):
    video = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ['id', 'caption', 'video', 'upload_date']

    def get_video(self, obj):
        return self.context['request'].build_absolute_uri(obj.video.url)

class VideoUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['caption', 'video']

class VideoDeleteSerializer(serializers.Serializer):
    id = serializers.IntegerField()

