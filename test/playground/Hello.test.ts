import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../../services/SpacesTable/Update";

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    spaceId: "dd94100f-793e-4a05-a71e-2d2d3b338242",
  },
  body: {
    location: "new Location",
  },
} as any;

const result = handler(event, {} as any).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
  console.log(123);
});
