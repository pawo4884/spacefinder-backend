import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { join } from "path";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/lib/aws-apigateway";
import { GenericTable } from "./GenericTables";
import { NodejsFunction } from "aws-cdk-lib/lib/aws-lambda-nodejs";
import { PolicyStatement } from "aws-cdk-lib/lib/aws-iam";

export class SpaceStack extends Stack {
  private api = new RestApi(this, "SpaceApi");
  private spacesTable = new GenericTable(this, {
    tableName: "SpacesTable",
    primaryKey: "spaceId",
    createLambdaPath: "Create",
    readLambdaPath: "Read",
  });

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const helloLambdaNodeJs = new NodejsFunction(this, "helloLambdaNodeJs", {
      entry: join(__dirname, "..", "services", "node-lambda", "hello.ts"),
      handler: "handler",
    });

    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions("s3:ListAllMyBuckets");
    s3ListPolicy.addResources("*");
    helloLambdaNodeJs.addToRolePolicy(s3ListPolicy);

    const helloLambdaIntegration = new LambdaIntegration(helloLambdaNodeJs);
    const helloLambdaRessource = this.api.root.addResource("hello");
    helloLambdaRessource.addMethod("GET", helloLambdaIntegration);

    const spacesRessource = this.api.root.addResource("spaces");
    spacesRessource.addMethod("POST", this.spacesTable.createLambdaIntegration);
    spacesRessource.addMethod("GET", this.spacesTable.readLambdaIntegration);
  }
}
