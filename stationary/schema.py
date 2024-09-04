import graphene
from adminpanel.schema import schema as schema1

class Query(schema1.Query, graphene.ObjectType):
    pass

class Mutation(schema1.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
