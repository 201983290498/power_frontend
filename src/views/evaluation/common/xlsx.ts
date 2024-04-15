import * as XLSX from 'xlsx';
import { ExcelData } from '/@/components/Excel';
import { dateUtil } from '/@/utils/dateUtil';

const props = {
  dateFormat: 'yyyy/MM/dd',
  timeZone: 8,
};

export async function readCsv(rawFile: File): Promise<Object[]> {
  return readerData(rawFile);
}

function getHeaderRow(sheet: XLSX.WorkSheet) {
  if (!sheet || !sheet['!ref']) return [];
  const headers: string[] = [];
  // A3:B7=>{s:{c:0, r:2}, e:{c:1, r:6}}
  const range = XLSX.utils.decode_range(sheet['!ref']);

  const R = range.s.r;
  /* start in the first row */
  for (let C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
}

function getExcelData(workbook: XLSX.WorkBook): Object[] {
  const excelData: ExcelData[] = [];
  const { dateFormat, timeZone } = props;
  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const header: string[] = getHeaderRow(worksheet);
    let results = XLSX.utils.sheet_to_json(worksheet, {
      raw: true,
      dateNF: dateFormat, //Not worked
    }) as object[];
    results = results.map((row: object) => {
      for (const field in row) {
        if (row[field] instanceof Date) {
          if (timeZone === 8) {
            row[field].setSeconds(row[field].getSeconds() + 43);
          }
          if (dateFormat) {
            row[field] = dateUtil(row[field]).format(dateFormat);
          }
        }
      }
      return row;
    });

    excelData.push({
      header,
      results,
      meta: {
        sheetName,
      },
    });
  }
  return excelData[0].results;
}

/**
 * @description: 读取excel数据
 */
function readerData(rawFile: File): Promise<Object[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = e.target && e.target.result;
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        // console.log(workbook);
        /* DO SOMETHING WITH workbook HERE */
        const excelData = getExcelData(workbook);
        resolve(excelData);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(rawFile);
  });
}
