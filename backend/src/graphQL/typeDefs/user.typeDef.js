const userTypeDef = `#graphql
type User {
    _id:ID!
    username:String!
    password:String!
    name:String!
    gender:String!
    profileImage:String
}

type Query {
    users:[User!]
    authUser:user
    user:(userId:ID!):User
}

type Mutation {
    signUp(input:SignUpInput!):User
    signIn(input:SignInInput!):User
    logout:LogoutResponse
}

input SignUpInput{
    username:String!
    password:String!
    name:String!
    gender:String!
}
input SignInInput{
    username:String!
    password:String!
}
type LogoutResponse{
    message:String!
}

`

export default userTypeDef