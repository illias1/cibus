import React from "react";
import { API, graphqlOperation } from "aws-amplify";

type UseQueryType<ResultType> = {
  loading: boolean;
  error: any;
  data: ResultType;
  refetch: () => void;
};

type ErrorType = {
  data: any;
  errors: any;
};

export const useQuery = <ResultType extends {}, VariablesType extends {} = {}>(
  query: string,
  variables?: VariablesType
): UseQueryType<ResultType> => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState({} as ResultType);

  const fetchQuery = async (query: string, variables?: VariablesType) => {
    try {
      const { data } = (await API.graphql(graphqlOperation(query, variables))) as {
        data: ResultType;
      };
      setData(data);
    } catch (error) {
      console.warn(error);
      setError((error as ErrorType).errors);
      setData((error as ErrorType).data);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    fetchQuery(query, variables);
  };
  React.useEffect(() => {
    fetchQuery(query, variables);
  }, []);

  return {
    loading,
    data,
    error,
    refetch,
  };
};

type TtypedQuery<DataType> = {
  data: DataType | null;
  queryError: any | null;
};
export const typedQuery = async <ResultType extends {}, VariablesType extends {} = {}>(
  query: string,
  variables?: VariablesType
) => {
  const fetchQuery = async (query: string, variables?: VariablesType) => {
    try {
      const { data } = (await API.graphql({
        query,
        variables,
      })) as {
        data: ResultType;
      };
      return {
        query: data,
        queryError: null,
      };
    } catch (error) {
      console.warn(error);
      return {
        query: null,
        queryError: error,
      };
    }
  };

  return fetchQuery(query, variables);
};
