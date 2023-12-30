import { renderHook } from "@testing-library/react";
import { useRepositoryContext } from "./useRepositoryContext";
import { RepositoryContextProvider } from "@/context/RepositoryContext";

describe("useRepositoryContext", () => {
  it("returns the context value", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RepositoryContextProvider>{children}</RepositoryContextProvider>
    );

    const { result } = renderHook(() => useRepositoryContext(), { wrapper });

    expect(result.current).toHaveProperty("clickedResults");
    expect(result.current).toHaveProperty("handleResultClick");
    expect(result.current).toHaveProperty("clearClickedResults");
  });
});
