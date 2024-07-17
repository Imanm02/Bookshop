from django.http import HttpResponse
from django.shortcuts import render, redirect
import json
from . import service
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Book, Review  # Ensure User and Book are imported here
from .utils.decorators import jwt_required
import jwt

@csrf_exempt
def home(request):
    return HttpResponse("Hello, Django!")

@csrf_exempt
@jwt_required
def add_review(request, book_id):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = request.user_id  # Assuming you decode and attach user_id from JWT in your jwt_required decorator
        book = Book.objects.filter(bookid=book_id).first()
        if book:
            Review.objects.create(
                user_id=user_id,
                book_id=book_id,
                rating=data['rating'],
                comment=data['comment']
            )
            return HttpResponse(json.dumps({"message": "Review added successfully"}), status=200)
        else:
            return HttpResponse("Book not found", status=404)

@csrf_exempt
@jwt_required
def get_user_profile(request, user_id):
    if request.method == "GET":
        user = User.objects.filter(userid=user_id).first()
        if user:
            user_data = {"username": user.username, "phone": user.phone}
            return HttpResponse(json.dumps(user_data), content_type="application/json", status=200)
        else:
            return HttpResponse("User not found", status=404)

@csrf_exempt
@jwt_required
def update_user_profile(request, user_id):
    if request.method == "POST":
        data = json.loads(request.body)
        user = User.objects.filter(userid=user_id).first()
        if user:
            user.phone = data.get('phone', user.phone)
            user.save()
            return HttpResponse(json.dumps({"message": "Profile updated successfully"}), status=200)
        else:
            return HttpResponse("User not found", status=404)

@csrf_exempt
def signin(request):
    if request.method == "POST":
        data = json.loads(request.body)
        response = service.authenticate_user(data.get('username'), data.get('password'))
        if response is None:
            return HttpResponse("Unauthorized", status=401)
        return HttpResponse(json.dumps({"user_id": response.get('user').userid, "token": response.get('token')}), status=200)

    return HttpResponse("Method not allowed", status=405)



@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        response = service.signup(data.get('username'), data.get('password'), data.get('phone'))
        if response is None:
            return HttpResponse("Unable to create new account. Check your inputs", status=400)
        if response == "Username exists":
            return HttpResponse("Username exists", status=400)
        return HttpResponse(json.dumps({"message": "User created successfully! Login to continue"}), status = 200)

    return HttpResponse("Method not allowed", status=405)


@csrf_exempt
@jwt_required
def add_book(request):
    if request.method == "POST":
        data = json.loads(request.body)
        response = add_book(data.get("name"), data.get("author"), data.get("price"), data.get("description"), data.get("genre"))
        if response is None:
            return HttpResponse("Unable to add new book. Check your inputs", status=400)
        if response == "Bookname exists":
            return HttpResponse("Bookname exists", status=400)
        return HttpResponse(json.dumps({"message": "Book added successfully!", "book_id": response.bookid}), status=200)

    return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def get_book(request, book_id):
    if request.method == "GET":
        response = service.get_book(book_id)
        if response is None:
            return HttpResponse("Invalid book id.", status=404)
        return HttpResponse(json.dumps({
            "name": response.name,
            "author": response.author,
            "genre": response.genre,
            "description": response.description,
            "price": response.price
        }), status=200)

    return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def get_all_books(request):
    if request.method == "GET":
        books = service.get_all_books()
        if books is None:
            return HttpResponse("No books to show!", status=200)
        return HttpResponse(json.dumps(books, indent=2), status=200)

    return HttpResponse("Method not allowed", status=405)



@csrf_exempt
def get_books(request):
    if request.method == "GET":
        genre = request.GET.get("genre")
        author = request.GET.get("author")
        name = request.GET.get("name")
        
        if not genre:
            genre = ""
        if not author:
            author = ""
        if not name:
            name = ""
        books = service.get_books(genre, author, name)
        if books is None:
            return HttpResponse("No books to show!", status=200)
        return HttpResponse(json.dumps(books, indent=2), status=200)

    return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def add_order(request):
    if request.method == "POST":
        data = json.loads(request.body)
        order = service.add_order(userid=data.get("user_id"), book_id=data.get("book_id"))
        response = json.dumps({"order_id": order.orderid})
        return HttpResponse(response, status=200)
    return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def get_orders(request, user_id):
    if request.method == "GET":
        orders = service.get_orders(user_id)
        return HttpResponse(json.dumps({"orders": orders}), status=200)
    return HttpResponse("Method not allowed", status=405)


def jwt_auth(request):
    token = request.META.get('HTTP_AUTHORIZATION')
    if token is None:
        return False

    try:
        token = token.split()[-1]
        jwt.decode(token, 'secret', algorithms=['HS256'])
        return True
    except:
        return False