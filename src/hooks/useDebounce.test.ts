import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should return the initial value", () => {
    const { result } = renderHook(() => useDebounce("test"));
    expect(result.current).toBe("test");
  });

  it("should return the updated value", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: "test" },
    });

    expect(result.current).toBe("test");

    rerender({ value: "updated" });

    expect(result.current).toBe("test");

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current).toBe("updated");
  });

  it("should return the updated value after the specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "test", delay: 1000 } }
    );

    expect(result.current).toBe("test");

    rerender({ value: "updated", delay: 1000 });

    expect(result.current).toBe("test");

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current).toBe("updated");
  });
});
