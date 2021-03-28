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

function callTest(call, callback) {
    callback(null, call.request);
}
function main () {
    const server = new grpc.Server();
    server.addService(testProto.TestService.service, {callTest: callTest});
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();