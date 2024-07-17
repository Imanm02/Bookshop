from functools import wraps
from django.http import JsonResponse
import jwt

def jwt_required(f):
    @wraps(f)
    def decorated_function(request, *args, **kwargs):
        token = request.headers.get('Authorization')
        if token is None:
            return JsonResponse({'message': 'Authorization token is missing'}, status=401)

        try:
            # Assuming 'secret' is your secret key; replace it with your actual key
            # Also, specify the algorithm you used to encode the token
            payload = jwt.decode(token, 'your_secret_key', algorithms=['HS256'])
            request.user_id = payload['user_id']  # Example payload user identification
        except jwt.ExpiredSignatureError:
            return JsonResponse({'message': 'Token has expired'}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({'message': 'Invalid token'}, status=401)

        return f(request, *args, **kwargs)
    return decorated_function