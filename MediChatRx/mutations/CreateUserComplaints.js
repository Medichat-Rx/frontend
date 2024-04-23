import { gql } from "@apollo/client";

export const CREATE_USERCOMPLAINTS = gql`
  mutation Mutation($newUserComplaint: NewUserComplaint) {
    createUserComplaint(newUserComplaint: $newUserComplaint) {
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
