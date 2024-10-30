import { render, screen, waitFor, act, fireEvent } from "../../test-utils";
import Home from "../Home";
import { getAlbums, getUsers } from "../../services/api";
import "@testing-library/jest-dom";

// Mock the API services
jest.mock("../../services/api", () => ({
  getUsers: jest.fn(),
  getAlbums: jest.fn(),
}));

describe("Home Component", () => {
  const mockUsers = [
    { id: 1, name: "User 1", username: "user1", email: "user1@example.com" },
    { id: 2, name: "User 2", username: "user2", email: "user2@example.com" },
    { id: 3, name: "User 3", username: "user3", email: "user3@example.com" },
    { id: 4, name: "User 4", username: "user4", email: "user4@example.com" },
    { id: 5, name: "User 5", username: "user5", email: "user5@example.com" },
    { id: 6, name: "User 6", username: "user6", email: "user6@example.com" },
    { id: 7, name: "User 7", username: "user7", email: "user7@example.com" },
    { id: 8, name: "User 8", username: "user8", email: "user8@example.com" },
    { id: 9, name: "User 9", username: "user9", email: "user9@example.com" },
  ];

  const mockAlbums = [
    { id: 1, userId: 1, title: "Album 1" },
    { id: 2, userId: 1, title: "Album 2" },
    { id: 3, userId: 2, title: "Album 3" },
    { id: 4, userId: 3, title: "Album 4" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock responses
    (getUsers as jest.Mock).mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ data: mockUsers }), 100))
      );
      
      (getAlbums as jest.Mock).mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ data: mockAlbums }), 100))
      );
  });

  it("renders users after loading", async () => {
    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Check if the first page of users is rendered (8 users per page)
    await waitFor(() => {
      const firstPageUsers = mockUsers.slice(0, 8);
      firstPageUsers.forEach((user) => {
        expect(screen.getByText(user.name)).toBeInTheDocument();
      });
    });
  });

  it("displays correct album count for each user", async () => {
    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // User 1 should have 2 albums
    expect(screen.getByText("2")).toBeInTheDocument();
    // User 2 should have 1 album
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("handles pagination correctly", async () => {
    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Check if pagination buttons are rendered
    const paginationButtons = screen.getAllByRole("button");
    expect(paginationButtons).toHaveLength(2); // Should have 2 pages for 9 users with 8 per page

    await act(async () => {
      fireEvent.click(paginationButtons[1]);
    });

    // Check if the ninth user is visible on the second page
    expect(screen.getByText("User 9")).toBeInTheDocument();
  });

  it("handles empty users array", async () => {
    (getUsers as jest.Mock).mockResolvedValue({ data: [] });
    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.getByText(/there are no users/i)).toBeInTheDocument();
    });
  });

  it("renders correct number of users per page", async () => {
    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Check if only 8 users are rendered on the first page
    const userCards = mockUsers
      .slice(0, 8)
      .map((user) => screen.getByText(user.name));

    expect(userCards).toHaveLength(8);
  });

  it("handles API error gracefully", async () => {
    (getUsers as jest.Mock).mockRejectedValue(new Error("API Error"));

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/there are no users/i)).toBeInTheDocument();
  });

  it("renders the Users heading", async () => {
    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByRole("heading", { name: /Users/i })).toBeInTheDocument();
  });
});
