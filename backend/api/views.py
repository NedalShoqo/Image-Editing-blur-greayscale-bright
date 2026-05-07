from PIL import Image, ImageFilter, ImageEnhance
from django.core.files.base import ContentFile
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UploadedImage
import io


@api_view(['POST'])
def upload_image(request):
    image = request.FILES.get('image')

    if not image:
        return Response({'error': 'No image uploaded'}, status=400)

    uploaded = UploadedImage.objects.create(original_image=image)

    return Response({
        'id': uploaded.id,
        'original_image': request.build_absolute_uri(uploaded.original_image.url),
    })


@api_view(['POST'])
def filter_image(request, image_id):
    filter_type = request.data.get('filter')

    try:
        uploaded = UploadedImage.objects.get(id=image_id)
    except UploadedImage.DoesNotExist:
        return Response({'error': 'Image not found'}, status=404)

    img = Image.open(uploaded.original_image.path)

    if filter_type == 'grayscale':
        img = img.convert('L')
    elif filter_type == 'blur':
        img = img.filter(ImageFilter.BLUR)
    elif filter_type == 'bright':
        img = ImageEnhance.Brightness(img).enhance(1.5)
    else:
        return Response({'error': 'Invalid filter'}, status=400)

    buffer = io.BytesIO()
    img.save(buffer, format='PNG')

    file_name = f'filtered_{uploaded.id}_{filter_type}.png'
    uploaded.filtered_image.save(file_name, ContentFile(buffer.getvalue()), save=True)

    return Response({
        'filtered_image': request.build_absolute_uri(uploaded.filtered_image.url)
    })