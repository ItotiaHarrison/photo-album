import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

// Mock Firebase auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
  })),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
}));

// Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock OAuth component
jest.mock("../../components/OAuth", () => ({
  __esModule: true,
  default: () => <div>OAuth Component</div>,
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderLogin = () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  };

  test("renders login form correctly", () => {
    renderLogin();
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();
  });

  test("handles login submission", async () => {
    const mockSignInWithEmailAndPassword =
      signInWithEmailAndPassword as jest.MockedFunction<
        typeof signInWithEmailAndPassword
      >;
    mockSignInWithEmailAndPassword.mockResolvedValueOnce({} as any);

    renderLogin();

    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        getAuth(),
        "test@example.com",
        "password123"
      );
    });
  });

  test("displays error message for invalid credentials", async () => {
    const mockSignInWithEmailAndPassword =
      signInWithEmailAndPassword as jest.MockedFunction<
        typeof signInWithEmailAndPassword
      >;
    mockSignInWithEmailAndPassword.mockRejectedValueOnce(
      new Error("Invalid credentials")
    );

    renderLogin();

    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Bad user credentials');
      });
  });

//   test('toggles password visibility', () => {
//     renderLogin();
    
//     const passwordInput = screen.getByPlaceholderText(/password/i);
//     const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

//     expect(passwordInput).toHaveAttribute('type', 'password');
    
//     fireEvent.click(toggleButton);
//     expect(passwordInput).toHaveAttribute('type', 'text');
    
//     fireEvent.click(toggleButton);
//     expect(passwordInput).toHaveAttribute('type', 'password');
//   });

  test("validates required fields", async () => {
    renderLogin();

    const submitButton = screen.getByRole("button", { name: /Sign in/i });
    fireEvent.click(submitButton);

    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
  });

  test('navigates to home page after successful login', async () => {
    const mockSignInWithEmailAndPassword = signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>;
    mockSignInWithEmailAndPassword.mockResolvedValueOnce({user: { uid: '123' }} as any);
    
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });
});
