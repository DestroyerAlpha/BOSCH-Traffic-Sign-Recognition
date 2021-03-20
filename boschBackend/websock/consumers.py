from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ModelConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        print("Connected")
        await self.accept()

    async def receive(self, text_data):
        data_json = json.loads(text_data)
        request = data_json['request']
        if request == 'train':
            print("Got train")
            self.send(text_data=json.dumps({
                'type' : 'training_data',
                'message' : 'Solid Training in progress!!!'
            }))
        #Do Stuff
    
    async def disconnect(self, event):
        print("Disconnected")
        await self.send({
            "type": "websocket.disconnect"
        })