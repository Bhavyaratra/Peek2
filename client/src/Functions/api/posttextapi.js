
const posttextapi = async (data)=>{

   return fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/peeknote-niylh/service/restservice/incoming_webhook/posttext',
   {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
      
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => {
        console.log('Success: ', res);
        return  res;  //webhook returns in Bson format
    })
    .catch((error) => {
        console.error('Error: ', error);
    });
}

export {posttextapi};