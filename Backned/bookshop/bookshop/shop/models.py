from django.db import models

class User(models.Model):
  username = models.CharField(max_length=255)
  userid = models.AutoField(primary_key=True)
  password_hash = models.CharField(max_length=255)
  phone = models.CharField(max_length=11, default="")

class Book(models.Model):
    name = models.CharField(max_length=255)
    bookid = models.AutoField(primary_key=True)
    author = models.CharField(max_length=255)
    genre = models.CharField(max_length=255, default="other")
    description = models.CharField(max_length=1000, default="")
    price = models.IntegerField(default=80000)

class Order(models.Model):
  orderid = models.AutoField(primary_key=True)
  # userid = models.ForeignKey(to=User, to_field='userid', on_delete=models.DO_NOTHING)
  # bookid = models.ForeignKey(to=Book, to_field='bookid', on_delete=models.DO_NOTHING)
  userid = models.CharField(max_length=255)
  bookid = models.CharField(max_length=255)
  order_date = models.DateTimeField(auto_now=True)

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    rating = models.IntegerField(default=1)
    comment = models.TextField()

    def __str__(self):
        return f"{self.user.username}'s review of {self.book.name}"