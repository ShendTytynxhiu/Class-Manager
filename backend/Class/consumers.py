import json
from channels.generic.websocket import WebsocketConsumer

from asgiref.sync import async_to_sync

from django.contrib.auth import get_user_model
from .models import Chat, Class

from .views import get_last_10_messages, get_current_chat

CustomUser = get_user_model()


class ChatConsumer(WebsocketConsumer):
    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))

        return result
    
    def message_to_json(self, message):
        return {
            'id': message.id,
            'user': message.user.username,
            'content': message.content,
            'timestamp': str(message.timestamp)
        }


    def fetch_messages(self, data):
        messages = get_last_10_messages(data['room'])
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def new_message(self, data):
        chat = Chat.objects.create(
            user=CustomUser.objects.get(id=data["user"]),
            content=data['message'],
            room=Class.objects.get(id=int(data["room"]))
        )
        
        chat.save()
        content = {
            'command': 'new_message',
            'message': self.message_to_json(chat)
        }

        return self.chat_message(content)

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message,
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data["type"]](self, data)

    def send_message(self, content):
        self.send(text_data=json.dumps(content))

    # Receive message from room group
    def chat_message(self, event):
        self.send(text_data=json.dumps({
            "message": event
        }))