import {
  bubbleSort,
  heapSort,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
} from "@/algorithms";
import { SortAlgorithmMeta } from "@/models";

export const algorithms: Record<string, SortAlgorithmMeta> = {
  "Bubble Sort": { sort: bubbleSort, complexity: "O(n²)" },
  "Selection Sort": { sort: selectionSort, complexity: "O(n²)" },
  "Insertion Sort": { sort: insertionSort, complexity: "O(n²)" },
  "Merge Sort": { sort: mergeSort, complexity: "O(n log n)" },
  "Quick Sort": { sort: quickSort, complexity: "O(n log n)" },
  "Heap Sort": { sort: heapSort, complexity: "O(n log n)" },
};
