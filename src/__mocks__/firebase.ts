//mocks firestore database operations
export const db = {
    collection: jest.fn(),
    doc: jest.fn(),
  };
  
  //firebase authentication
  export const auth = {
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  };
  
  //firebase storage operation
  export const storage = {
    ref: jest.fn(),
    uploadBytes: jest.fn(),
    getDownloadURL: jest.fn(),
  };
  
  export default {
    db,
    auth,
    storage,
  };
  