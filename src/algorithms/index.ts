import { SortingAlgorithm, SortStep, StepType } from "@/models";

// Bubble Sort
export const bubbleSort: SortingAlgorithm = (arr: number[]) => {
  const steps: SortStep[] = [];
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({ type: StepType.Compare, indices: [j, j + 1] });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ type: StepType.Swap, indices: [j, j + 1] });
      }
    }
  }
  return steps;
};

// Selection Sort
export const selectionSort: SortingAlgorithm = (arr) => {
  const steps: SortStep[] = [];
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      steps.push({ type: StepType.Compare, indices: [min, j] });
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      steps.push({ type: StepType.Swap, indices: [i, min] });
    }
  }
  return steps;
};

// Insertion Sort
export const insertionSort: SortingAlgorithm = (arr) => {
  const steps: SortStep[] = [];
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      steps.push({ type: StepType.Compare, indices: [j - 1, j] });
      [a[j], a[j - 1]] = [a[j - 1], a[j]];
      steps.push({ type: StepType.Swap, indices: [j - 1, j] });
      j--;
    }
  }
  return steps;
};

// Merge Sort
export const mergeSort: SortingAlgorithm = (arr) => {
  const steps: SortStep[] = [];
  const a = [...arr];

  const merge = (start: number, mid: number, end: number) => {
    let left = a.slice(start, mid);
    let right = a.slice(mid, end);
    let i = 0,
      j = 0,
      k = start;

    while (i < left.length && j < right.length) {
      steps.push({ type: StepType.Compare, indices: [start + i, mid + j] });
      if (left[i] <= right[j]) {
        a[k] = left[i];
        steps.push({ type: StepType.Overwrite, index: k, value: left[i] });
        i++;
      } else {
        a[k] = right[j];
        steps.push({ type: StepType.Overwrite, index: k, value: right[j] });
        j++;
      }
      k++;
    }

    while (i < left.length) {
      a[k] = left[i];
      steps.push({ type: StepType.Overwrite, index: k, value: left[i] });
      i++;
      k++;
    }

    while (j < right.length) {
      a[k] = right[j];
      steps.push({ type: StepType.Overwrite, index: k, value: right[j] });
      j++;
      k++;
    }
  };

  const divide = (start: number, end: number) => {
    if (end - start <= 1) return;
    const mid = Math.floor((start + end) / 2);
    divide(start, mid);
    divide(mid, end);
    merge(start, mid, end);
  };

  divide(0, a.length);
  return steps;
};

// Quick Sort
export const quickSort: SortingAlgorithm = (arr) => {
  const steps: SortStep[] = [];
  const a = [...arr];

  const partition = (low: number, high: number) => {
    const pivot = a[high];
    let i = low;
    for (let j = low; j < high; j++) {
      steps.push({ type: StepType.Compare, indices: [j, high] });
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({ type: StepType.Swap, indices: [i, j] });
        i++;
      }
    }
    [a[i], a[high]] = [a[high], a[i]];
    steps.push({ type: StepType.Swap, indices: [i, high] });
    return i;
  };

  const quick = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      quick(low, pi - 1);
      quick(pi + 1, high);
    }
  };

  quick(0, a.length - 1);
  return steps;
};

export function heapSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];

  const swap = (i: number, j: number) => {
    steps.push({ type: StepType.Swap, indices: [i, j] });
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const heapify = (n: number, i: number) => {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n) {
      steps.push({ type: StepType.Compare, indices: [l, largest] });
      if (arr[l] > arr[largest]) largest = l;
    }

    if (r < n) {
      steps.push({ type: StepType.Compare, indices: [r, largest] });
      if (arr[r] > arr[largest]) largest = r;
    }

    if (largest !== i) {
      swap(i, largest);
      heapify(n, largest);
    }
  };

  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    swap(0, i);
    heapify(i, 0);
  }

  return steps;
}
