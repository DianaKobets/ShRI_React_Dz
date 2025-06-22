export interface DragAndDrop {
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

export interface ResultData {
  total_spend_galactic?: number;
  rows_affected?: number;
  less_spent_at?: number | string;
  big_spent_at?: number | string;
  big_spent_value?: number;
  average_spend_galactic?: number;
  big_spent_civ?: string;
  less_spent_civ?: string;
}
export interface FileHistory {
  id: string;
  name: string;
  status: "success" | "failed";
  details: string;
  timestamp: string;
  results: ResultData[];
}

export interface HighlightProps {
  results: ResultData[];
  columns?: number;
}

export interface HomePageState {
  selectedFile: File | null;
  isUploading: boolean;
  progress: number;
  results: ResultData[];
  error: string | null;
  setSelectedFile: (file: File | null) => void;
  setIsUploading: (value: boolean) => void;
  setProgress: (value: number) => void;
  setResults: (value: ResultData[]) => void;
  setError: (value: string | null) => void;
}

export interface GenerationPageState {
  isGenerating: boolean;
  fileName: string | null;
  error: string | null;
  setIsGenerating: (value: boolean) => void;
  setFileName: (value: string | null) => void;
  setError: (value: string | null) => void;
}

export interface HistoryPageState {
  history: FileHistory[];
  setHistory: (history: FileHistory[]) => void;
  selectedFile: FileHistory | null;
  setSelectedFile: (file: FileHistory | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export interface HistoryFileProps {
  file: FileHistory;
  onRemove: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: ResultData[] | undefined;
}

export interface HistoryProps {
  history: FileHistory[];
  setHistory: (history: FileHistory[]) => void;
}

export interface ActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}
