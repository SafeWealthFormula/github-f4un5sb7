import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { QuizLoadingTransition } from '../components/QuizLoadingTransition';
import { useQuizStore } from '../store/quizStore';

// Mock the store
vi.mock('../store/quizStore', () => ({
  useQuizStore: vi.fn()
}));

describe('QuizLoadingTransition', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    
    // Setup default mock implementation
    (useQuizStore as any).mockImplementation(() => ({
      setView: vi.fn(),
      isKeyboardNavigation: false,
      abTestVariant: 'E',
      toggleVariant: vi.fn()
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  it('displays initial loading message', () => {
    render(<QuizLoadingTransition />);
    expect(screen.getByText('Preparing Your Extended Assessment')).toBeInTheDocument();
  });

  it('transitions through loading phases correctly', async () => {
    render(<QuizLoadingTransition />);

    // Initial phase
    expect(screen.getByText('Analyzing your responses...')).toBeInTheDocument();

    // Second phase
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('Customizing your questions for deeper insights...')).toBeInTheDocument();

    // Third phase
    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(screen.getByText('Finalizing your tailored assessment...')).toBeInTheDocument();

    // Final phase
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.getByText('Your custom assessment is ready.')).toBeInTheDocument();
  });

  it('calls setView after completion when not using keyboard navigation', () => {
    const mockSetView = vi.fn();
    (useQuizStore as any).mockImplementation(() => ({
      setView: mockSetView,
      isKeyboardNavigation: false,
      abTestVariant: 'E',
      toggleVariant: vi.fn()
    }));

    render(<QuizLoadingTransition />);

    act(() => {
      vi.advanceTimersByTime(3500); // Total animation time
    });

    expect(mockSetView).toHaveBeenCalledWith('quiz');
  });

  it('does not auto-transition when using keyboard navigation', () => {
    const mockSetView = vi.fn();
    (useQuizStore as any).mockImplementation(() => ({
      setView: mockSetView,
      isKeyboardNavigation: true,
      abTestVariant: 'E',
      toggleVariant: vi.fn()
    }));

    render(<QuizLoadingTransition />);

    act(() => {
      vi.advanceTimersByTime(3500);
    });

    expect(mockSetView).not.toHaveBeenCalled();
  });
});