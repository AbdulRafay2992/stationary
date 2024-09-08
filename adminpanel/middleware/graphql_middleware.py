# JwtTokenMiddleware class, is responsible for handling JWT authentication for GraphQL requests.
from graphql_jwt.middleware import JSONWebTokenMiddleware
from adminpanel.models import *
import jwt
from django.contrib.auth import get_user_model
from graphql import GraphQLError

User = get_user_model()
class JwtTokenMiddleware(JSONWebTokenMiddleware):
    
    def resolve(self, next, root, info, **kwargs):
        try:
            # Retrieve the request from the GraphQL execution context
            request = info.context
            
            # Check if the request includes a JWT token in the headers
            token = request.headers.get('Authorization', '').split(' ')[1] if 'Authorization' in request.headers else None
            operation_name = info.operation.name.value if info.operation.name else None
            print(operation_name)
            if token != "null" and token is not None:
                user = self.get_user(info,token)
                if GroupTaskPermission.objects.get(group=user.group_id, task=Task.objects.get(name = operation_name)):
                    info.context.user=user
            elif operation_name!="tokenAuth":
                    raise GraphQLError("CUSTOM - Not logged in")

            return super().resolve(next, root, info, **kwargs)
        except Exception as e:
            print(f"Exception in Middleware: {str(e)}")

    def get_user(self,info,token):
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
            return user
        except jwt.ExpiredSignatureError:
            raise Exception("CUSTOM - Token is expired")
        except jwt.InvalidTokenError as e:
            raise Exception("CUSTOM - Invalid token " +str(e))
        except User.DoesNotExist:
            raise Exception("CUSTOM - User not found")
    
    def print_graphql_request(self, info):
        # Print GraphQL request details
        operation_type = info.operation.operation
        operation_name = info.operation.name.value if info.operation.name else None
        print(f">>>>>>>>>>>>>")
        requested_fields = self.get_requested_fields(info)
        
        print("THIS IS REQUEST")
        print(f"GraphQL {operation_type} request '{operation_name}' with fields: {requested_fields}")
        print('------------------------------------------\n')

    def get_requested_fields(self, info):
        print(f"p {info.field_nodes[0].selection_set}")
        # Extract and format the requested fields from the resolver context
        selections = info.field_nodes[0].selection_set.selections if info.field_nodes else []
        fields = self.extract_fields(selections)
        return fields

    def extract_fields(self, selections):
        # Recursively extract requested fields from the GraphQL selections
        fields = []

        for selection in selections:
            if hasattr(selection, 'name'):
                field_name = selection.name.value
                if selection.selection_set:
                    nested_fields = self.extract_fields(selection.selection_set.selections)
                    fields.append({field_name: nested_fields})
                else:
                    fields.append(field_name)

        return fields