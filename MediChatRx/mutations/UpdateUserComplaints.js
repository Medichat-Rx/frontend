import { gql } from "@apollo/client";

export const UPDATE_USERCOMPLAINTS = gql`
mutation UpdateUserComplaint($updateUserComplaint: NewUserComplaint) {
  updateUserComplaint(updateUserComplaint: $updateUserComplaint) {
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
`