const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.AWS_TABLE;

const getData = async() => {
    const params = {
        TableName: TABLE_NAME
    };
    const datas = await dynamoClient.scan(params).promise();
    console.log(datas)
    return datas;
}

const getDataById = async(userId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId
        }
    };
    return await dynamoClient.get(params).promise();
}

const addOrUpdateData = async(data) => {
    const params = {
        TableName: TABLE_NAME,
        Item: data
    };
    return await dynamoClient.put(params).promise();
}

module.exports = {
    dynamoClient,
    getData,
    getDataById,
    addOrUpdateData,
}