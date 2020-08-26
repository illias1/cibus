import { API, graphqlOperation } from "aws-amplify";

export const mutation = async <ResultType extends {}, VariablesType extends {} = {}>(
  query: string,
  variables?: VariablesType,
  authMode:
    | "AMAZON_COGNITO_USER_POOLS"
    | "API_KEY"
    | "AWS_IAM"
    | "OPENID_CONNECT" = "AMAZON_COGNITO_USER_POOLS"
) => {
  try {
    const { data } = (await API.graphql(graphqlOperation(query, variables), {
      authMode,
    })) as {
      data: ResultType;
    };
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
