from rest_framework.serializers import ModelSerializer

from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password

class UserSerializer(ModelSerializer):

    def create(self, validated_data):
        password = validated_data.pop('password')
        encrypted_password = make_password(password)
        user = User.objects.create(**validated_data, password=encrypted_password)
        user.save()
        return user
    
    class Meta:
        model = User
        fields = ('username', 'password',)
