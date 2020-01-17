const express = require('express');
const node_fetch = require('node-fetch');
const app = express();

const fetchCommit = async (url: string, res: any) => {
    try {
        const response =  await node_fetch(url);
        const json =  await response.json();
        let replyJson = [];

        if ( json.length >= 1 )
        {
            for (let commit of json) {

                let sendingCommit = {};
                let commitInterface = {};
                let commitDay: Date;
                let commitTime: Date;

                commitInterface = commit['commit'];
                sendingCommit['commitUrl'] = commit['html_url'];
                sendingCommit['commitSha'] = commitInterface['tree']['sha'];
                sendingCommit['commitMsg'] = commitInterface['message'];

                commitDay = commitInterface['committer']['date'].slice(0, 10);
                commitTime = commitInterface['committer']['date'].slice(11, 19);
                sendingCommit['commitDay'] = commitDay;
                sendingCommit['commitTime'] = commitTime;
                sendingCommit['commiterName'] = commitInterface['committer']['name'];
                sendingCommit['commiterEmail'] = commitInterface['committer']['email'];
                replyJson.push(sendingCommit);
            }
        }

        res.send(replyJson);

    } catch (error) {
        console.log(error);
    }
};

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin X-Request-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');

    if( "OPTIONS" == req.method) {
        res.sendStatus(200);
    } else {
        console.log( req.ip + ' ' + req.method + ' ' + req.url );
        next();
    }
})
app.get('/', (req: any, res: any) =>{
    let repoUrl : string;
    repoUrl = req.url;
    repoUrl = repoUrl.replace("?", "/");
    const url ='https:' + repoUrl;
    console.log( url );
    fetchCommit(url, res);

})
app.listen(4201, '127.0.0.1', function(){
    console.log('ServerAPI now is listening on 4201');
})
