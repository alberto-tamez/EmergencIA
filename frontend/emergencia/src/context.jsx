import React, { createContext, useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  // uri: "http://127.0.0.1:4040",
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await client
        .query({
          query: gql`
            {
              query
              Users {
                users {
                  name
                  phone
                  calls {
                    time_called
                    call_ended
                    caller_location
                    transcriptions {
                      call_transcription
                    }
                    emotionDetails {
                      emotion_name
                      emotion_score
                    }
                    threatAssessments {
                      caller_risk
                      assessment_time
                      situation_type
                      recommended_action
                      caller_situation
                      timestamp
                    }
                  }
                }
              }
            }
          `,
        })
        .then((response) => setData(response.data))
        .catch((error) => console.error(error));
    }

    fetchData();
    console.log("data de la base de datos: ", JSON.stringify(data))

  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
