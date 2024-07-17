import jwt
from django.http import HttpResponse

def jwt_required(f):
    def wrap(request, *args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return HttpResponse('Unauthorized', status=401)
        try:
            jwt.decode(token, 'your_secret_key', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return HttpResponse('Token expired', status=401)
        except jwt.InvalidTokenError:
            return HttpResponse('Invalid token', status=401)

        return f(request, *args, **kwargs)
    return wrap