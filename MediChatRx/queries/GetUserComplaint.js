import { gql } from "@apollo/client";

export const GET_USER_COMPLAINT = gql`
  query GetUserComplaint {
    getUserComplaint {
      _id
      UserId
      symptoms
      symptom_start_time
      medical_history
      triggering_factors
      drug_allergies
      general_feeling
      createdAt
      updatedAt
    }
  }
`;
