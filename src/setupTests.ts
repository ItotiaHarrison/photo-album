//import Jest DOM matchers
import '@testing-library/jest-dom';

// Mock Firebase app modules
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
}));

//mock firebase auth, simulate unathenticated state,mock auth methods
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
  })),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
  GoogleAuthProvider: jest.fn(() => ({})),
  signInWithPopup: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

//mock firebase firestore, database operations, functions
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

// Mock ui react-icons
jest.mock('react-icons/fc', () => ({
  FcGoogle: () => 'Google Icon',
}));

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
