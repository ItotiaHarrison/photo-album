export const db = {
    collection: jest.fn(),
    doc: jest.fn(),
  };
  
  export const auth = {
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  };
  
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
  