from django.urls import path
from shop import views

urlpatterns = [
    path("", views.home, name="home"),
	path('login', views.signin, name="login"),
	path('signup', views.signup, name="singup"),
    path('manage/add_book', views.add_book, name="add_book"),
	path('book/<int:book_id>', views.get_book, name="book"),
	path('all_books', views.get_all_books, name="books"),
	path('books', views.get_books, name="search"),
	path('add_order', views.add_order, name="add_order"),
	path('orders/<int:user_id>', views.get_orders, name="orders")
]