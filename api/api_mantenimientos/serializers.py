from rest_framework import serializers

from api_models.models import Formapago, Provincias, Entidades, Impuestos, Embalajes

class ProviciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provincias
        fields = ['nombreprovincia']

class EntidadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entidades
        fields = ['nombreentidad']

class ImpuestosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Impuestos
        fields = ['nombre', 'valor']

class EmbalajesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Embalajes
        fields = ['nombre']

class FormapagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formapago
        fields = ['nombrefp']

