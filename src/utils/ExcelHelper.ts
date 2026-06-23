import XLSX, { WorkBook } from "xlsx";

export class ExcelHelper {
  static readExcel(
    filePath: string,
    sheetName?: string,
  ): Record<string, string>[] {
    const workBook: WorkBook = XLSX.readFile(filePath);
    const sheet = workBook.Sheets[sheetName || workBook.SheetNames[0]];
    return XLSX.utils.sheet_to_json<Record<string, string>>(sheet);
  }
}
