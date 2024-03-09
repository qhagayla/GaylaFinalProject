from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Video
from .serializers import VideoSerializer, VideoUploadSerializer, VideoDeleteSerializer

class VideoListView(APIView):
    def get(self, request):
        videos = Video.objects.all().order_by('-upload_date')  # Order by upload date in descending order
        serializer = VideoSerializer(videos, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = VideoUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VideoDetailView(APIView):
    def get(self, request, pk):
        video = Video.objects.get(pk=pk)
        serializer = VideoSerializer(video, context={'request': request})
        return Response(serializer.data)

    def delete(self, request, pk):
        video = Video.objects.get(pk=pk)
        video.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class VideoDeleteView(APIView):
    def post(self, request):
        serializer = VideoDeleteSerializer(data=request.data)
        if serializer.is_valid():
            video_id = serializer.validated_data['id']
            video = Video.objects.get(pk=video_id)
            video.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)