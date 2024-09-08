from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
import os
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from django.conf import settings

index = never_cache(TemplateView.as_view(template_name = 'index.html'))


# def print_view(request):
#     print("Hello from print view!")
#     return HttpResponse("Print view executed successfully")

def product_image(request):
    if request.method == 'POST':
        try:
            file = request.FILES.get('image')
            if not file:
                return JsonResponse({'success': False, 'error': 'No file uploaded'})

            # Allowed image extensions
            image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.jfif']
            _, ext = os.path.splitext(file.name)

            # Check extension
            if ext.lower() not in image_extensions:
                return JsonResponse({'success': False, 'error': 'Extension not allowed'})

            # Use Django’s FileSystemStorage for handling file uploads
            fs = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, ''))
            filename = fs.save(file.name, file)
            file_url = fs.url(filename)

            return JsonResponse({'success': True, 'file_url': file_url})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid HTTP method'})
        