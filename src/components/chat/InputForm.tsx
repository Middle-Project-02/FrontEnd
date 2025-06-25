import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/chat/Textarea';

interface InputFormProps {
  input: string;
  onChangeInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isAiResponding: boolean;
}

const InputForm = ({ input, onChangeInput, onSubmit, isAiResponding }: InputFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex items-end gap-3">
      <Textarea
        value={input}
        onChange={(e) => onChangeInput(e.target.value)}
        placeholder="여기에 입력하세요"
        inputSize="lg"
        variant="default"
        className="flex-1"
      />
      <Button type="submit" disabled={!input.trim() || isAiResponding} className="ml-2">
        전송
      </Button>
    </form>
  );
};

export default InputForm;
