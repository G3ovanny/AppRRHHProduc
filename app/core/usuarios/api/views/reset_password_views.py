from core.usuarios.api.serializers.password_serializers import ResetPasswordUserSerializer

from rest_framework.generics import GenericAPIView



class ResetPasswordViews(GenericAPIView):
    
    def post(self, request):
        serializer = ResetPasswordUserSerializer(data = request.data)
        
        if serializer.is_valid():
            usuario = serializer.data.get('username')
            print(usuario)