const grpc = require("@grpc/grpc-js");
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './test.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const testProto = grpc.loadPackageDefinition(packageDefinition).test;

function main () {
    const obj = {
        name : 'Jay'
    };

    const target = 'localhost:50051';
    const client = new testProto.TestService(target, grpc.credentials.createInsecure());

    client.callTest(obj, function(err, response) {
        console.log('This is test log ==> :', response);
      });
}

main();