import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../../services/SpacesTable/Read";

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    spaceId: "cf8b38b7-bc55-447e-ad13-d60d87e7d8d6",
  },
} as any;

const result = handler(event, {} as any).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
  console.log(123);
});
