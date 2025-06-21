export interface Template {
  id: number;
  title: string;
  content: string;
}

export interface TemplateSaveRequest {
  title: string;
  content: string;
}
