// declare  module 'express-serve-static-core' {
//   interface Request {
//     currentUser: any
//   }
// }
declare namespace Express {
  export interface Request {
    currentUser?: string
  }
}