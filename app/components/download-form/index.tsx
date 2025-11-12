import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useDraft } from "@/app/contexts/DraftProvider";
import { convertToPdf } from "@/app/services/services";
import Button from "@/app/components/ui/Button";

type DownloadFormProps = {
  setVisibilityAction: Dispatch<SetStateAction<boolean>>;
};

export default function DownloadForm({ setVisibilityAction }: DownloadFormProps) {
  const { lastDraft } = useDraft();
  const [loading, setLoading] = useState<boolean>(false);

  enum FileTypes {
    PDF = "pdf",
    PLAIN_TEXT = "text",
    MARKDOWN = "markdown",
  }

  function handleSelect(e: FormEvent<HTMLFormElement>): void {
    if (e.target === null) return;
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    saveDraft(formData.get("filetype") as FileTypes);
  }

  function saveDraft(selectedFileType: FileTypes) {
    switch (selectedFileType) {
      case "pdf": {
        savePDF();
        break;
      }
      case "text": {
        const file = new Blob([lastDraft], { type: "text/plain" });
        saveFile(file, "proposta.txt");
        break;
      }
      case "markdown": {
        const file = new Blob([lastDraft], { type: "text/markdown" });
        saveFile(file, "proposta.md");
        break;
      }
      default:
        console.log("Nenhuma opção válida selecionada.");
    }
  }

  function saveFile(file: Blob, filename: string): void {
    const fileUrl = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(fileUrl);
  }

  function savePDF(): void {
    const draft = document.getElementById("draft");
    if (draft === null) return;
    setLoading(true);
    convertToPdf(draft.getHTML())
      .then((res) => {
        saveFile(res as Blob, "proposta.pdf");
      })
      .catch((error) => console.error("Error fetching file:", error))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form
      onSubmit={(e) => handleSelect(e)}
      className="flex flex-col items-center my-8 gap-4"
    >
      <label htmlFor="filetype">Selecione o tipo de arquivo:</label>
      <select
        name="filetype"
        id="filetype"
        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value={FileTypes.PDF}>PDF</option>
        <option value={FileTypes.PLAIN_TEXT}>Texto</option>
        <option value={FileTypes.MARKDOWN}>Markdown</option>
      </select>
      <Button size="sm" type="submit" disabled={loading}>
        Download
      </Button>
      <Button size="sm" variant="secondary" onClick={() => setVisibilityAction(false)} disabled={loading}>
        Cancelar
      </Button>
    </form>
  );
}
