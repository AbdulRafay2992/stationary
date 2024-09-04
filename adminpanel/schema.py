from .models import *
import graphene
from graphene_django.types import DjangoObjectType
import jwt
import graphql_jwt
from graphql import GraphQLError
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
import time, os

User = get_user_model()

ADMIN = 2
SALES = 3


def generate_jwt_token(user):
    payload = {
        'user_id': user.id,
        'username': user.username
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token


def refresh_jwt_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        # Extract user_id from the payload
        user_id = payload.get('user_id')
        # Retrieve the user object based on user_id
        user = User.objects.get(id=user_id)  # Assuming User is your custom Us
        # Extend expiration by 1 hour
        payload['exp'] = datetime.utcnow() + graphql_jwt.timedelta(hours=1)
        # Generate a new JWT token with the updated payload
        return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256'), user

    except jwt.ExpiredSignatureError:
        # Handle expired token
        raise Exception("Token is expired")
    except jwt.InvalidTokenError:
        # Handle invalid token
        raise Exception("Invalid token")
    except User.DoesNotExist:
        raise Exception("Invalid user")


def verify_jwt_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload.get('user_id')
        user = User.objects.get(id=user_id)
        return True
    except Exception as e:
        return False

class UserType(DjangoObjectType):
    class Meta:
         model = User

class ItemType(DjangoObjectType):
    class Meta:
        model = Item

class GroupType(DjangoObjectType):
    class Meta:
        model = UserGroup        

class Query(graphene.ObjectType):
    
    users = graphene.List(UserType)    
    me = graphene.Field(UserType)

    def resolve_me(self, info):
        user = info.context.user
        if user.group.name == "admin":
            return info.context.user

    def resolve_users(self, info):
        print("Resolving users...")
        print(f"Authenticated user: {info.context.user}")
        # if not info.context.user.is_authenticated:
        #     raise Exception("Not authenticated!")
        return User.objects.all()

class VerifyToken(graphene.Mutation):
    class Arguments:
        token = graphene.String(required=True)

    verified = graphene.Boolean()

    def mutate(self, info, token):
        try:
            return VerifyToken(verified=verify_jwt_token(token))
        except Exception as e:
            raise jwt.JSONWebTokenError(str(e))

class RefreshToken(graphene.Mutation):
    class Arguments:
        token = graphene.String()

    new_token = graphene.String()

    def mutate(self, info, token):
        try:
            new_token = refresh_jwt_token(token)
            return RefreshToken(new_token=new_token)
        except Exception as e:
            raise jwt.JSONWebTokenError(str(e))

class AuthenticateUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    token = graphene.String()
    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, email, password):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise GraphQLError('User not found.')
        if not user.check_password(password):
            raise GraphQLError('Invalid password.')
        token = generate_jwt_token(user)
        return cls(token=token, user=user)

class NewItem(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        price = graphene.String(required=True)

    item = graphene.Field(ItemType)

    @classmethod
    def mutate(cls, root, info, name, price):
        user = info.context.user
        if user.group.name == "admin":
            item=Item(name=name,price=price, stock=0,add_time=time.time())
            item.save()
            print("Item saved")

            image_name = name + '.jpg'
            image_path = os.path.join('static', 'itemsimages', image_name)
            print(image_path)

            # Save the image file
            with open(image_path, 'wb') as f:
                # For demonstration purposes, we'll create a simple image file
                # In a real-world scenario, you would replace this with your actual image data
                f.write(b'Image data')
                print("Image saved")
            
            return cls(item=item)
    
class Mutation(graphene.ObjectType):

    token_auth = AuthenticateUser.Field()
    verify_token = VerifyToken.Field(description="Verify a JWT token")
    refresh_token = RefreshToken.Field(description="Refresh a JWT token")

    add_new = NewItem.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
