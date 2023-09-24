
export class Utils {
  getBasekeys(base: any[]): string[] {
    let keys: string[] = []

    base.forEach(e => {
      Object.keys(e).forEach(key => {
        if (!keys.includes(key)) {
          keys.push(key)
        }
      })
    })

    return keys

  }

  getJsonSize(obj: any) {
    let size = new TextEncoder().encode(JSON.stringify(obj)).length
    let kiloBytes = size / 1024;

    return kiloBytes
  }

  getRecordKeyByName(projectList: any[], label: string): any {

    let temp_arr = projectList.filter(e => e["label"] === label)

    temp_arr[0]

  }
}