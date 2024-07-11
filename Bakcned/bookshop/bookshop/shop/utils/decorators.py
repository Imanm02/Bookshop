def log_error(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            print("Exception occurred in " + func.__name__ + " : " + str(e))
            raise e

    return wrapper