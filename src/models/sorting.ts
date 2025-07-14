export type SortAlgorithmMeta = {
  sort: SortingAlgorithm;
  complexity: string;
};

// Step types as an enum
export enum StepType {
  Compare = "compare",
  Swap = "swap",
  Overwrite = "overwrite",
}

// Base interface
interface BaseStep {
  type: StepType;
}

// Compare Step
export interface CompareStep extends BaseStep {
  type: StepType.Compare;
  indices: [number, number];
}

// Swap Step
export interface SwapStep extends BaseStep {
  type: StepType.Swap;
  indices: [number, number];
}

// Overwrite Step
export interface OverwriteStep extends BaseStep {
  type: StepType.Overwrite;
  index: number;
  value: number;
}

// Union of all steps
export type SortStep = CompareStep | SwapStep | OverwriteStep;

// Sorting algorithm interface
export interface SortingAlgorithm {
  (array: number[]): SortStep[];
}
